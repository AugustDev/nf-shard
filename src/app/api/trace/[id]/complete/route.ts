import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function PUT(request: Request) {
  const requestJson = await request.json();
  const data = JSON.stringify(requestJson, null, 2);
  const filePath = path.join(process.cwd(), "complete.json");
  await fs.writeFile(filePath, data, "utf-8");
  return NextResponse.json({ beginId: "1234" });
}
