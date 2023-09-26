import { NextResponse } from "next/server"
import { nanoid } from "nanoid"

export async function POST(request: Request) {
	const workflowId = nanoid(16)
	return NextResponse.json({
		workflowId: workflowId,
		dir: process.cwd(),
	})
}
