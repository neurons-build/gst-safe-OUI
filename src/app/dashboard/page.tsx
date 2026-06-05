"use client";

import { createClient } from "@/lib/sb/client";
import { useUser } from "@/components/UserProvider";
import {
  Button,
  Column,
  Heading,
  Text,
  Row,
  Badge,
  Card,
} from "@once-ui-system/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  formatCurrency,
  calculateThresholdPercentage,
  calculateRemainingToThreshold,
  paiseToInr,
  getFilingDeadlines,
} from "@/lib/gst-utils";

interface DashboardData {
  totalIncomePaise: number;
  domesticIncomePaise: number;
  thresholdPaise: number;
  isGstRegistered: boolean;
  recentEntries: Array<{
    id: string;
    source_name: string;
    amount: number;
    month: number;
    year: number;
    income_type: string;
  }>;
}

export default function Dashboard() {
  const { profile, userEmail } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const skipOnboarding = searchParams.get("skipOnboarding") === "true";
  const supabase = createClient();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth?state=login");
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (userError) throw userError;

      const skipOnboarding = searchParams.get("skipOnboarding") === "true";
      if (!userData.onboarding_complete && !skipOnboarding) {
        router.push("/onboarding");
        return;
      }

      const currentFY = new Date().getFullYear() + "-" + (new Date().getFullYear() + 1).toString().slice(-2);
      const { data: incomeData, error: incomeError } = await supabase
        .from("income_entries")
        .select("*")
        .eq("user_id", user.id)
        .eq("financial_year", currentFY)
        .order("created_at", { ascending: false })
        .limit(5);

      if (incomeError) throw incomeError;

      const totalIncome = incomeData?.reduce((sum, entry) => sum + entry.amount, 0) || 0;
      const domesticIncome = incomeData?.filter(e => e.income_type === "domestic").reduce((sum, entry) => sum + entry.amount, 0) || 0;

      setDashboardData({
        totalIncomePaise: totalIncome,
        domesticIncomePaise: domesticIncome,
        thresholdPaise: userData.gst_threshold,
        isGstRegistered: userData.is_gst_registered,
        recentEntries: incomeData || [],
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  // Skeleton loading state — matches actual layout to prevent layout shift
  if (loading) {
    return (
      <Column fillWidth horizontal="center" paddingX="l" paddingTop="64">
        <Column maxWidth="l" fillWidth gap="24">
          <Column fillWidth gap="8">
            <Column fillWidth minHeight="32" radius="m" background="neutral-alpha-weak" />
            <Column fillWidth minHeight="20" radius="m" background="neutral-alpha-weak" style={{ maxWidth: 200 }} />
          </Column>
          <Column fillWidth minHeight={100} radius="xl" background="neutral-alpha-weak" />
          <Row fillWidth gap="12" s={{direction: "column"}}>
            <Column fillWidth minHeight="80" radius="xl" background="neutral-alpha-weak" />
            <Column fillWidth minHeight="80" radius="xl" background="neutral-alpha-weak" />
          </Row>
          <Column fillWidth minHeight="80" radius="xl" background="neutral-alpha-weak" />
        </Column>
      </Column>
    );
  }

  if (error || !dashboardData) {
    return (
      <Column fillWidth center padding="xl">
        <Text onBackground="danger-weak">{error || "Failed to load dashboard"}</Text>
      </Column>
    );
  }

  // Use domesticIncomePaise for threshold — export income doesn't count
  const percentage = calculateThresholdPercentage(
    dashboardData.domesticIncomePaise,
    dashboardData.thresholdPaise
  );
  const remainingPaise = calculateRemainingToThreshold(
    dashboardData.domesticIncomePaise,
    dashboardData.thresholdPaise
  );
  const gstLiabilityPaise = dashboardData.domesticIncomePaise * 0.18;
  const exportIncomePaise = dashboardData.totalIncomePaise - dashboardData.domesticIncomePaise;
  const filingDeadlines = getFilingDeadlines();

  // Derive current FY label for display
  const now = new Date();
  const fyStart = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  const fyLabel = `FY ${fyStart}–${(fyStart + 1).toString().slice(-2)}`;

  const getBarBackground = (pct: number): string => {
    if (pct >= 100) return "var(--danger-solid-strong)";
    if (pct >= 90) return "var(--warning-solid-strong)";
    if (pct >= 75) return "var(--warning-solid-medium)";
    return "var(--brand-solid-medium)";
  };

  return (
    <Column fillWidth horizontal="center" paddingX="l" paddingTop="64">
      <Column maxWidth="l" fillWidth gap="24">

        {/* Header */}
        <Column fillWidth gap="4">
          <Heading variant="display-strong-s">Dashboard</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Welcome back, {profile?.username?.split(" ")[0] || userEmail || "User"} · {fyLabel}
          </Text>
        </Column>

        {/* Skip-onboarding notice */}
        {skipOnboarding && (
          <Column
            fillWidth
            padding="16"
            radius="l"
            background="neutral-alpha-weak"
            border="neutral-alpha-weak"
          >
            <Text variant="body-default-s" onBackground="neutral-strong">
              You skipped onboarding. Your dashboard is available, but you can complete setup later from Settings.
            </Text>
          </Column>
        )}

        {/* Alert Banner — only when approaching / over threshold */}
        {percentage >= 75 && (
          <Column
            fillWidth
            padding="16"
            radius="l"
            background={percentage >= 100 ? "danger-weak" : "warning-weak"}
            border={percentage >= 100 ? "danger-alpha-weak" : "warning-alpha-weak"}
          >
            <Text variant="body-default-s" onBackground="neutral-strong">
              {percentage >= 100
                ? "You've crossed the GST threshold. Register immediately to avoid penalties."
                : percentage >= 90
                  ? "You're at 90% of your GST threshold. Register now to avoid penalties."
                  : "You're at 75% of your GST threshold. Start preparing for GST registration."}
            </Text>
          </Column>
        )}

        {/* ── Overview ───────────────────────────────────────── */}
        <Column fillWidth gap="12">
          <Heading variant="heading-strong-s">Overview</Heading>

          {/* Hero Card — total income */}
          <Card
            fillWidth
            padding="20"
            radius="xl"
            border="neutral-alpha-weak"
            background="brand-alpha-weak"
          >
            <Column gap="4">
              <Text variant="label-default-s" onBackground="neutral-weak">
                Earned this {fyLabel}
              </Text>
              <Heading variant="heading-strong-xl">
                {formatCurrency(dashboardData.totalIncomePaise)}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Total professional income recorded this financial year
              </Text>

              {/* Domestic vs Export breakdown — only show if there's export income */}
              {exportIncomePaise > 0 && (
                <Row gap="16" paddingTop="12">
                  <Column gap="2">
                    <Text variant="label-default-xs" onBackground="neutral-weak">
                      Domestic (counts toward GST threshold)
                    </Text>
                    <Text variant="label-default-m">
                      {formatCurrency(dashboardData.domesticIncomePaise)}
                    </Text>
                  </Column>
                  <Column gap="2">
                    <Text variant="label-default-xs" onBackground="neutral-weak">
                      Export (excluded from threshold)
                    </Text>
                    <Text variant="label-default-m">
                      {formatCurrency(exportIncomePaise)}
                    </Text>
                  </Column>
                </Row>
              )}
            </Column>
          </Card>

          {/* Secondary Metrics — stack on mobile */}
          <Row fillWidth gap="12" s={{direction: "column"}}>
            <Card fillWidth padding="20" radius="xl" border="neutral-alpha-weak">
              <Column gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  GST Liability
                </Text>
                <Heading variant="heading-strong-l">
                  {formatCurrency(gstLiabilityPaise)}
                </Heading>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {gstLiabilityPaise === 0
                    ? "Not yet liable — below registration threshold"
                    : "Estimated at 18% on domestic income"}
                </Text>
              </Column>
            </Card>

            <Card fillWidth padding="20" radius="xl" border="neutral-alpha-weak">
              <Column gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Remaining to Threshold
                </Text>
                <Heading variant="heading-strong-l">
                  {remainingPaise <= 0
                    ? "Threshold crossed"
                    : formatCurrency(remainingPaise)}
                </Heading>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {remainingPaise <= 0
                    ? "You are required to register for GST"
                    : `Out of ${formatCurrency(dashboardData.thresholdPaise)} threshold`}
                </Text>
              </Column>
            </Card>
          </Row>

          {/* Threshold Progress Card — single source of truth */}
          <Card fillWidth padding="20" radius="xl" border="neutral-alpha-weak">
            <Column fillWidth gap={1}>
              <Row fillWidth horizontal="between" vertical="center">
                <Column gap="2">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    Threshold Used
                  </Text>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    Based on domestic income only
                  </Text>
                </Column>
                <Text variant="heading-strong-m">
                  {percentage}%
                </Text>
              </Row>

              <div
                style={{
                  width: "100%",
                  height: 8,
                  borderRadius: 999,
                  background: "var(--neutral-alpha-medium)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    height: "100%",
                    borderRadius: 999,
                    background: getBarBackground(percentage),
                    transition: "width 400ms ease",
                  }}
                />
              </div>

              <Row fillWidth horizontal="between">
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {formatCurrency(dashboardData.domesticIncomePaise)} earned
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {formatCurrency(dashboardData.thresholdPaise)} threshold
                </Text>
              </Row>
            </Column>
          </Card>
        </Column>

        {/* ── Filing Deadlines ───────────────────────────────── */}
        {dashboardData.isGstRegistered ? (
          <Column fillWidth gap="8">
            <Heading variant="heading-strong-s">Filing Deadlines</Heading>
            <Row fillWidth gap="8" s={{direction: "column"}}>
              <Card fillWidth padding="16" radius="l" border="neutral-alpha-weak">
                <Column fillWidth gap="4">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    GSTR-1 Due
                  </Text>
                  <Heading variant="heading-strong-s">
                    {filingDeadlines.gstr1}
                  </Heading>
                </Column>
              </Card>
              <Card fillWidth padding="16" radius="l" border="neutral-alpha-weak">
                <Column fillWidth gap="4">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    GSTR-3B Due
                  </Text>
                  <Heading variant="heading-strong-s">
                    {filingDeadlines.gstr3b}
                  </Heading>
                </Column>
              </Card>
            </Row>
          </Column>
        ) : percentage >= 75 ? (
          /* Pre-registration preview — shown when approaching threshold */
          <Column fillWidth gap="8">
            <Heading variant="heading-strong-s">Filing Deadlines</Heading>
            <Card fillWidth padding="16" radius="l" border="warning-alpha-weak" background="warning-alpha-weak">
              <Column gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Once registered, you'll be required to file monthly returns
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  GSTR-1 is due by the 11th and GSTR-3B by the 20th of each following month.
                  Start organising your invoices now.
                </Text>
              </Column>
            </Card>
          </Column>
        ) : null}

        {/* ── Recent Income ──────────────────────────────────── */}
        <Column fillWidth gap="8" paddingBottom="64">
          <Row fillWidth horizontal="between" vertical="center">
            <Heading variant="heading-strong-s">Recent Income</Heading>
            <Button size="s" variant="secondary" onClick={() => router.push("/income")}>
              View All
            </Button>
          </Row>

          {dashboardData.recentEntries.length === 0 ? (
            <Column
              fillWidth
              padding="32"
              radius="l"
              border="neutral-alpha-weak"
              horizontal="center"
              gap="8"
            >
              <Text variant="body-default-s" onBackground="neutral-weak">
                No income entries yet
              </Text>
              <Button onClick={() => router.push("/income")}>
                Log Your First Income
              </Button>
            </Column>
          ) : (
            <Column fillWidth gap="4">
              {dashboardData.recentEntries.map((entry) => (
                <Row
                  key={entry.id}
                  fillWidth
                  padding="20"
                  radius="l"
                  border="neutral-alpha-weak"
                  horizontal="between"
                  vertical="center"
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push(`/income/${entry.id}`)}
                >
                  <Column fillWidth gap="2">
                    <Text variant="body-default-m">{entry.source_name}</Text>
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      {entry.month}/{entry.year} · {entry.income_type}
                    </Text>
                  </Column>
                  <Text variant="body-default-m">
                    {formatCurrency(entry.amount)}
                  </Text>
                </Row>
              ))}
            </Column>
          )}
        </Column>

        {/* ── Quick Actions ──────────────────────────────────── */}
        <Column fillWidth gap="8">
          <Heading variant="heading-strong-s">Quick Actions</Heading>
          <Row gap="8">
            <Button onClick={() => router.push("/income")}>
              Log Income
            </Button>
            <Button variant="secondary" onClick={() => router.push("/invoices/new")}>
              Add Invoice
            </Button>
          </Row>
        </Column>

      </Column>
    </Column>
  );
}