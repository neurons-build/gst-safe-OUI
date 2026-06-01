"use client";

import { createClient } from "@/lib/sb/client";
import { Button, Column, Input, PasswordInput, Row, SmartLink, Spinner, Text } from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/onboarding`,
          data: {
            full_name: email.split('@')[0], // Temporary name from email
          },
        },
      });
      if (error) throw error;
      router.push("/onboarding");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Column fillWidth {...props}>
      <form onSubmit={handleSignUp}>
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
          <Column fillWidth gap="8">
            <PasswordInput
              id="password"
              radius="bottom"
              placeholder="Password"
              required
              value={password}
              errorMessage={error}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Column>
          <Row fillWidth paddingX="24" paddingTop="24">
            <Button fillWidth type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Sign up"}
            </Button>
          </Row>
        </Column>
      </form>
    </Column>
  );
}