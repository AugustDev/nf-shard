import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: any) {
  const id = params.id as string;

  console.log("heartbeat");
  console.log({ id });

  return NextResponse.json({});
}
