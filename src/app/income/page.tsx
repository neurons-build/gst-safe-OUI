"use client";

import { createClient } from "@/lib/sb/client";
import { useUser } from "@/components/UserProvider";
import {
  Button,
  Column,
  Heading,
  Text,
  Row,
  Dialog,
  Input,
  Select,
  Textarea,
} from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFinancialYear, inrToPaise, paiseToInr, formatCurrency } from "@/lib/gst-utils";

interface IncomeEntry {
  id: string;
  source_name: string;
  amount: number;
  month: number;
  year: number;
  financial_year: string;
  income_type: "domestic" | "export";
  notes: string | null;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Income() {
  const { userEmail } = useUser();
  const router = useRouter();
  const supabase = createClient();
  const [entries, setEntries] = useState<IncomeEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<IncomeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<IncomeEntry | null>(null);
  const [selectedFY, setSelectedFY] = useState<string>("");
  const [selectedType, setSelectedType] = useState<"all" | "domestic" | "export">("all");

  // Form state
  const [sourceName, setSourceName] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [incomeType, setIncomeType] = useState<"domestic" | "export">("domestic");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    filterEntries();
  }, [entries, selectedFY, selectedType]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth?state=login");
        return;
      }

      const { data, error } = await supabase
        .from("income_entries")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setEntries(data || []);
      const currentFY = getFinancialYear(new Date().getMonth() + 1, new Date().getFullYear());
      setSelectedFY(currentFY);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load income entries");
    } finally {
      setLoading(false);
    }
  };

  const filterEntries = () => {
    let filtered = entries;

    if (selectedFY) {
      filtered = filtered.filter(entry => entry.financial_year === selectedFY);
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(entry => entry.income_type === selectedType);
    }

    setFilteredEntries(filtered);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const amountPaise = inrToPaise(parseFloat(amount));
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);
      const fy = getFinancialYear(monthNum, yearNum);

      if (editingEntry) {
        // Update existing entry
        const { error } = await supabase
          .from("income_entries")
          .update({
            source_name: sourceName.trim(),
            amount: amountPaise,
            month: monthNum,
            year: yearNum,
            financial_year: fy,
            income_type: incomeType,
            notes: notes.trim() || null,
          })
          .eq("id", editingEntry.id);

        if (error) throw error;
      } else {
        // Create new entry
        const { error } = await supabase
          .from("income_entries")
          .insert({
            user_id: user.id,
            source_name: sourceName.trim(),
            amount: amountPaise,
            month: monthNum,
            year: yearNum,
            financial_year: fy,
            income_type: incomeType,
            notes: notes.trim() || null,
          });

        if (error) throw error;
      }

      // Reset form and close dialog
      setSourceName("");
      setAmount("");
      setMonth("");
      setIncomeType("domestic");
      setNotes("");
      setEditingEntry(null);
      setIsDialogOpen(false);

      // Refresh entries
      await fetchEntries();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save income entry");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (entry: IncomeEntry) => {
    setEditingEntry(entry);
    setSourceName(entry.source_name);
    setAmount(paiseToInr(entry.amount).toString());
    setMonth(entry.month.toString());
    setYear(entry.year.toString());
    setIncomeType(entry.income_type);
    setNotes(entry.notes || "");
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this income entry?")) return;

    try {
      const { error } = await supabase
        .from("income_entries")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await fetchEntries();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete income entry");
    }
  };

  const openAddDialog = () => {
    setEditingEntry(null);
    setSourceName("");
    setAmount("");
    setMonth((new Date().getMonth() + 1).toString());
    setYear(new Date().getFullYear().toString());
    setIncomeType("domestic");
    setNotes("");
    setIsDialogOpen(true);
  };

  const calculateTotal = () => {
    return filteredEntries.reduce((sum, entry) => sum + entry.amount, 0);
  };

  const getUniqueFYs = () => {
    const fys = new Set(entries.map(e => e.financial_year));
    return Array.from(fys).sort();
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
        <Row fillWidth horizontal="between">
          <Column gap="4">
            <Heading variant="display-strong-s">Income Log</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Track all your income sources
            </Text>
          </Column>
          <Button onClick={openAddDialog}>
            + Add Income
          </Button>
        </Row>

        {error && (
          <Text variant="label-default-s" onBackground="danger-weak">
            {error}
          </Text>
        )}

        {/* Filters */}
        <Row fillWidth gap="8" wrap>
          <Column flex={1}>
            <Text variant="label-default-s" marginBottom="4">Financial Year</Text>
            <Select
              id="fyFilter"
              value={selectedFY}
              onChange={(e) => setSelectedFY(e.target.value)}
              options={[
                { label: "All Years", value: "" },
                ...getUniqueFYs().map(fy => ({ label: fy, value: fy }))
              ]}
            />
          </Column>
          <Column flex={1}>
            <Text variant="label-default-s" marginBottom="4">Income Type</Text>
            <Select
              id="typeFilter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as "all" | "domestic" | "export")}
              options={[
                { label: "All Types", value: "all" },
                { label: "Domestic", value: "domestic" },
                { label: "Export", value: "export" }
              ]}
            />
          </Column>
        </Row>

        {/* Running Total */}
        <Column fillWidth padding="16" radius="l" border="neutral-alpha-weak">
          <Row fillWidth horizontal="between">
            <Text variant="label-default-s">Total (Filtered)</Text>
            <Text variant="heading-strong-m">{formatCurrency(calculateTotal())}</Text>
          </Row>
        </Column>

        {/* Income List */}
        {filteredEntries.length === 0 ? (
          <Column
            fillWidth
            padding="32"
            radius="l"
            border="neutral-alpha-weak"
            horizontal="center"
            gap="8"
          >
            <Text variant="body-default-s" onBackground="neutral-weak">
              No income entries found
            </Text>
            <Button onClick={openAddDialog}>
              Add Your First Income Entry
            </Button>
          </Column>
        ) : (
          <Column fillWidth gap="4">
            {filteredEntries.map((entry) => (
              <Row
                key={entry.id}
                fillWidth
                padding="16"
                radius="l"
                border="neutral-alpha-weak"
                horizontal="between"
                vertical="center"
              >
                <Column fillWidth gap="2">
                  <Text variant="body-default-m">{entry.source_name}</Text>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {MONTHS[entry.month - 1]} {entry.year} • {entry.financial_year} • {entry.income_type}
                  </Text>
                </Column>
                <Row gap="8" align="center">
                  <Text variant="body-default-m">
                    {formatCurrency(entry.amount)}
                  </Text>
                  <Button size="s" variant="secondary" onClick={() => handleEdit(entry)}>
                    Edit
                  </Button>
                  <Button size="s" variant="secondary" onClick={() => handleDelete(entry.id)}>
                    Delete
                  </Button>
                </Row>
              </Row>
            ))}
          </Column>
        )}

        {/* Add/Edit Dialog */}
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title={editingEntry ? "Edit Income Entry" : "Add Income Entry"}
          footer={
            <Row fillWidth horizontal="end" gap="8">
              <Button size="s" variant="secondary" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button size="s" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </Row>
          }
        >
          <form onSubmit={handleSave}>
            <Column fillWidth gap="16">
              <Column fillWidth gap="8">
                <Text variant="label-default-s">Source Name</Text>
                <Input
                  id="sourceName"
                  type="text"
                  placeholder="e.g., Toptal, Infosys retainer"
                  required
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                />
              </Column>

              <Column fillWidth gap="8">
                <Text variant="label-default-s">Amount (₹)</Text>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount in INR"
                  required
                  min="0"
                  max="100000000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Column>

              <Row fillWidth gap="8">
                <Column fillWidth gap="8">
                  <Text variant="label-default-s">Month</Text>
                  <Select
                    id="month"
                    required
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    options={MONTHS.map((m, i) => ({ label: m, value: (i + 1).toString() }))}
                  />
                </Column>
                <Column fillWidth gap="8">
                  <Text variant="label-default-s">Year</Text>
                  <Input
                    id="year"
                    type="number"
                    required
                    min="2020"
                    max="2030"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </Column>
              </Row>

              <Column fillWidth gap="8">
                <Text variant="label-default-s">Income Type</Text>
                <Row gap="8">
                  <Button
                    fillWidth
                    variant={incomeType === "domestic" ? "primary" : "secondary"}
                    onClick={() => setIncomeType("domestic")}
                  >
                    Domestic
                  </Button>
                  <Button
                    fillWidth
                    variant={incomeType === "export" ? "primary" : "secondary"}
                    onClick={() => setIncomeType("export")}
                  >
                    Export
                  </Button>
                </Row>
                <Text variant="label-default-xs" onBackground="neutral-weak">
                  Domestic: 18% GST applies. Export: 0% GST but counts toward threshold.
                </Text>
              </Column>

              <Column fillWidth gap="8">
                <Text variant="label-default-s">Notes (Optional)</Text>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes..."
                  lines="auto"
                  maxLength={200}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Column>
            </Column>
          </form>
        </Dialog>
      </Column>
    </Column>
  );
}
