"use client";

import { createClient } from "@/lib/sb/client";
import { Button, Column, Input, PasswordInput, Row, SmartLink, Spinner, Text } from "@once-ui-system/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const skip = searchParams.get("skip") === "true";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (skip) {
        router.push("/dashboard?skipOnboarding=true");
      } else {
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Column fillWidth {...props}>
      <form onSubmit={handleLogin}>
        <Column fillWidth gap="-1">
          <Input
            id="email"
            type="email"
            radius="top"
            placeholder="Email address"
            required
            error={error ? true : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Column fillWidth gap="4">
            <PasswordInput
              id="password"
              type="password"
              radius="bottom"
              placeholder="Enter your password"
              required
              errorMessage={error}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Row fillWidth horizontal="end" paddingRight="24" paddingTop="8">
              <SmartLink href={`/auth?state=forgot-password${skip ? "&skip=true" : ""}`}>
                <Text variant="label-default-s">Forgot your password?</Text>
              </SmartLink>
            </Row>
          </Column>
          <Row fillWidth paddingX="24" paddingTop="24">
            <Button fillWidth type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Login"}
            </Button>
          </Row>
        </Column>
      </form>
    </Column>
  );
}