"use client";

import { createClient } from "@/lib/sb/client";
import { useUser } from "@/components/UserProvider";
import {
  Button,
  Column,
  Heading,
  Text,
  Row,
  Input,
  Select,
  Dialog,
} from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStateCategory, getThresholdForState, INDIAN_STATES } from "@/lib/gst-utils";

export default function Settings() {
  const { profile, userEmail } = useUser();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // User data
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [isGstRegistered, setIsGstRegistered] = useState(false);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [subscriptionPlan, setSubscriptionPlan] = useState<"free" | "pro">("free");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth?state=login");
        return;
      }

      // Fetch user data from users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (userError) throw userError;

      if (userData) {
        setName(userData.name || "");
        setProfession(userData.profession || "");
        setState(userData.state || "");
        setPhone(userData.phone || "");
        setIsGstRegistered(userData.is_gst_registered || false);
        setWhatsappAlerts(userData.whatsapp_alerts || false);
        setEmailAlerts(userData.email_alerts !== false);
      }

      // Fetch subscription status
      const { data: subData, error: subError } = await supabase
        .from("subscriptions")
        .select("plan")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (subError && subError.code !== 'PGRST116') throw subError;

      setSubscriptionPlan(subData?.plan || "free");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section: string) => {
    setSaving(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const updateData: any = {};

      if (section === "profile") {
        updateData.name = name.trim();
        updateData.profession = profession.trim();
      }

      if (section === "location") {
        const stateCategory = getStateCategory(state);
        const gstThreshold = getThresholdForState(state);
        updateData.state = state;
        updateData.state_category = stateCategory;
        updateData.gst_threshold = gstThreshold;
      }

      if (section === "alerts") {
        updateData.phone = phone.trim() || null;
        updateData.whatsapp_alerts = whatsappAlerts;
        updateData.email_alerts = emailAlerts;
      }

      if (section === "gst") {
        updateData.is_gst_registered = isGstRegistered;
      }

      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", user.id);

      if (error) throw error;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      // Delete user data from users table (cascade will handle related records)
      const { error: dbError } = await supabase
        .from("users")
        .delete()
        .eq("id", user.id);

      if (dbError) throw dbError;

      // Delete auth user
      const { error: authError } = await supabase.auth.admin.deleteUser(user.id);
      if (authError) throw authError;

      // Sign out and redirect
      await supabase.auth.signOut();
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete account");
    }
  };

  if (loading) {
    return (
      <Column fillWidth center padding="xl">
        <Text>Loading...</Text>
      </Column>
    );
  }

  return (
    <Column fillWidth horizontal="center" paddingX="l" paddingTop="64">
      <Column maxWidth="l" fillWidth gap="24">
        {/* Header */}
        <Column gap="4">
          <Heading variant="display-strong-s">Settings</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Manage your account and preferences
          </Text>
        </Column>

        {error && (
          <Text variant="label-default-s" onBackground="danger-weak">
            {error}
          </Text>
        )}

        {/* Profile Section */}
        <Column fillWidth gap="16" padding="24" radius="l" border="neutral-alpha-weak">
          <Heading variant="heading-strong-s">Profile</Heading>
          <Column fillWidth gap="16">
            <Column fillWidth gap="8">
              <Text variant="label-default-s">Name</Text>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Column>
            <Column fillWidth gap="8">
              <Text variant="label-default-s">Profession</Text>
              <Input
                id="profession"
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </Column>
            <Column fillWidth gap="8">
              <Text variant="label-default-s">Email</Text>
              <Text variant="body-default-s">{userEmail}</Text>
            </Column>
            <Row fillWidth horizontal="end">
              <Button size="s" onClick={() => handleSave("profile")} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </Row>
          </Column>
        </Column>

        {/* Location Section */}
        <Column fillWidth gap="16" padding="24" radius="l" border="neutral-alpha-weak">
          <Heading variant="heading-strong-s">Location</Heading>
          <Column fillWidth gap="16">
            <Column fillWidth gap="8">
              <Text variant="label-default-s">State</Text>
              <Select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                options={INDIAN_STATES.map((s: string) => ({ label: s, value: s }))}
              />
              <Text variant="label-default-xs" onBackground="neutral-weak">
                This determines your GST registration threshold (₹20L for most states, ₹10L for special category states)
              </Text>
            </Column>
            <Row fillWidth horizontal="end">
              <Button size="s" onClick={() => handleSave("location")} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </Row>
          </Column>
        </Column>

        {/* Alerts Section */}
        <Column fillWidth gap="16" padding="24" radius="l" border="neutral-alpha-weak">
          <Heading variant="heading-strong-s">Alerts</Heading>
          <Column fillWidth gap="16">
            <Column fillWidth gap="8">
              <Text variant="label-default-s">Phone Number (for WhatsApp alerts)</Text>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Column>
            <Row fillWidth gap="16">
              <Column fillWidth gap="8">
                <Text variant="label-default-s">WhatsApp Alerts</Text>
                <Text variant="label-default-xs" onBackground="neutral-weak">
                  {subscriptionPlan === "free" ? "Pro feature" : "Receive alerts via WhatsApp"}
                </Text>
              </Column>
              <Button
                fillWidth
                variant={whatsappAlerts ? "primary" : "secondary"}
                onClick={() => setWhatsappAlerts(!whatsappAlerts)}
                disabled={subscriptionPlan === "free"}
              >
                {whatsappAlerts ? "On" : "Off"}
              </Button>
            </Row>
            <Row fillWidth gap="16">
              <Column fillWidth gap="8">
                <Text variant="label-default-s">Email Alerts</Text>
                <Text variant="label-default-xs" onBackground="neutral-weak">
                  Receive threshold alerts via email
                </Text>
              </Column>
              <Button
                fillWidth
                variant={emailAlerts ? "primary" : "secondary"}
                onClick={() => setEmailAlerts(!emailAlerts)}
              >
                {emailAlerts ? "On" : "Off"}
              </Button>
            </Row>
            <Row fillWidth horizontal="end">
              <Button size="s" onClick={() => handleSave("alerts")} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </Row>
          </Column>
        </Column>

        {/* GST Status Section */}
        <Column fillWidth gap="16" padding="24" radius="l" border="neutral-alpha-weak">
          <Heading variant="heading-strong-s">GST Registration Status</Heading>
          <Column fillWidth gap="16">
            <Row fillWidth gap="16">
              <Column fillWidth gap="8">
                <Text variant="label-default-s">Are you GST registered?</Text>
                <Text variant="label-default-xs" onBackground="neutral-weak">
                  Update this if your registration status changes
                </Text>
              </Column>
              <Row gap="8">
                <Button
                  variant={isGstRegistered ? "primary" : "secondary"}
                  onClick={() => setIsGstRegistered(true)}
                >
                  Yes
                </Button>
                <Button
                  variant={!isGstRegistered ? "primary" : "secondary"}
                  onClick={() => setIsGstRegistered(false)}
                >
                  No
                </Button>
              </Row>
            </Row>
            <Row fillWidth horizontal="end">
              <Button size="s" onClick={() => handleSave("gst")} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </Row>
          </Column>
        </Column>

        {/* Subscription Section */}
        <Column fillWidth gap="16" padding="24" radius="l" border="neutral-alpha-weak">
          <Heading variant="heading-strong-s">Subscription</Heading>
          <Column fillWidth gap="16">
            <Row fillWidth horizontal="between" vertical="center">
              <Column gap="2">
                <Text variant="body-default-m">Current Plan: {subscriptionPlan.toUpperCase()}</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {subscriptionPlan === "free" ? "10 invoice limit, email alerts only" : "Unlimited invoices, WhatsApp alerts"}
                </Text>
              </Column>
              {subscriptionPlan === "free" && (
                <Button onClick={() => router.push("/upgrade")}>
                  Upgrade to Pro
                </Button>
              )}
            </Row>
          </Column>
        </Column>

        {/* Account Section */}
        <Column fillWidth gap="16" padding="24" radius="l" border="danger-alpha-weak">
          <Heading variant="heading-strong-s" onBackground="danger-weak">Account</Heading>
          <Column fillWidth gap="16">
            <Text variant="body-default-s" onBackground="neutral-weak">
              Deleting your account will permanently remove all your data including income entries, invoices, and settings. This action cannot be undone.
            </Text>
            <Row fillWidth horizontal="end">
              <Button size="s" variant="secondary" onClick={() => setDeleteDialogOpen(true)}>
                Delete Account
              </Button>
            </Row>
          </Column>
        </Column>

        {/* Delete Account Confirmation Dialog */}
        <Dialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          title="Delete Account"
          footer={
            <Row fillWidth horizontal="end" gap="8">
              <Button size="s" variant="secondary" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button size="s" onClick={handleDeleteAccount}>
                Delete
              </Button>
            </Row>
          }
        >
          <Column fillWidth gap="8">
            <Text variant="body-default-s">
              Are you sure you want to delete your account? This will permanently delete:
            </Text>
            <Column fillWidth gap="4">
              <Text variant="label-default-s">• All income entries</Text>
              <Text variant="label-default-s">• All uploaded invoices</Text>
              <Text variant="label-default-s">• Your profile and settings</Text>
              <Text variant="label-default-s">• Subscription data</Text>
            </Column>
            <Text variant="body-default-s" onBackground="danger-weak">
              This action cannot be undone.
            </Text>
          </Column>
        </Dialog>
      </Column>
    </Column>
  );
}
