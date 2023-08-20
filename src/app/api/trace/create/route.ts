import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  return NextResponse.json({ workflowId: nanoid(16), dir: process.cwd() });
}
