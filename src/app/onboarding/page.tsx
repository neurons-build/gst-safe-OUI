"use client";

import { createClient } from "@/lib/sb/client";
import { Button, Column, Heading, Input, Row, Select, SmartLink, Spinner, Text } from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { INDIAN_STATES } from "@/lib/gst-utils";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [state, setState] = useState("");
  const [useManualState, setUseManualState] = useState(false);
  const [isGstRegistered, setIsGstRegistered] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [skipLink, setSkipLink] = useState("/auth?state=login&skip=true");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setSkipLink("/auth?state=login&skip=true");
        router.push("/auth?state=login");
        return;
      }
      setSkipLink("/dashboard?skipOnboarding=true");
    };
    checkAuth();
  }, [router, supabase]);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !profession.trim()) {
      setError("Please fill in all fields");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state) {
      setError("Please select your state");
      return;
    }
    setError(null);
    setStep(3);
  };

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGstRegistered === null) {
      setError("Please select an option");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      // Get state category and threshold
      const stateCategory = state === "Jammu & Kashmir" ||
        state === "Uttarakhand" ||
        state === "Himachal Pradesh" ||
        state === "Manipur" ||
        state === "Mizoram" ||
        state === "Nagaland" ||
        state === "Tripura" ||
        state === "Sikkim" ||
        state === "Arunachal Pradesh" ||
        state === "Meghalaya"
        ? "special"
        : "general";

      const gstThreshold = stateCategory === "special" ? 100000000 : 200000000; // in paise

      // Update user profile in database
      const { error: updateError } = await supabase
        .from("users")
        .update({
          name: name.trim(),
          profession: profession.trim(),
          state: state,
          state_category: stateCategory,
          gst_threshold: gstThreshold,
          is_gst_registered: isGstRegistered,
          onboarding_complete: true,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Column fillWidth center padding="xl">
      <Column maxWidth="s" padding="xl" radius="xl" border="neutral-alpha-weak" horizontal="center" gap="l">
        <Heading variant="heading-strong-l" align="center">
          Welcome to GSTSafe
        </Heading>
        <Text variant="body-default-s" align="center" onBackground="neutral-weak">
          {step === 1 && "Let's get to know you"}
          {step === 2 && "Where are you based?"}
          {step === 3 && "Your GST status"}
        </Text>

        {/* Progress indicator */}
        <Row gap="8" fillWidth horizontal="center">
          {[1, 2, 3].map((s) => (
            <Row
              key={s}
              minWidth="32"
              minHeight="32"
              center
              radius="full"
              solid={s <= step ? "brand-medium" : "neutral-weak"}
              onSolid={s <= step ? "brand-strong" : "neutral-strong"}
            >
              {s}
            </Row>
          ))}
        </Row>

        {error && (
          <Text variant="label-default-s" onBackground="danger-weak" align="center">
            {error}
          </Text>
        )}

        {/* Step 1: Name and Profession */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} style={{ width: "100%" }}>
            <Column fillWidth gap="16">
              <Column fillWidth gap="8">
                <Text variant="label-default-s">Name</Text>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Column>
              <Column fillWidth gap="8">
                <Text variant="label-default-s">Profession</Text>
                <Input
                  id="profession"
                  type="text"
                  placeholder="e.g., Freelance graphic designer"
                  required
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />
              </Column>
              <Row fillWidth paddingTop="16">
                <Button fillWidth type="submit">
                  Continue
                </Button>
              </Row>
            </Column>
          </form>
        )}

        {/* Step 2: State Selection */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} style={{ width: "100%" }}>
            <Column fillWidth gap="16">
              <Column fillWidth gap="8">
                <Text variant="label-default-s">State</Text>
                {!useManualState ? (
                  <>
                    <Select
                      id="state"
                      name="state"
                      placeholder="Select your state"
                      required
                      value={state}
                      onChange={(e) => setState(String(e.target.value))}
                      options={INDIAN_STATES.map((s) => ({ label: s, value: s }))}
                    />
                    <Text variant="label-default-xs" onBackground="neutral-weak">
                      This determines your GST registration threshold (₹20L for most states, ₹10L for special category states)
                    </Text>
                    <Button
                      variant="tertiary"
                      onClick={() => {
                        setUseManualState(true);
                        setState("");
                      }}
                    >
                      Can't find your state? Enter manually
                    </Button>
                  </>
                ) : (
                  <>
                    <Input
                      id="state-manual"
                      type="text"
                      placeholder="Enter your state name"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <Text variant="label-default-xs" onBackground="neutral-weak">
                      Enter your state or union territory name
                    </Text>
                    <Button
                      variant="tertiary"
                      onClick={() => {
                        setUseManualState(false);
                        setState("");
                      }}
                    >
                      Back to dropdown
                    </Button>
                  </>
                )}
              </Column>
              <Row fillWidth gap="8" paddingTop="16">
                <Button fillWidth variant="secondary" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button fillWidth type="submit">
                  Continue
                </Button>
              </Row>
            </Column>
          </form>
        )}

        {/* Step 3: GST Registration Status */}
        {step === 3 && (
          <form onSubmit={handleStep3Submit} style={{ width: "100%" }}>
            <Column fillWidth gap="16">
              <Column fillWidth gap="8">
                <Text variant="label-default-s">Are you already GST registered?</Text>
                <Row gap="16">
                  <Button
                    fillWidth
                    variant={isGstRegistered === true ? "primary" : "secondary"}
                    onClick={() => {
                      setIsGstRegistered(true);
                      setError(null);
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    fillWidth
                    variant={isGstRegistered === false ? "primary" : "secondary"}
                    onClick={() => {
                      setIsGstRegistered(false);
                      setError(null);
                    }}
                  >
                    No
                  </Button>
                </Row>
              </Column>

              {isGstRegistered === true && (
                <Column fillWidth padding="16" radius="l" background="neutral-alpha-weak" gap="8">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Note: The threshold tracker will still be useful for monitoring your turnover, but registration alerts won't apply since you're already registered.
                  </Text>
                </Column>
              )}

              {isGstRegistered === false && (
                <Column fillWidth padding="16" radius="l" background="brand-alpha-weak" gap="8">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    We'll alert you when you're approaching the GST registration threshold so you can register on time and avoid penalties.
                  </Text>
                </Column>
              )}

              <Row fillWidth gap="8" paddingTop="16">
                <Button fillWidth variant="secondary" onClick={() => setStep(2)} disabled={isLoading}>
                  Back
                </Button>
                <Button fillWidth type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner /> : "Complete Setup"}
                </Button>
              </Row>
            </Column>
          </form>
        )}

        <Row fillWidth horizontal="center" paddingTop="16">
          <SmartLink href={skipLink}>
            <Text variant="label-default-s" onBackground="neutral-weak">
              Skip for now
            </Text>
          </SmartLink>
        </Row>
      </Column>
    </Column>
  );
}
