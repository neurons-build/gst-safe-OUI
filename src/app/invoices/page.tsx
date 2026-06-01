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
  Textarea,
} from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { inrToPaise, formatCurrency } from "@/lib/gst-utils";

interface Invoice {
  id: string;
  client_name: string;
  amount: number;
  invoice_date: string;
  file_path: string;
  file_type: string;
  notes: string | null;
}

export default function Invoices() {
  const { userEmail } = useUser();
  const router = useRouter();
  const supabase = createClient();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [invoiceCount, setInvoiceCount] = useState(0);
  
  // SUBSCRIPTION LOGIC COMMENTED OUT FOR MVP TESTING
  // const [subscriptionPlan, setSubscriptionPlan] = useState<"free" | "pro">("free");

  // Form state
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchInvoices();
    // SUBSCRIPTION LOGIC COMMENTED OUT FOR MVP TESTING
    // fetchSubscriptionStatus();
  }, []);

  // SUBSCRIPTION LOGIC COMMENTED OUT FOR MVP TESTING
  // const fetchSubscriptionStatus = async () => {
  //   try {
  //     const { data: { user } } = await supabase.auth.getUser();
  //     if (!user) return;

  //     const { data, error } = await supabase
  //       .from("subscriptions")
  //       .select("plan")
  //       .eq("user_id", user.id)
  //       .eq("status", "active")
  //       .single();

  //     if (error && error.code !== 'PGRST116') throw error;

  //     setSubscriptionPlan(data?.plan || "free");
  //   } catch (err) {
  //     console.error("Failed to fetch subscription status:", err);
  //   }
  // };

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth?state=login");
        return;
      }

      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setInvoices(data || []);
      setInvoiceCount(data?.length || 0);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // SUBSCRIPTION LOGIC COMMENTED OUT FOR MVP TESTING - 10 invoice limit
    // if (subscriptionPlan === "free" && invoiceCount >= 10) {
    //   setError("Free tier limited to 10 invoices. Upgrade to Pro for unlimited storage.");
    //   return;
    // }

    if (!file) {
      setError("Please select a file");
      return;
    }

    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF, JPG, PNG, and WEBP files are allowed");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("invoices")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("invoices")
        .getPublicUrl(fileName);

      // Create invoice record
      const amountPaise = inrToPaise(parseFloat(amount));
      const { error: insertError } = await supabase
        .from("invoices")
        .insert({
          user_id: user.id,
          client_name: clientName.trim(),
          amount: amountPaise,
          invoice_date: invoiceDate,
          file_path: fileName,
          file_type: fileExt || "unknown",
          notes: notes.trim() || null,
        });

      if (insertError) throw insertError;

      // Reset form and close dialog
      setClientName("");
      setAmount("");
      setInvoiceDate(new Date().toISOString().split('T')[0]);
      setNotes("");
      setFile(null);
      setIsDialogOpen(false);

      // Refresh invoices
      await fetchInvoices();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload invoice");
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (filePath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("invoices")
        .createSignedUrl(filePath, 60); // 60 seconds expiry

      if (error) throw error;

      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to download invoice");
    }
  };

  const handleDelete = async (id: string, filePath: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("invoices")
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("invoices")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      await fetchInvoices();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete invoice");
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.client_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (fileType: string) => {
    if (fileType === "pdf") return "📄";
    if (fileType === "jpg" || fileType === "jpeg") return "🖼️";
    if (fileType === "png") return "🖼️";
    if (fileType === "webp") return "🖼️";
    return "📎";
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
            <Heading variant="display-strong-s">Invoice Vault</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Store and manage all your invoices in one place
            </Text>
          </Column>
          <Button onClick={() => setIsDialogOpen(true)}>
            + Upload Invoice
          </Button>
        </Row>

        {/* SUBSCRIPTION BANNER COMMENTED OUT FOR MVP TESTING */}
        {/* {subscriptionPlan === "free" && (
          <Column
            fillWidth
            padding="16"
            radius="l"
            border="brand-alpha-weak"
            background="brand-alpha-weak"
          >
            <Row fillWidth horizontal="between" vertical="center">
              <Column gap="2">
                <Text variant="body-default-s">
                  Free tier: {invoiceCount}/10 invoices used
                </Text>
                <Text variant="label-default-xs" onBackground="neutral-weak">
                  Upgrade to Pro for unlimited invoice storage
                </Text>
              </Column>
              <Button size="s" onClick={() => router.push("/upgrade")}>
                Upgrade
              </Button>
            </Row>
          </Column>
        )} */}

        {error && (
          <Text variant="label-default-s" onBackground="danger-weak">
            {error}
          </Text>
        )}

        {/* Search */}
        <Column fillWidth>
          <Input
            id="search"
            type="text"
            placeholder="Search by client name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Column>

        {/* Invoice List */}
        {filteredInvoices.length === 0 ? (
          <Column
            fillWidth
            padding="32"
            radius="l"
            border="neutral-alpha-weak"
            horizontal="center"
            gap="8"
          >
            <Text variant="body-default-s" onBackground="neutral-weak">
              {searchQuery ? "No invoices found matching your search" : "No invoices yet"}
            </Text>
            <Button onClick={() => setIsDialogOpen(true)}>
              Upload Your First Invoice
            </Button>
          </Column>
        ) : (
          <Column fillWidth gap="4">
            {filteredInvoices.map((invoice) => (
              <Row
                key={invoice.id}
                fillWidth
                padding="16"
                radius="l"
                border="neutral-alpha-weak"
                horizontal="between"
                vertical="center"
              >
                <Row gap="12" align="center">
                  <Text variant="heading-strong-l">{getFileIcon(invoice.file_type)}</Text>
                  <Column gap="2">
                    <Text variant="body-default-m">{invoice.client_name}</Text>
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      {new Date(invoice.invoice_date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </Text>
                  </Column>
                </Row>
                <Row gap="8" align="center">
                  <Text variant="body-default-m">
                    {formatCurrency(invoice.amount)}
                  </Text>
                  <Button size="s" variant="secondary" onClick={() => handleDownload(invoice.file_path)}>
                    Download
                  </Button>
                  <Button size="s" variant="secondary" onClick={() => handleDelete(invoice.id, invoice.file_path)}>
                    Delete
                  </Button>
                </Row>
              </Row>
            ))}
          </Column>
        )}

        {/* Upload Dialog */}
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title="Upload Invoice"
          footer={
            <Row fillWidth horizontal="end" gap="8">
              <Button size="s" variant="secondary" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button size="s" onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </Row>
          }
        >
          <form onSubmit={handleUpload}>
            <Column fillWidth gap="16">
              <Column fillWidth gap="8">
                <Text variant="label-default-s">Client Name</Text>
                <Input
                  id="clientName"
                  type="text"
                  placeholder="Enter client name"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </Column>

              <Column fillWidth gap="8">
                <Text variant="label-default-s">Invoice Amount (₹)</Text>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount in INR"
                  required
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Column>

              <Column fillWidth gap="8">
                <Text variant="label-default-s">Invoice Date</Text>
                <Input
                  id="invoiceDate"
                  type="date"
                  required
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </Column>

              <Column fillWidth gap="8">
                <Text variant="label-default-s">Invoice File</Text>
                <Input
                  id="file"
                  type="file"
                  required
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <Text variant="label-default-xs" onBackground="neutral-weak">
                  Accepted formats: PDF, JPG, PNG, WEBP (max 10MB)
                </Text>
              </Column>

              <Column fillWidth gap="8">
                <Text variant="label-default-s">Notes (Optional)</Text>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes..."
                  lines="auto"
                  maxLength={500}
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
