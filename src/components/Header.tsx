"use client";

import { Row, Button, Column, Icon, SmartLink, UserMenu, Option, Text, Logo, Fade, Avatar, Background } from "@once-ui-system/core";
import { useUser } from "@/components/UserProvider";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/sb/client";

export const Header: React.FC<React.ComponentProps<typeof Row>> = ({ ...flex }) => {
  const { profile } = useUser();
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <Row fillWidth padding="8" horizontal="center" position="sticky" zIndex={8}>
      <Fade
        fillWidth
        position="absolute"
        pointerEvents="none"
        top="0"
        height={6}
        pattern={{ display: true, size: "2" }}
      />
      <Row maxWidth="m" horizontal="between" paddingLeft="20" paddingRight="12" minHeight="56" vertical="center" background="surface" border="neutral-alpha-weak" radius="l" {...flex}>
        <Row vertical="center" gap="32">
          <Logo dark icon="/trademarks/wordmark-dark.svg" href="/" size="s"/>
          <Logo light icon="/trademarks/wordmark-light.svg" href="/" size="s"/>
        </Row>
        {profile ? (
          <Row vertical="center" gap="16">
            <Row vertical="center" gap="16" horizontal="end" maxWidth={10}>
              <SmartLink prefixIcon="book" href="https://docs.once-ui.com/sb-starter/quick-start">
                <Text variant="label-default-s">
                  Docs
                </Text>
              </SmartLink>
              <UserMenu
                placement="bottom-end"
                dropdown={
                  <Column minWidth={14}>
                    <Background
                      position="absolute"
                      left="0"
                      right="0"
                      top="0"
                      bottom="0"
                      gradient={{
                        display: true,
                        x: 0,
                        y: -50,
                        colorStart: "brand-background-strong",
                        colorEnd: "static-transparent",
                      }} />
                    <Background
                      position="absolute"
                      left="0"
                      right="0"
                      top="0"
                      bottom="0"
                      gradient={{
                        display: true,
                        x: 100,
                        y: -50,
                        colorStart: "accent-background-strong",
                        colorEnd: "static-transparent",
                      }} />
                    <Column fillWidth gap="4" padding="4" radius="l" border="neutral-alpha-weak">
                      <Column fillWidth horizontal="center" gap="16" padding="24">
                        <Avatar size="l" />
                        {profile?.username && <Text variant="label-default-m">{profile?.username}</Text>}
                      </Column>
                      <Option hasPrefix={<Icon onBackground="neutral-weak" size="s" name="dashboard" />} label="Dashboard" value="dashboard" href="/dashboard" />
                      <Option hasPrefix={<Icon onBackground="neutral-weak" size="s" name="settings" />} label="Settings" value="settings" href="/settings" />
                    </Column>
                    <Column fillWidth padding="4">
                      <Option hasPrefix={<Icon onBackground="neutral-weak" size="s" name="logout" />} label="Log out" value="logout" onClick={logout} />
                    </Column>
                  </Column>
                }
              />
            </Row>
          </Row>
        ) : (
          <Row vertical="center">
            <Row fitWidth vertical="center" gap="8">
              <Button size="s" variant="secondary" label="Log in" href="/auth?state=login" />
              <Button size="s" label="Sign up" href="/auth?state=signup" />
            </Row>
          </Row>
        )}
      </Row>
    </Row>
  );
};
