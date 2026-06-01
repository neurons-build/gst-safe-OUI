import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerSupabase } from "@/lib/sb/server";

export const runtime = "nodejs"; // Required to safely use the service role key
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1) Identify the current user from auth cookies via your SSR client
    const supabase = await createServerSupabase();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return NextResponse.json(
        { error: "Failed to resolve current user", details: userError.message },
        { status: 401 },
      );
    }

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2) Use a service-role client to bypass RLS for the actual data fetch
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceRoleKey) {
      return NextResponse.json(
        {
          error:
            "Server is missing SUPABASE configuration. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.",
        },
        { status: 500 },
      );
    }

    const serviceClient = createServiceClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // 3) Enforce ownership by filtering on the authenticated user's id
    const { data, error } = await serviceClient
      .from("users")
      .select("name")
      .eq("id", user.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch profile", details: error.message },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Fetch user's global role (read-only)
    const { data: roleRow, error: roleError } = await serviceClient
      .from("user_global_roles")
      .select("role_id")
      .eq("user_id", user.id)
      .maybeSingle();

    // If role fetch errors, don't block the profile fetch; expose null role
    const roleId = roleError ? null : roleRow?.role_id ?? null;

    // Get role rank from roles table if we have a roleId
    let roleRank: number | null = null;
    if (roleId) {
      const { data: rolesRow, error: rolesErr } = await serviceClient
        .from("roles")
        .select("rank")
        .eq("id", roleId)
        .maybeSingle();
      roleRank = rolesErr ? null : rolesRow?.rank ?? null;
    }

    return NextResponse.json(
      {
        profile: {
          username: data.name,
        },
        email: user.email ?? null,
        roleId,
        roleRank,
      },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Unexpected server error", details: message },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    // Identify current user (from cookies)
    const supabase = await createServerSupabase();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return NextResponse.json(
        { error: "Failed to resolve current user", details: userError.message },
        { status: 401 },
      );
    }
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const updates: Record<string, unknown> = {};
    if (typeof body.username === "string") updates.name = body.username.trim();

    const allowedKeys = ["name"] as const;
    const hasAllowed = Object.keys(updates).some((k) => (allowedKeys as readonly string[]).includes(k));
    if (!hasAllowed) {
      return NextResponse.json(
        { error: "No valid fields provided. Allowed: username" },
        { status: 400 },
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Server is missing SUPABASE configuration" },
        { status: 500 },
      );
    }

    const serviceClient = createServiceClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await serviceClient
      .from("users")
      .update(updates)
      .eq("id", user.id)
      .select("name")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to update profile", details: error.message },
        { status: 500 },
      );
    }

    // Also return role (read-only; not modified here)
    const { data: roleRow, error: roleError } = await serviceClient
      .from("user_global_roles")
      .select("role_id")
      .eq("user_id", user.id)
      .maybeSingle();

    const roleId = roleError ? null : roleRow?.role_id ?? null;

    // Lookup role rank if roleId is present
    let roleRank: number | null = null;
    if (roleId) {
      const { data: rolesRow, error: rolesErr } = await serviceClient
        .from("roles")
        .select("rank")
        .eq("id", roleId)
        .maybeSingle();
      roleRank = rolesErr ? null : rolesRow?.rank ?? null;
    }

    return NextResponse.json(
      {
        profile: {
          username: data.name,
        },
        email: user.email ?? null,
        roleId,
        roleRank,
      },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Unexpected server error", details: message },
      { status: 500 },
    );
  }
}
