import { createClient } from "@/lib/sb/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { calculateThresholdPercentage, paiseToInr, formatCurrency } from "@/lib/gst-utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Fetch user data
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError) throw userError;

    // Get current financial year
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const currentFY = month >= 4
      ? `${year}-${(year + 1).toString().slice(-2)}`
      : `${year - 1}-${year.toString().slice(-2)}`;

    // Calculate total income for current FY
    const { data: incomeData, error: incomeError } = await supabase
      .from("income_entries")
      .select("amount")
      .eq("user_id", userId)
      .eq("financial_year", currentFY);

    if (incomeError) throw incomeError;

    const totalIncomePaise = incomeData?.reduce((sum, entry) => sum + entry.amount, 0) || 0;
    const thresholdPaise = userData.gst_threshold;
    const percentage = calculateThresholdPercentage(totalIncomePaise, thresholdPaise);

    // Check which alerts need to be sent
    const alertLevels = [75, 90, 100];
    const alertsToSend: Array<{ level: number; channel: "email" | "whatsapp" }> = [];

    for (const level of alertLevels) {
      if (percentage >= level) {
        // Check if alert already sent this FY via email
        const { data: emailAlert } = await supabase
          .from("alerts_sent")
          .select("*")
          .eq("user_id", userId)
          .eq("alert_type", level.toString())
          .eq("financial_year", currentFY)
          .eq("channel", "email")
          .single();

        if (!emailAlert && userData.email_alerts) {
          alertsToSend.push({ level, channel: "email" });
        }

        // Check if alert already sent this FY via WhatsApp (Pro only)
        if (userData.whatsapp_alerts && userData.phone) {
          const { data: whatsappAlert } = await supabase
            .from("alerts_sent")
            .select("*")
            .eq("user_id", userId)
            .eq("alert_type", level.toString())
            .eq("financial_year", currentFY)
            .eq("channel", "whatsapp")
            .single();

          if (!whatsappAlert) {
            alertsToSend.push({ level, channel: "whatsapp" });
          }
        }
      }
    }

    // Send alerts
    for (const alert of alertsToSend) {
      await sendAlert(userData, alert.level, alert.channel, currentFY, totalIncomePaise, thresholdPaise);

      // Record that alert was sent
      await supabase
        .from("alerts_sent")
        .insert({
          user_id: userId,
          alert_type: alert.level.toString(),
          financial_year: currentFY,
          channel: alert.channel,
        });
    }

    return NextResponse.json({ success: true, percentage, alertsSent: alertsToSend.length });
  } catch (error: unknown) {
    console.error("Error checking alerts:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to check alerts" },
      { status: 500 }
    );
  }
}

async function sendAlert(
  userData: any,
  level: number,
  channel: "email" | "whatsapp",
  financialYear: string,
  totalIncomePaise: number,
  thresholdPaise: number
) {
  const userName = userData.name;
  const userEmail = userData.email;
  const totalIncomeINR = paiseToInr(totalIncomePaise);
  const thresholdINR = paiseToInr(thresholdPaise);
  const remainingINR = paiseToInr(thresholdPaise - totalIncomePaise);

  let subject = "";
  let body = "";

  if (level === 75) {
    subject = "You're 75% of the way to the GST threshold";
    body = `Hi ${userName},

You've earned ${formatCurrency(totalIncomePaise)} this financial year — 75% of your ${formatCurrency(thresholdPaise)} GST threshold.

At your current pace, you could cross the limit in the coming months. You don't need to register yet, but now is a good time to prepare.

Learn more about GST registration: https://gstsafe.app/guide/gst-registration

— GSTSafe`;
  } else if (level === 90) {
    subject = "Action needed — you're 90% to your GST threshold";
    body = `Hi ${userName},

You've earned ${formatCurrency(totalIncomePaise)} this year and are approaching the GST registration limit. You have approximately ${formatCurrency(remainingINR)} left before you're legally required to register.

Missing the registration deadline carries a minimum penalty of ₹10,000. We recommend starting the registration process now — it takes 7–14 days to complete.

Register for GST: https://gstsafe.app/guide/gst-registration

— GSTSafe`;
  } else if (level === 100) {
    subject = "You've crossed the GST threshold — register now";
    body = `Hi ${userName},

Your annual income has crossed ${formatCurrency(thresholdPaise)}. Under Indian GST law, you are now required to register for GST.

Not registering from this point is a legal violation. Penalties start at ₹10,000. Please speak to a CA or register directly at gstin.gov.in.

Step-by-step registration guide: https://gstsafe.app/guide/gst-registration

— GSTSafe`;
  }

  if (channel === "email") {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "noreply@gstsafe.app",
        to: userEmail,
        subject,
        html: body.replace(/\n/g, "<br>"),
      });
    } catch (error) {
      console.error("Failed to send email alert:", error);
    }
  } else if (channel === "whatsapp") {
    // WhatsApp integration would go here
    // For now, this is a placeholder
    console.log("WhatsApp alert would be sent to:", userData.phone);
  }
}
