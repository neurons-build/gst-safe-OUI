"use client";

import { Column, Text, Button, Spinner, Row, Dialog, Input } from "@once-ui-system/core";
import { useUser } from "@/components/UserProvider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { validation } from "@/resources/validation";

export default function Profile() {
  const { loading, error, profile, userEmail, refresh, roleRank, roleId } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editField, setEditField] = useState<null | "username">(null);
  const [formValue, setFormValue] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);
  const hasRetriedRef = useRef(false);

  // One-time silent retry to avoid transient error right after login redirect
  useEffect(() => {
    if (!loading && !profile && error && !hasRetriedRef.current) {
      hasRetriedRef.current = true;
      setRetrying(true);
      const t = setTimeout(async () => {
        try {
          await refresh();
        } finally {
          setRetrying(false);
        }
      }, 250);
      return () => clearTimeout(t);
    }
  }, [loading, profile, error, refresh]);

  const openEditor = useCallback((field: "username") => {
    setEditField(field);
    setFormValue(profile?.username ?? "");
    setSaveError(null);
    setIsDialogOpen(true);
  }, [profile?.username]);

  const title = useMemo(() => {
    if (editField === "username") return "Edit username";
    return "Edit";
  }, [editField]);

  const handleSave = useCallback(async () => {
    if (!editField) return;
    try {
      setSaving(true);
      setSaveError(null);
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [editField]: formValue }),
        credentials: "include",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Failed to update (${res.status})`);
      }
      await refresh();
      setIsDialogOpen(false);
      setEditField(null);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  }, [editField, formValue, refresh]);

  return (
    <>
      <Column fill horizontal="center" paddingX="l" paddingTop="64">
        <Column maxWidth="s" radius="xl" border="neutral-medium">
          {(loading || retrying) && <Spinner fill center padding="xl" />}
          {error && !loading && !retrying && (
            <Row fillWidth horizontal="center" textVariant="label-default-s" onBackground="danger-weak" align="center" padding="xl">{error}</Row>
          )}

          {!loading && !error && profile && (
            <Column fillWidth>
              <Column fillWidth padding="4">
                <Column fillWidth padding="l" gap="24" radius="l" border="neutral-alpha-weak">
                  <Column fillWidth vertical="center">
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Email
                    </Text>
                    <Row minHeight="32" vertical="center" textVariant="label-default-s">
                      {userEmail}
                    </Row>
                  </Column>
                  <Column fillWidth vertical="center">
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Role
                    </Text>
                    <Row minHeight="32" vertical="center" textVariant="label-default-s">
                      {roleId} <Text onBackground="neutral-weak" marginLeft="4">({roleRank})</Text>
                    </Row>
                  </Column>
                  <Column fillWidth vertical="center" gap="8">
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Username
                    </Text>
                    <Row fillWidth horizontal="between" gap="16" s={{direction: "column"}}>
                      {profile.username ? (
                        <Row maxWidth={24} textVariant="label-default-s">
                          {profile.username}
                        </Row>
                      ) : (
                        <Row minHeight="32" vertical="center" textVariant="label-default-s" onBackground="neutral-weak">Not set</Row>
                      )}
                      <Row minWidth="56">
                        <Button fillWidth size="s" label={profile.username ? "Edit" : "Add"} variant="secondary" onClick={() => openEditor("username")} />
                      </Row>
                    </Row>
                  </Column>
                </Column>
              </Column>
            </Column>
          )}
        </Column>
        <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title={title}
          footer={
            <Row fillWidth horizontal="end" gap="8">
              <Button size="s" disabled={saving} label="Cancel" variant="secondary" onClick={() => setIsDialogOpen(false)} />
              <Button size="s" disabled={saving} onClick={() => void handleSave()}>
                {saving ? <Spinner size="s" /> : "Save"}
              </Button>
            </Row>
          }
        >
          {editField === "username" && (
            <Input id="username" type="text" placeholder="Username" required
              minLength={validation.username.minLength}
              maxLength={validation.username.maxLength}
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)} error={!!saveError} errorMessage={saveError || undefined} />
          )}
        </Dialog>
      </Column>
    </>
  );
}
