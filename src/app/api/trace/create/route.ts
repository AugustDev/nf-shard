import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const requestJson = await request.json();
  console.log(requestJson);
  const data = JSON.stringify(requestJson, null, 2);
  const filePath = path.join(process.cwd(), "create.json");
  await fs.writeFile(filePath, data, "utf-8");

  return NextResponse.json({ workflowId: nanoid(16), dir: process.cwd() });
}
