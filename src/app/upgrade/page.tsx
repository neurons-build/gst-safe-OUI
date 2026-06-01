"use client";

import { createClient } from "@/lib/sb/client";
import { useUser } from "@/components/UserProvider";
import {
  Button,
  Column,
  Heading,
  Text,
  Row,
  Card,
} from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Upgrade() {
  const { userEmail } = useUser();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [subscriptionPlan, setSubscriptionPlan] = useState<"free" | "pro">("free");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth?state=login");
        return;
      }

      const { data, error } = await supabase
        .from("subscriptions")
        .select("plan")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      setSubscriptionPlan(data?.plan || "free");
    } catch (err) {
      console.error("Failed to fetch subscription status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    setProcessing(true);
    try {
      // Razorpay integration will go here
      // For now, this is a placeholder
      alert("Razorpay integration coming soon. For now, please contact us at admin@gstsafe.app to upgrade.");
    } catch (err) {
      console.error("Failed to initiate subscription:", err);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Column fillWidth center padding="xl">
        <Text>Loading...</Text>
      </Column>
    );
  }

  if (subscriptionPlan === "pro") {
    return (
      <Column fillWidth horizontal="center" paddingX="l" paddingTop="64">
        <Column maxWidth="m" fillWidth gap="24" horizontal="center">
          <Column gap="8" horizontal="center">
            <Heading variant="display-strong-m">You're already on Pro!</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Enjoy unlimited invoices and WhatsApp alerts
            </Text>
          </Column>
          <Button onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </Column>
      </Column>
    );
  }

  return (
    <Column fillWidth horizontal="center" paddingX="l" paddingTop="64">
      <Column maxWidth="m" fillWidth gap="32">
        {/* Header */}
        <Column gap="8" horizontal="center">
          <Heading variant="display-strong-m">Upgrade to Pro</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Unlock unlimited invoices and WhatsApp alerts
          </Text>
        </Column>

        {/* Pricing Cards */}
        <Row fillWidth gap="16" horizontal="center">
          {/* Free Plan */}
          <Card fillWidth flex={1} padding="24" radius="l" border="neutral-alpha-weak">
            <Column fillWidth gap="16">
              <Column gap="4">
                <Heading variant="heading-strong-l">Free</Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  For getting started
                </Text>
              </Column>
              <Column gap="8">
                <Heading variant="display-strong-s">₹0</Heading>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Forever
                </Text>
              </Column>
              <Column fillWidth gap="8">
                <Text variant="body-default-s">✓ Income tracking</Text>
                <Text variant="body-default-s">✓ Threshold alerts (email)</Text>
                <Text variant="body-default-s">✓ 10 invoice storage</Text>
                <Text variant="body-default-s">✓ Dashboard</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">✗ WhatsApp alerts</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">✗ Unlimited invoices</Text>
              </Column>
              <Button fillWidth variant="secondary" disabled>
                Current Plan
              </Button>
            </Column>
          </Card>

          {/* Pro Plan */}
          <Card fillWidth flex={1} padding="24" radius="l" border="brand-alpha-weak" background="brand-alpha-weak">
            <Column fillWidth gap="16">
              <Row fillWidth horizontal="between">
                <Column gap="4">
                  <Heading variant="heading-strong-l">Pro</Heading>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    For serious freelancers
                  </Text>
                </Column>
                <Text variant="label-default-s" onBackground="brand-strong">Popular</Text>
              </Row>
              <Column gap="8">
                <Heading variant="display-strong-s">₹999</Heading>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  /year
                </Text>
              </Column>
              <Column fillWidth gap="8">
                <Text variant="body-default-s">✓ Everything in Free</Text>
                <Text variant="body-default-s">✓ Unlimited invoice storage</Text>
                <Text variant="body-default-s">✓ WhatsApp alerts</Text>
                <Text variant="body-default-s">✓ Priority support</Text>
                <Text variant="body-default-s">✓ Early access to new features</Text>
              </Column>
              <Button fillWidth onClick={handleSubscribe} disabled={processing}>
                {processing ? "Processing..." : "Upgrade to Pro"}
              </Button>
            </Column>
          </Card>
        </Row>

        {/* FAQ */}
        <Column fillWidth gap="16">
          <Heading variant="heading-strong-s">Frequently Asked Questions</Heading>
          <Column fillWidth gap="8">
            <Column fillWidth gap="4">
              <Text variant="body-default-m">What payment methods do you accept?</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                We accept UPI, credit cards, debit cards, and net banking via Razorpay.
              </Text>
            </Column>
            <Column fillWidth gap="4">
              <Text variant="body-default-m">Can I cancel my subscription?</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Yes, you can cancel anytime. You'll retain Pro benefits until the end of your billing year.
              </Text>
            </Column>
            <Column fillWidth gap="4">
              <Text variant="body-default-m">Is there a free trial?</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                We don't have a free trial, but the free tier is fully functional for getting started.
              </Text>
            </Column>
            <Column fillWidth gap="4">
              <Text variant="body-default-m">Do I need a CA?</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                GSTSafe helps you track and stay compliant, but we recommend consulting a CA for actual GST filing.
              </Text>
            </Column>
          </Column>
        </Column>

        {/* Contact */}
        <Column fillWidth horizontal="center" gap="8">
          <Text variant="body-default-s" onBackground="neutral-weak">
            Questions? Contact us at admin@gstsafe.app
          </Text>
        </Column>
      </Column>
    </Column>
  );
}
