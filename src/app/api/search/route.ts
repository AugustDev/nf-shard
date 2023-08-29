import { NextResponse } from "next/server";

type SearchRequest = {
  term?: string;
};

export async function POST(request: Request) {
  const data: SearchRequest = await request.json();
  console.log(data);

  return NextResponse.json({});
}
