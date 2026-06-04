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

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    // Only create service client if we have a valid-looking service role key
    const hasValidServiceKey = url && serviceRoleKey && serviceRoleKey.length > 10 && !serviceRoleKey.includes("dfgh");
    const serviceClient = hasValidServiceKey
      ? createServiceClient(url, serviceRoleKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
      : null;

    const profileClient = serviceClient ?? supabase;

    // 3) Enforce ownership by filtering on the authenticated user's id
    const { data, error } = await profileClient
      .from("users")
      .select("name")
      .eq("id", user.id)
      .maybeSingle();

    // If user record doesn't exist yet (e.g., just signed up), create a placeholder
    if (!data) {
      // Check if there's an actual error (not just "no rows found")
      if (error) {
        console.error("[API Profile GET] Error fetching user:", {
          code: (error as any).code,
          message: (error as any).message,
          userId: user.id,
        });
        return NextResponse.json(
          { error: "Failed to fetch profile", details: (error as any).message },
          { status: 500 },
        );
      }

      // No error, just no data - need to create user
      if (!serviceClient) {
        console.warn("[API Profile GET] Cannot create user - no valid service role key");
        // Try to create with regular client if possible (might fail due to RLS)
        const { data: newUser, error: createError } = await supabase
          .from("users")
          .insert({
            id: user.id,
            name: user.email?.split("@")[0] || "User",
            state: "Delhi",
            state_category: "general",
            gst_threshold: 200000000,
          })
          .select("name")
          .single();

        if (createError) {
          console.error("[API Profile GET] Failed to create user with regular client:", createError);
          return NextResponse.json(
            { error: "Profile not found and cannot create", details: "Please contact support" },
            { status: 404 },
          );
        }
        
        if (!newUser) {
          return NextResponse.json(
            { error: "Profile not found" },
            { status: 404 },
          );
        }

        const data_val = newUser;
        
        let roleId: string | null = null;
        let roleRank: number | null = null;

        return NextResponse.json(
          {
            profile: {
              username: data_val.name,
            },
            email: user.email ?? null,
            roleId,
            roleRank,
          },
          { status: 200 },
        );
      }
      
      const { data: newUser, error: createError } = await serviceClient
        .from("users")
        .insert({
          id: user.id,
          name: user.email?.split("@")[0] || "User",
          state: "Delhi", // Default state
          state_category: "general",
          gst_threshold: 200000000,
        })
        .select("name")
        .single();

      if (createError) {
        console.error("[API Profile GET] Failed to create user:", {
          code: (createError as any).code,
          message: (createError as any).message,
          userId: user.id,
        });
        return NextResponse.json(
          { error: "Failed to create user profile", details: (createError as any).message || "Unknown error" },
          { status: 500 },
        );
      }

      if (!newUser) {
        console.error("[API Profile GET] User created but no data returned");
        return NextResponse.json(
          { error: "Failed to create user profile", details: "No data returned" },
          { status: 500 },
        );
      }

      const data_val = newUser;
      
      let roleId: string | null = null;
      let roleRank: number | null = null;

      if (serviceClient) {
        const { data: roleRow, error: roleError } = await serviceClient
          .from("user_global_roles")
          .select("role_id")
          .eq("user_id", user.id)
          .maybeSingle();
        roleId = roleError ? null : roleRow?.role_id ?? null;

        if (roleId) {
          const { data: rolesRow, error: rolesErr } = await serviceClient
            .from("roles")
            .select("rank")
            .eq("id", roleId)
            .maybeSingle();
          roleRank = rolesErr ? null : rolesRow?.rank ?? null;
        }
      }

      return NextResponse.json(
        {
          profile: {
            username: data_val.name,
          },
          email: user.email ?? null,
          roleId,
          roleRank,
        },
        { status: 200 },
      );
    }

    // User record exists, fetch their roles
    let roleId: string | null = null;
    let roleRank: number | null = null;

    if (serviceClient) {
      const { data: roleRow, error: roleError } = await serviceClient
        .from("user_global_roles")
        .select("role_id")
        .eq("user_id", user.id)
        .maybeSingle();
      roleId = roleError ? null : roleRow?.role_id ?? null;

      if (roleId) {
        const { data: rolesRow, error: rolesErr } = await serviceClient
          .from("roles")
          .select("rank")
          .eq("id", roleId)
          .maybeSingle();
        roleRank = rolesErr ? null : rolesRow?.rank ?? null;
      }
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
    const serviceClient =
      url && serviceRoleKey
        ? createServiceClient(url, serviceRoleKey, {
            auth: { persistSession: false, autoRefreshToken: false },
          })
        : null;

    const updateClient = serviceClient ?? supabase;

    const { data, error } = await updateClient
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

    let roleId: string | null = null;
    let roleRank: number | null = null;

    if (serviceClient) {
      const { data: roleRow, error: roleError } = await serviceClient
        .from("user_global_roles")
        .select("role_id")
        .eq("user_id", user.id)
        .maybeSingle();
      roleId = roleError ? null : roleRow?.role_id ?? null;

      if (roleId) {
        const { data: rolesRow, error: rolesErr } = await serviceClient
          .from("roles")
          .select("rank")
          .eq("id", roleId)
          .maybeSingle();
        roleRank = rolesErr ? null : rolesRow?.rank ?? null;
      }
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
