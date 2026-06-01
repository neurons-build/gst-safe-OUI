"use client";

import { Column, Line, Logo, Row, SmartLink, Text } from "@once-ui-system/core";
import { LoginForm } from "./components/LogInForm";
import { SignUpForm } from "./components/SignUpForm";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function AuthInner() {
  const [state, setState] = useState("login");
  const searchParams = useSearchParams();

  useEffect(() => {
    const qp = searchParams.get("state");
    if (!qp) return;
    const allowed = new Set(["login", "signup", "forgot-password"]);
    if (allowed.has(qp)) {
      setState(qp);
    }
  }, [searchParams]);

  return (
    <>
      {state === "login" && <LoginForm />}
      {state === "signup" && <SignUpForm />}
      {state === "forgot-password" && <ForgotPasswordForm />}
      <Row fillWidth horizontal="center" marginTop="48">
        <Line maxWidth="48"/>
      </Row>
      {state === "login" ? (
        <Row fillWidth gap="4" align="center" horizontal="center">
          Don't have an account?
          <SmartLink href="?state=signup">
            Sign up
          </SmartLink>
        </Row>
      ) : (
        <Row fillWidth gap="4" align="center" horizontal="center">
          Already have an account?
          <SmartLink href="?state=login">
            Login
          </SmartLink>
        </Row>
      )}
      <Row fillWidth horizontal="center" gap="8">
        <SmartLink href="/terms-of-use"><Text variant="body-default-xs" align="center" onBackground="neutral-weak">Terms of Use</Text></SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak">•</Text>
        <SmartLink href="/privacy-policy"><Text variant="body-default-xs" align="center" onBackground="neutral-weak">Privacy Policy</Text></SmartLink>
      </Row>
    </>
  );
}

export default function Page() {
  return (
    <Column fillWidth center padding="xl">
      <Column maxWidth="xs" padding="xl" radius="xl" border="neutral-alpha-weak" horizontal="center" gap="l">
        <Row marginBottom="32">
          <Logo dark icon="/trademarks/icon-dark.svg" href="/" size="l"/>
          <Logo light icon="/trademarks/icon-light.svg" href="/" size="l"/>
        </Row>
        <Suspense>
          <AuthInner />
        </Suspense>
      </Column>
    </Column>
  );
}
  