"use client";

import React from "react";
import {
  Avatar,
  Background,
  Badge,
  Button,
  Card,
  Column,
  Grid,
  Heading,
  IconButton,
  Line,
  Logo,
  Mask,
  Particle,
  Row,
  SmartLink,
  Tag,
  Text,
  TypeFx,
} from "@once-ui-system/core";
import { useUser } from "@/components/UserProvider";

export default function Home() {
  const { profile } = useUser();

  return (
    <Column fillWidth horizontal="center" paddingTop="64" paddingBottom="0">
      {/* Visual background gradient mesh behind hero */}
      <Background
        style={{ top: "-6rem", opacity: 0.15 }}
        position="absolute"
        left="0"
        gradient={{
          display: true,
          x: 50,
          y: 0,
          colorStart: "brand-background-strong",
        }}
      />

      <Column maxWidth="l" fillWidth gap="104" paddingX="l">
        {/* ── 1. HERO SECTION ───────────────────────────────────────── */}
        <Row
          fillWidth
          gap="48"
          vertical="center"
          s={{ direction: "column", style: { gap: "var(--static-space-40)" } }}
          m={{ direction: "column", style: { gap: "var(--static-space-48)" } }}
          l={{ direction: "row" }}
        >
          {/* Hero text content block */}
          <Column gap="24" style={{ flex: 1.3 }}>
            <Row>
              <Badge
                pointerEvents="none"
                textVariant="label-strong-s"
                onBackground="brand-strong"
                background="brand-alpha-weak"
                border="brand-alpha-weak"
              >
                🇮🇳 Tailored for Indian Freelancers & Designers
              </Badge>
            </Row>
            <Heading variant="display-strong-m" onBackground="neutral-strong">
              Worry-free GST compliance for Indian freelancers & creators.
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: "1.6" }}>
              Track your multi-source income in real-time, get automated alerts before you cross the ₹20 Lakh threshold, and manage zero-rated export invoices with ease.
            </Text>
            <Row gap="16" vertical="center" s={{ direction: "column", horizontal: "stretch" }}>
              <Button
                href={profile ? "/dashboard" : "/auth"}
                style={{ backgroundColor: "#0F172A", color: "#FFFFFF", border: "none" }}
                size="l"
              >
                {profile ? "Go to Dashboard" : "Start Tracking for Free"}
              </Button>
              <Button href="#features" variant="secondary" size="l">
                Explore Features
              </Button>
            </Row>
          </Column>

          {/* Hero visual UI mockup card */}
          <Column style={{ flex: 1 }} fillWidth horizontal="center" l={{ horizontal: "end" }}>
            <Card
              fillWidth
              padding="24"
              radius="xl"
              border="neutral-alpha-weak"
              background="surface"
              style={{
                boxShadow: "0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.08)",
                border: "1px solid #E2E8F0",
                maxWidth: "440px",
              }}
            >
              <Column gap="20">
                {/* Mockup Header */}
                <Row horizontal="between" vertical="center" fillWidth>
                  <Row gap="8" vertical="center">
                    <div
                      style={{
                        backgroundColor: "#0F172A",
                        borderRadius: "8px",
                        padding: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L3 7V12C3 17.5 7 21 12 22C17 21 21 17.5 21 12V7L12 2Z" fill="#10B981" />
                        <path d="M9 11.5L11 13.5L15 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <Column>
                      <Text variant="label-strong-m" onBackground="neutral-strong">
                        GSTSafe Monitor
                      </Text>
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        FY 2026-27
                      </Text>
                    </Column>
                  </Row>
                  <Badge background="success-alpha-weak" onBackground="success-strong" border="success-alpha-weak">
                    ● Active Tracking
                  </Badge>
                </Row>

                {/* Mockup tracked income values */}
                <Column gap="4">
                  <Text variant="label-default-xs" onBackground="neutral-weak">
                    Domestic Income Tracked
                  </Text>
                  <Row vertical="end" gap="4">
                    <Heading variant="heading-strong-xl" onBackground="neutral-strong">
                      ₹14,60,000
                    </Heading>
                    <Text variant="body-default-m" onBackground="neutral-weak" style={{ marginBottom: "4px" }}>
                      of ₹20,00,000
                    </Text>
                  </Row>
                </Column>

                {/* Progress bar visual representation */}
                <Column gap="8">
                  <Row horizontal="between" vertical="center">
                    <Text variant="body-default-xs" onBackground="neutral-weak">
                      Threshold Progress
                    </Text>
                    <Text variant="label-strong-s" style={{ color: "#10B981" }}>
                      73% used
                    </Text>
                  </Row>
                  <Row fillWidth height="12" radius="full" style={{ backgroundColor: "#E2E8F0", overflow: "hidden" }}>
                    <div style={{ width: "73%", backgroundColor: "#10B981", height: "100%", borderRadius: "9999px" }} />
                  </Row>
                  <Row horizontal="between" vertical="center">
                    <Text variant="body-default-xs" onBackground="neutral-weak">
                      ₹0
                    </Text>
                    <Text variant="body-default-xs" style={{ color: "#F59E0B" }}>
                      75% Alert (₹15.0L)
                    </Text>
                    <Text variant="body-default-xs" onBackground="neutral-weak">
                      ₹20.0L
                    </Text>
                  </Row>
                </Column>

                {/* Income source lines */}
                <Column gap="12" style={{ borderTop: "1px solid #F1F5F9", paddingTop: "16px" }}>
                  <Text variant="label-strong-xs" onBackground="neutral-weak">
                    INCOME SOURCES
                  </Text>
                  <Row horizontal="between" vertical="center">
                    <Row gap="8" vertical="center">
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                      <Text variant="body-default-xs" onBackground="neutral-strong">
                        Domestic (Counts toward GST)
                      </Text>
                    </Row>
                    <Text variant="label-strong-xs" onBackground="neutral-strong">
                      ₹14,60,000
                    </Text>
                  </Row>
                  <Row horizontal="between" vertical="center">
                    <Row gap="8" vertical="center">
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3B82F6" }} />
                      <Text variant="body-default-xs" onBackground="neutral-strong">
                        Export (Zero-Rated / Exempt)
                      </Text>
                    </Row>
                    <Text variant="label-strong-xs" onBackground="neutral-strong">
                      ₹4,80,000
                    </Text>
                  </Row>
                </Column>

                {/* WhatsApp Notification bubble mockup */}
                <div
                  style={{
                    backgroundColor: "#F0FDF4",
                    borderLeft: "4px solid #22C55E",
                    padding: "12px",
                    borderRadius: "8px",
                    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.02)",
                  }}
                >
                  <Row gap="12" vertical="start">
                    <span style={{ fontSize: "16px" }}>💬</span>
                    <Column gap="2" style={{ flex: 1 }}>
                      <Row horizontal="between" fillWidth>
                        <Text variant="label-strong-xs" style={{ color: "#166534" }}>
                          WhatsApp Alert Setup
                        </Text>
                        <Text variant="body-default-xs" style={{ color: "#166534", opacity: 0.8 }}>
                          Next: 75%
                        </Text>
                      </Row>
                      <Text variant="body-default-xs" style={{ color: "#166534", lineHeight: "1.4" }}>
                        "Heads up! You're at 73% of your ₹20L GST threshold. Next notification at 75% (₹15,00,000)."
                      </Text>
                    </Column>
                  </Row>
                </div>
              </Column>
            </Card>
          </Column>
        </Row>

        {/* ── 2. TRUST / SOCIAL PROOF BANNER ───────────────────────── */}
        <Column
          fillWidth
          paddingY="32"
          radius="xl"
          background="surface"
          style={{ border: "1px solid #E2E8F0", overflow: "hidden" }}
          horizontal="center"
          gap="16"
        >
          <Text
            variant="label-default-xs"
            onBackground="neutral-weak"
            style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            Built for Indian tech freelancers and designers
          </Text>
          <div className="marquee-container">
            <div className="marquee-content">
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                💻 Software Engineers
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                🎨 UI/UX Designers
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                📣 Marketing Consultants
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                ✍️ Content Creators
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                💻 Software Engineers
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                🎨 UI/UX Designers
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                📣 Marketing Consultants
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                ✍️ Content Creators
              </Text>
            </div>
            <div className="marquee-content" aria-hidden="true">
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                💻 Software Engineers
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                🎨 UI/UX Designers
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                📣 Marketing Consultants
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                ✍️ Content Creators
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                💻 Software Engineers
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                🎨 UI/UX Designers
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                📣 Marketing Consultants
              </Text>
              <Text variant="label-strong-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
                ✍️ Content Creators
              </Text>
            </div>
          </div>
        </Column>

        {/* ── 3. FEATURES SECTION ───────────────────────────────────── */}
        <Column fillWidth gap="48" id="features">
          <Column horizontal="center" gap="12">
            <Row>
              <Badge background="brand-alpha-weak" onBackground="brand-strong" border="brand-alpha-weak">
                Features
              </Badge>
            </Row>
            <Heading variant="display-strong-xs" align="center" onBackground="neutral-strong">
              Tax compliance, automated.
            </Heading>
            <Text variant="body-default-m" align="center" onBackground="neutral-weak" style={{ maxWidth: "600px" }}>
              Run your freelance business with total tax peace of mind. No manual spreadsheets, no last-minute compliance
              panics.
            </Text>
          </Column>

          <Grid fillWidth gap="24" columns="3" m={{ columns: 2 }} s={{ columns: 1 }}>
            {/* Card 1: Tracker */}
            <Card
              fillWidth
              padding="24"
              radius="xl"
              border="neutral-alpha-weak"
              background="surface"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.05)" }}
            >
              <Column gap="16">
                <Row>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "#E8F5EE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3V21H21" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 14L12 9L17 14L21 10" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Row>
                <Heading variant="heading-strong-s" onBackground="neutral-strong">
                  Real-Time Threshold Tracker
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak" style={{ lineHeight: "1.5" }}>
                  Instantly track domestic and export income. Exclude zero-rated exports automatically so your progress
                  towards the ₹20 Lakh registration limit is accurate.
                </Text>
              </Column>
            </Card>

            {/* Card 2: WhatsApp */}
            <Card
              fillWidth
              padding="24"
              radius="xl"
              border="neutral-alpha-weak"
              background="surface"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.05)" }}
            >
              <Column gap="16">
                <Row>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "#FEF3DC",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2 22L7 20.6622C8.47087 21.513 10.1786 22 12 22Z"
                        stroke="#F59E0B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M12 8V12L14 14" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Row>
                <Heading variant="heading-strong-s" onBackground="neutral-strong">
                  Smart WhatsApp Alerts
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak" style={{ lineHeight: "1.5" }}>
                  Receive automated, friendly notifications at critical limits. Get heads-up alerts at 75%, 90%, and 100%
                  proximity to ensure you register in time.
                </Text>
              </Column>
            </Card>

            {/* Card 3: Vault */}
            <Card
              fillWidth
              padding="24"
              radius="xl"
              border="neutral-alpha-weak"
              background="surface"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.05)" }}
            >
              <Column gap="16">
                <Row>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "#EAF4FB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 11H5C3.89543 11 3 11.8954 3 13V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V13C21 11.8954 20.1046 11 19 11Z"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Row>
                <Heading variant="heading-strong-s" onBackground="neutral-strong">
                  Secure Invoice Vault
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak" style={{ lineHeight: "1.5" }}>
                  Centralize all client invoices in a private vault. Link invoices to income streams and download
                  audit-ready compliance folders in seconds.
                </Text>
              </Column>
            </Card>
          </Grid>
        </Column>

        {/* ── 4. WHY YOU NEED THIS / PROBLEM SECTION ────────────────── */}
        <Column fillWidth gap="32" id="why-needed">
          <Column gap="12" horizontal="center">
            <Row>
              <Badge background="danger-alpha-weak" onBackground="danger-strong" border="danger-alpha-weak">
                Compliance Risk
              </Badge>
            </Row>
            <Heading variant="display-strong-xs" align="center" onBackground="neutral-strong">
              Why Freelancers Need This
            </Heading>
          </Column>

          <Row fillWidth gap="24" s={{ direction: "column" }} m={{ direction: "row" }}>
            {/* The Risk / Penalty Card */}
            <Card
              fillWidth
              padding="32"
              radius="xl"
              style={{
                borderLeft: "6px solid #EF4444",
                borderTop: "1px solid #E2E8F0",
                borderRight: "1px solid #E2E8F0",
                borderBottom: "1px solid #E2E8F0",
                backgroundColor: "#FFFFFF",
                flex: 1,
              }}
            >
              <Column gap="16">
                <Heading variant="heading-strong-m" onBackground="neutral-strong">
                  The Compliance Burden
                </Heading>
                <Text variant="body-default-m" onBackground="neutral-weak" style={{ lineHeight: "1.6" }}>
                  Missing the registration deadline carries a minimum penalty of{" "}
                  <strong style={{ color: "#EF4444" }}>₹10,000</strong>, plus{" "}
                  <strong style={{ color: "#EF4444" }}>₹50/day late filing fees</strong>.
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak" style={{ lineHeight: "1.5" }}>
                  Under Indian tax regulations, service providers must register for GST within 30 days of crossing the ₹20
                  Lakh aggregate limit. Doing this manually across multiple domestic client transfers and international bank
                  remittances is risky and prone to errors.
                </Text>
              </Column>
            </Card>

            {/* The Solution / GSTSafe Card */}
            <Card
              fillWidth
              padding="32"
              radius="xl"
              style={{
                borderLeft: "6px solid #10B981",
                borderTop: "1px solid #E2E8F0",
                borderRight: "1px solid #E2E8F0",
                borderBottom: "1px solid #E2E8F0",
                backgroundColor: "#FFFFFF",
                flex: 1,
              }}
            >
              <Column gap="16">
                <Heading variant="heading-strong-m" onBackground="neutral-strong">
                  The GSTSafe Solution
                </Heading>
                <Text variant="body-default-m" onBackground="neutral-weak" style={{ lineHeight: "1.6" }}>
                  Get one screen, one number. Answer exactly <strong style={{ color: "#10B981" }}>"Am I safe?"</strong> at
                  a glance.
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak" style={{ lineHeight: "1.5" }}>
                  GSTSafe offers you total transparency. Track domestic vs export sales instantly, view percentage metrics
                  relative to limit, and get automatically prompted when it is time to onboard or register.
                </Text>
              </Column>
            </Card>
          </Row>
        </Column>

        {/* ── 5. SIMPLE PRICING SECTION ──────────────────────────────── */}
        <Column fillWidth gap="48" id="pricing" horizontal="center">
          <Column horizontal="center" gap="12">
            <Row>
              <Badge background="brand-alpha-weak" onBackground="brand-strong" border="brand-alpha-weak">
                Pricing
              </Badge>
            </Row>
            <Heading variant="display-strong-xs" align="center" onBackground="neutral-strong">
              Simple, transparent pricing.
            </Heading>
            <Text variant="body-default-m" align="center" onBackground="neutral-weak">
              Start tracking for free. Upgrade to Pro for complete automated compliance peace of mind.
            </Text>
          </Column>

          <Row
            fillWidth
            gap="32"
            horizontal="center"
            s={{ direction: "column", horizontal: "stretch" }}
            m={{ direction: "row" }}
            style={{ maxWidth: "800px" }}
          >
            {/* Free Tier Card */}
            <Card
              fillWidth
              padding="32"
              radius="xl"
              background="surface"
              style={{
                border: "1px solid #E2E8F0",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "between",
              }}
            >
              <Column gap="24" fillHeight style={{ justifyContent: "space-between" }}>
                <Column gap="16">
                  <Column gap="8">
                    <Text variant="label-strong-m" onBackground="neutral-weak">
                      FREE PLAN
                    </Text>
                    <Row vertical="end" gap="4">
                      <Heading variant="display-strong-s" onBackground="neutral-strong">
                        ₹0
                      </Heading>
                      <Text variant="body-default-s" onBackground="neutral-weak" style={{ marginBottom: "4px" }}>
                        / forever
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      Basic income tracking and threshold monitoring.
                    </Text>
                  </Column>
                  <Line border="neutral-alpha-weak" />
                  <Column gap="12">
                    <Row gap="8" vertical="center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        Income tracking (multi-source)
                      </Text>
                    </Row>
                    <Row gap="8" vertical="center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        GST threshold progress bar
                      </Text>
                    </Row>
                    <Row gap="8" vertical="center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        Email alerts & notifications
                      </Text>
                    </Row>
                    <Row gap="8" vertical="center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        Up to 10 invoice uploads
                      </Text>
                    </Row>
                  </Column>
                </Column>
                <Button href={profile ? "/dashboard" : "/auth"} variant="secondary" fillWidth size="m">
                  {profile ? "Go to Dashboard" : "Start Tracking for Free"}
                </Button>
              </Column>
            </Card>

            {/* Pro Tier Card */}
            <Card
              fillWidth
              padding="32"
              radius="xl"
              background="surface"
              style={{
                border: "2px solid #0F172A",
                boxShadow: "0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.08)",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "between",
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", top: "-14px", right: "24px" }}>
                <Badge background="brand-strong" onBackground="brand-medium" border="brand-alpha-weak">
                  🔥 Best Value
                </Badge>
              </div>
              <Column gap="24" fillHeight style={{ justifyContent: "space-between" }}>
                <Column gap="16">
                  <Column gap="8">
                    <Text variant="label-strong-m" style={{ color: "#0F172A" }}>
                      PRO PLAN
                    </Text>
                    <Row vertical="end" gap="4">
                      <Heading variant="display-strong-s" onBackground="neutral-strong">
                        ₹999
                      </Heading>
                      <Text variant="body-default-s" onBackground="neutral-weak" style={{ marginBottom: "4px" }}>
                        / year
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      Complete automated threshold alerts and invoice protection.
                    </Text>
                  </Column>
                  <Line border="neutral-alpha-weak" />
                  <Column gap="12">
                    <Row gap="8" vertical="center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <Text variant="body-default-s" onBackground="neutral-strong" style={{ fontWeight: 600 }}>
                        Everything in Free
                      </Text>
                    </Row>
                    <Row gap="8" vertical="center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        Unlimited invoice storage
                      </Text>
                    </Row>
                    <Row gap="8" vertical="center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        Real-time WhatsApp alerts
                      </Text>
                    </Row>
                    <Row gap="8" vertical="center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        GST liability calculator
                      </Text>
                    </Row>
                  </Column>
                </Column>
                <Button
                  href={profile ? "/dashboard" : "/auth"}
                  style={{ backgroundColor: "#0F172A", color: "#FFFFFF", border: "none" }}
                  fillWidth
                  size="m"
                >
                  {profile ? "Go to Dashboard" : "Upgrade to Pro"}
                </Button>
              </Column>
            </Card>
          </Row>
        </Column>
      </Column>
      <Column height="104" />
      <Footer />
    </Column>
  );
}

const social = [
  {
    icon: "github",
    label: "GitHub",
    href: "https://github.com/shaayar/sightline",
  },
  {
    icon: "email",
    label: "Email",
    href: "mailto:support@sightline.dev",
  },
];

const navigation = [
  {
    title: "Product",
    items: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Features",
    items: [
      { label: "Guide Lines", href: "/features" },
      { label: "Box Model Inspector", href: "/features" },
      { label: "CSS Cascade Debugger", href: "/features" },
      { label: "Typography Inspector", href: "/features" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
      { label: "Chrome Web Store", href: "#" },
      { label: "GitHub", href: "https://github.com/shaayar/sightline" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const Footer = (flex: React.ComponentProps<typeof Column>) => {
  const { profile } = useUser();
  return (
    <Column fillWidth horizontal="center" {...flex}>

      <Row fillWidth borderY="neutral-alpha-medium">
        <Background
          lines={{
            display: true,
            color: "neutral-alpha-weak",
            angle: -45,
            size: "4"
          }}
          borderRight="neutral-alpha-medium"
          width={12}
          minWidth={12}
          m={{ hide: true }} />
        <Row fillWidth horizontal="center">
          <Row flex={1} border="neutral-alpha-medium" radius="full" minWidth={4} l={{ hide: true }} />
          <Column maxWidth="xl" paddingY="128" center paddingX="l" gap="24" s={{ direction: "column" }} borderLeft="neutral-alpha-medium" borderRight="neutral-alpha-medium" overflow="hidden">
            <Background
              position="absolute"
              fill
              lines={{
                display: true,
                color: "neutral-alpha-weak",
                angle: -45,
                size: "4"
              }} />
            <Row overflow="hidden" position="absolute" minWidth={80} minHeight={28} radius="full" border="neutral-alpha-medium">
              <Background
                fill
                position="absolute"
                bottom="0"
                left="0"
                data-solid="color"
                gradient={{
                  display: true,
                  x: 50,
                  y: 100,
                  width: 100,
                  height: 50,
                  colorStart: "brand-solid-strong",
                  colorEnd: "page-background",
                }}
              />
              <Background
                fill
                position="absolute"
                bottom="0"
                left="0"
                style={{ filter: "blur(1rem)", transform: "scale(1.1)" }}
                gradient={{
                  display: true,
                  x: 50,
                  y: 100,
                  width: 100,
                  height: 30,
                  colorStart: "brand-on-background-strong",
                }}
              />
            </Row>
            <Row overflow="hidden" position="absolute" minWidth={58} minHeight={28} radius="full" border="neutral-alpha-medium" />
            <Row overflow="hidden" position="absolute" minWidth={42} minHeight={28} radius="full" border="neutral-alpha-medium" />
            <Row overflow="hidden" position="absolute" minWidth={28} minHeight={28} radius="full" border="neutral-alpha-medium">
              <Mask fill
                position="absolute"
                x={50}
                y={50}
                radius={25}
              >
                <Particle style={{ transform: "scale(1.1)" }} opacity={70} position="absolute" top="0" left="0" fill interactive speed={1.5} density={100} size="2" intensity={20} mode="attract" />
              </Mask>
            </Row>
            <Column horizontal="center" gap="20">
              <TypeFx
                variant="display-strong-m"
                words={[
                  "Track GST limits effortlessly.",
                  "Get automated WhatsApp alerts.",
                  "Worry-free compliance today."
                ]}
                speed={80}
                hold={2000}
                trigger="instant"
              />
              <Button
                data-border="rounded"
                href={profile ? "/dashboard" : "/auth"}
                style={{ backgroundColor: "#0F172A", color: "#FFFFFF", border: "none" }}
                arrowIcon
              >
                {profile ? "Go to Dashboard" : "Start Tracking for Free"}
              </Button>
            </Column>
          </Column>
          <Row flex={1} border="neutral-alpha-medium" radius="full" minWidth={4} l={{ hide: true }} />
        </Row>
        <Background
          lines={{
            display: true,
            color: "neutral-alpha-weak",
            angle: -45,
            size: "4"
          }}
          borderLeft="neutral-alpha-medium"
          width={12}
          minWidth={12}
          m={{ hide: true }} />
      </Row>

      {/* Center Row */}
      <Row fillWidth horizontal="center">
  {/* LEFT SIDE */}
  <Row flex={1}>
    <Background
      fill
      border="neutral-alpha-medium"
      bottomRightRadius="full"
      topLeftRadius="full"
      width={12}
      minWidth={12}
      m={{ hide: true }}
    />

    <Column
      flex={1}
      bottomLeftRadius="full"
      topRightRadius="full"
      overflow="hidden"
      border="neutral-alpha-medium"
      l={{ hide: true }}
    >
      {/* Gradient Section */}
      <Row flex={1} minWidth={4} overflow="hidden">
        <Background
          fill
          position="absolute"
          bottom="0"
          left="0"
          data-solid="color"
          gradient={{
            display: true,
            x: 50,
            y: 100,
            width: 100,
            height: 50,
            colorStart: "brand-solid-strong",
            colorEnd: "page-background",
          }}
        />

        <Background
          fill
          position="absolute"
          bottom="0"
          left="0"
          style={{
            filter: "blur(1rem)",
            transform: "scale(1.1)",
          }}
          gradient={{
            display: true,
            x: 50,
            y: 100,
            width: 100,
            height: 30,
            colorStart: "brand-on-background-strong",
          }}
        />
      </Row>


    </Column>
  </Row>

  {/* CENTER CONTENT */}
  <Column
    maxWidth="xl"
    borderX="neutral-alpha-medium"
  >
    <Row
      paddingX="xl"
      paddingTop="xl"
      paddingBottom="40"
      fillWidth
      horizontal="between"
      vertical="center"
    >
      <Logo
        href="/"
        dark
        icon="/trademarks/icon-dark.svg"
        size="m"
      />

      <Logo
        href="/"
        light
        icon="/trademarks/icon-dark.svg"
        size="m"
      />

      <Row gap="8">
        {social.map((item, index) => (
          <IconButton
            key={index}
            data-border="rounded"
            icon={item.icon}
            variant="secondary"
            size="l"
            href={item.href}
          />
        ))}
      </Row>
    </Row>

    <Row
      paddingX="xl"
      paddingBottom="xl"
      fillWidth
      wrap
      gap="32"
      horizontal="between"
    >
      {navigation.map((section) => (
        <Column
          key={section.title}
          maxWidth={12}
          gap="32"
          paddingY="8"
        >
          <Text
            wrap="balance"
            variant="heading-strong-s"
          >
            {section.title}
          </Text>

          {[
            { key: "free", label: "Free" },
            { key: "pro", label: "Pro" },
            { key: "resources", label: "Resources" },
            { key: "legal", label: "Legal" },
            { key: "items", label: undefined },
          ].map(({ key, label }) => {
            const arr = (section as any)[key] as Array<any> | undefined;

            if (!arr || arr.length === 0) return null;

            return (
              <Column
                key={`${section.title}-${key}`}
                gap="8"
              >
                {label && (
                  <Text
                    variant="label-default-s"
                    onBackground="neutral-weak"
                    marginBottom="8"
                  >
                    {label}
                  </Text>
                )}

                {arr.map((item: any) => (
                  <SmartLink
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    unstyled
                  >
                    <Text
                      wrap="balance"
                      variant="body-default-s"
                      onBackground="neutral-strong"
                    >
                      {item.label}
                    </Text>

                    {item.tag && (
                      <Tag
                        style={{ transform: "scale(0.9)" }}
                        variant="brand"
                        size="s"
                      >
                        {item.tag}
                      </Tag>
                    )}
                  </SmartLink>
                ))}
              </Column>
            );
          })}
        </Column>
      ))}
    </Row>
  </Column>

  {/* RIGHT SIDE (MIRRORED) */}
  <Row flex={1}>
    <Column
      flex={1}
      topLeftRadius="full"
      bottomRightRadius="full"
      overflow="hidden"
      border="neutral-alpha-medium"
      l={{ hide: true }}
    >
      
      {/* Mirrored Gradient */}
      <Row flex={1} minWidth={4} overflow="hidden">
        <Background
          fill
          position="absolute"
          bottom="0"
          right="0"
          data-solid="color"
          gradient={{
            display: true,
            x: 50,
            y: 100,
            width: 100,
            height: 50,
            colorStart: "brand-solid-strong",
            colorEnd: "page-background",
          }}
        />

        <Background
          fill
          position="absolute"
          bottom="0"
          right="0"
          style={{
            filter: "blur(1rem)",
            transform: "scale(1.1)",
          }}
          gradient={{
            display: true,
            x: 50,
            y: 100,
            width: 100,
            height: 30,
            colorStart: "brand-on-background-strong",
          }}
        />
      </Row>
    </Column>


    <Background
      fill
      border="neutral-alpha-medium"
      topRightRadius="full"
      bottomLeftRadius="full"
      width={12}
      minWidth={12}
      m={{ hide: true }}
    />
  </Row>
</Row>

      {/* Bottom Row */}
      <Row fillWidth borderTop="neutral-alpha-medium" horizontal="center">
        {/* Start */}
        <Row flex={1}>
          <Background
            lines={{
              display: true,
              color: "neutral-alpha-weak",
              angle: -45,
              size: "4",
            }}
            bottomRightRadius="full"
            borderRight="neutral-alpha-medium"
            borderBottom="neutral-alpha-medium"
            width={12}
            minWidth={12}
            m={{ hide: true }}
          />

          <Row fillWidth overflow="hidden" minWidth={4} l={{ hide: true }}>
            <Background
              fill
              position="absolute"
              bottom="0"
              right="0"
              data-solid="color"
              gradient={{
                display: true,
                x: 100,
                y: 50,
                width: 100,
                height: 200,
                colorStart: "brand-solid-strong",
                colorEnd: "page-background",
              }}
            />
            <Background
              fill
              position="absolute"
              bottom="0"
              right="0"
              style={{ filter: "blur(1rem)", transform: "scale(1.1)" }}
              gradient={{
                display: true,
                x: 100,
                y: 50,
                width: 50,
                height: 200,
                colorStart: "brand-on-background-strong",
              }}
            />
          </Row>
        </Row>

        {/* Center */}
        <Row gap="8" paddingY="24" center maxWidth="xl" textVariant="label-default-s" onBackground="neutral-medium" borderX="neutral-alpha-medium">
          Built by Developers, for Developers {" "}
          <SmartLink href="#" unstyled>
            <Avatar size="m" src="https://github.com/shaayar.png" />
            Sightline Team
          </SmartLink>
        </Row>

        {/* End */}
        <Row flex={1}>
          <Row fillWidth overflow="hidden" minWidth={4} l={{ hide: true }}>
            <Background
              fill
              position="absolute"
              bottom="0"
              left="0"
              data-solid="color"
              gradient={{
                display: true,
                x: 0,
                y: 50,
                width: 100,
                height: 200,
                colorStart: "brand-solid-strong",
                colorEnd: "page-background",
              }}
            />
            <Background
              fill
              position="absolute"
              bottom="0"
              left="0"
              style={{ filter: "blur(1rem)", transform: "scale(1.1)" }}
              gradient={{
                display: true,
                x: 0,
                y: 50,
                width: 50,
                height: 200,
                colorStart: "brand-on-background-strong",
              }}
            />
          </Row>
          <Background
            lines={{
              display: true,
              color: "neutral-alpha-weak",
              angle: -45,
              size: "4"
            }}
            bottomLeftRadius="full"
            borderLeft="neutral-alpha-medium"
            borderBottom="neutral-alpha-medium"
            width={12}
            minWidth={12}
            m={{ hide: true }} />
        </Row>
      </Row>
    </Column>
  );
};
