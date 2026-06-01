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
  Input,
} from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalIncomeEntries: number;
  totalInvoices: number;
  usersThisWeek: number;
  usersThisMonth: number;
}

export default function Admin() {
  const router = useRouter();
  const supabase = createClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);

  const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
      fetchStats();
    } else {
      setAuthError("Invalid credentials");
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { count: totalUsers } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: activeUsers } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .gte("updated_at", thirtyDaysAgo.toISOString());

      const { count: totalIncomeEntries } = await supabase
        .from("income_entries")
        .select("*", { count: "exact", head: true });

      const { count: totalInvoices } = await supabase
        .from("invoices")
        .select("*", { count: "exact", head: true });

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const { count: usersThisWeek } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .gte("created_at", weekAgo.toISOString());

      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      
      const { count: usersThisMonth } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .gte("created_at", monthAgo.toISOString());

      setStats({
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        totalIncomeEntries: totalIncomeEntries || 0,
        totalInvoices: totalInvoices || 0,
        usersThisWeek: usersThisWeek || 0,
        usersThisMonth: usersThisMonth || 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Column fillWidth horizontal="center" paddingX="l" paddingTop="128">
        <Column maxWidth="m" fillWidth gap="24">
          <Column gap="8" horizontal="center">
            <Heading variant="display-strong-m">Admin Login</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Enter your admin credentials to access the dashboard
            </Text>
          </Column>
          <Card fillWidth padding="32" radius="l" border="neutral-alpha-weak">
            <form onSubmit={handleLogin}>
              <Column fillWidth gap="16">
                <Column fillWidth gap="8">
                  <Text variant="label-default-s">Username</Text>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Column>
                <Column fillWidth gap="8">
                  <Text variant="label-default-s">Password</Text>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Column>
                {authError && (
                  <Text variant="label-default-s" onBackground="danger-weak">
                    {authError}
                  </Text>
                )}
                <Button fillWidth type="submit">
                  Login
                </Button>
              </Column>
            </form>
          </Card>
        </Column>
      </Column>
    );
  }

  return (
    <Column fillWidth horizontal="center" paddingX="l" paddingTop="64">
      <Column maxWidth="l" fillWidth gap="24">
        <Row fillWidth horizontal="between">
          <Column gap="4">
            <Heading variant="display-strong-m">Admin Dashboard</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Site analytics and user statistics
            </Text>
          </Column>
          <Button size="s" variant="secondary" onClick={() => setIsAuthenticated(false)}>
            Logout
          </Button>
        </Row>

        {loading ? (
          <Column fillWidth center padding="xl">
            <Text>Loading stats...</Text>
          </Column>
        ) : stats ? (
          <>
            <Row fillWidth gap="16" wrap>
              <Card fillWidth flex={1} padding="24" radius="l" border="neutral-alpha-weak">
                <Column fillWidth gap="8">
                  <Text variant="label-default-s" onBackground="neutral-weak">Total Users</Text>
                  <Heading variant="display-strong-s">{stats.totalUsers}</Heading>
                </Column>
              </Card>
              <Card fillWidth flex={1} padding="24" radius="l" border="neutral-alpha-weak">
                <Column fillWidth gap="8">
                  <Text variant="label-default-s" onBackground="neutral-weak">Active Users (30d)</Text>
                  <Heading variant="display-strong-s">{stats.activeUsers}</Heading>
                </Column>
              </Card>
              <Card fillWidth flex={1} padding="24" radius="l" border="neutral-alpha-weak">
                <Column fillWidth gap="8">
                  <Text variant="label-default-s" onBackground="neutral-weak">Users This Week</Text>
                  <Heading variant="display-strong-s">{stats.usersThisWeek}</Heading>
                </Column>
              </Card>
              <Card fillWidth flex={1} padding="24" radius="l" border="neutral-alpha-weak">
                <Column fillWidth gap="8">
                  <Text variant="label-default-s" onBackground="neutral-weak">Users This Month</Text>
                  <Heading variant="display-strong-s">{stats.usersThisMonth}</Heading>
                </Column>
              </Card>
            </Row>

            <Row fillWidth gap="16" wrap>
              <Card fillWidth flex={1} padding="24" radius="l" border="neutral-alpha-weak">
                <Column fillWidth gap="8">
                  <Text variant="label-default-s" onBackground="neutral-weak">Total Income Entries</Text>
                  <Heading variant="display-strong-s">{stats.totalIncomeEntries}</Heading>
                </Column>
              </Card>
              <Card fillWidth flex={1} padding="24" radius="l" border="neutral-alpha-weak">
                <Column fillWidth gap="8">
                  <Text variant="label-default-s" onBackground="neutral-weak">Total Invoices</Text>
                  <Heading variant="display-strong-s">{stats.totalInvoices}</Heading>
                </Column>
              </Card>
            </Row>

            <Row fillWidth horizontal="end">
              <Button onClick={fetchStats} disabled={loading}>
                Refresh Stats
              </Button>
            </Row>
          </>
        ) : (
          <Column fillWidth center padding="xl">
            <Text variant="body-default-s" onBackground="neutral-weak">
              Failed to load statistics
            </Text>
            <Button onClick={fetchStats}>Retry</Button>
          </Column>
        )}
      </Column>
    </Column>
  );
}