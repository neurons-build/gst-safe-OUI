import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Avatar uploads are not supported for this profile schema" },
    { status: 410 },
  );
}
