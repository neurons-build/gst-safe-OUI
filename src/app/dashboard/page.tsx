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

      // Fetch user data
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (userError) throw userError;

      // Check if onboarding is complete
      const skipOnboarding = searchParams.get("skipOnboarding") === "true";
      if (!userData.onboarding_complete && !skipOnboarding) {
        router.push("/onboarding");
        return;
      }

      // Fetch current FY income entries
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

  if (loading) {
    return (
      <Column fillWidth center padding="xl">
        <Text>Loading...</Text>
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

  const percentage = calculateThresholdPercentage(
    dashboardData.totalIncomePaise,
    dashboardData.thresholdPaise
  );
  const remainingPaise = calculateRemainingToThreshold(
    dashboardData.totalIncomePaise,
    dashboardData.thresholdPaise
  );
  const gstLiabilityPaise = dashboardData.domesticIncomePaise * 0.18;
  const filingDeadlines = getFilingDeadlines();

  const getBarColor = (pct: number): string => {
    if (pct >= 100) return "danger";
    if (pct >= 90) return "orange";
    if (pct >= 75) return "warning";
    return "neutral";
  };

  return (
    <Column fillWidth horizontal="center" paddingX="l" paddingTop="64">
      <Column maxWidth="l" fillWidth gap="24">
        {/* Header */}
        <Column fillWidth gap="8">
          <Heading variant="display-strong-s">Dashboard</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Welcome back, {userEmail}
          </Text>
        </Column>

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

        {/* Alert Banner */}
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
                : "You're at 75% of your GST threshold. Start preparing for registration."}
            </Text>
          </Column>
        )}

        {/* Threshold Bar */}
        <Column fillWidth gap="8">
          <Row fillWidth horizontal="between">
            <Text variant="label-default-s">GST Threshold Progress</Text>
            <Text variant="label-default-s">{percentage}%</Text>
          </Row>
          <Column
            fillWidth
            minHeight="8"
            radius="full"
            solid="neutral-weak"
            overflow="hidden"
          >
            <Column
              fillWidth
              minHeight="8"
              radius="full"
              solid={getBarColor(percentage) === "danger" ? "danger-strong" : getBarColor(percentage) === "warning" ? "warning-strong" : getBarColor(percentage) === "orange" ? "brand-strong" : "brand-medium"}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </Column>
          <Row fillWidth horizontal="between">
            <Text variant="body-default-s">
              {formatCurrency(dashboardData.totalIncomePaise)} of {formatCurrency(dashboardData.thresholdPaise)}
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {formatCurrency(remainingPaise)} remaining
            </Text>
          </Row>
        </Column>

        {/* Metric Cards */}
        <Column fillWidth gap="8">
          <Heading variant="heading-strong-s">Overview</Heading>
          <Row fillWidth gap="8" wrap>
            <Card fillWidth flex={1} padding="16" radius="l" border="neutral-alpha-weak">
              <Column fillWidth gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Earned this FY
                </Text>
                <Heading variant="heading-strong-m">
                  {formatCurrency(dashboardData.totalIncomePaise)}
                </Heading>
              </Column>
            </Card>
            <Card fillWidth flex={1} padding="16" radius="l" border="neutral-alpha-weak">
              <Column fillWidth gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Est. GST Liability
                </Text>
                <Heading variant="heading-strong-m">
                  {formatCurrency(gstLiabilityPaise)}
                </Heading>
              </Column>
            </Card>
            <Card fillWidth flex={1} padding="16" radius="l" border="neutral-alpha-weak">
              <Column fillWidth gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Remaining to Threshold
                </Text>
                <Heading variant="heading-strong-m">
                  {formatCurrency(remainingPaise)}
                </Heading>
              </Column>
            </Card>
            <Card fillWidth flex={1} padding="16" radius="l" border="neutral-alpha-weak">
              <Column fillWidth gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Threshold Used
                </Text>
                <Heading variant="heading-strong-m">
                  {percentage}%
                </Heading>
              </Column>
            </Card>
          </Row>
        </Column>

        {/* Filing Deadlines (if GST registered) */}
        {dashboardData.isGstRegistered && (
          <Column fillWidth gap="8">
            <Heading variant="heading-strong-s">Filing Deadlines</Heading>
            <Row fillWidth gap="8">
              <Card fillWidth flex={1} padding="16" radius="l" border="neutral-alpha-weak">
                <Column fillWidth gap="4">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    GSTR-1 Due
                  </Text>
                  <Heading variant="heading-strong-s">
                    {filingDeadlines.gstr1}
                  </Heading>
                </Column>
              </Card>
              <Card fillWidth flex={1} padding="16" radius="l" border="neutral-alpha-weak">
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
        )}

        {/* Recent Income */}
        <Column fillWidth gap="8">
          <Row fillWidth horizontal="between">
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
                  padding="12"
                  radius="l"
                  border="neutral-alpha-weak"
                  horizontal="between"
                >
                  <Column fillWidth gap="2">
                    <Text variant="body-default-m">{entry.source_name}</Text>
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      {entry.month}/{entry.year} • {entry.income_type}
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

        {/* Quick Actions */}
        <Column fillWidth gap="8">
          <Heading variant="heading-strong-s">Quick Actions</Heading>
          <Row fillWidth gap="8">
            <Button fillWidth onClick={() => router.push("/income")}>
              Log Income
            </Button>
            <Button fillWidth variant="secondary" onClick={() => router.push("/invoices")}>
              Add Invoice
            </Button>
          </Row>
        </Column>
      </Column>
    </Column>
  );
}
