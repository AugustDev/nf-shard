import { NextResponse } from "next/server"
import { workflowById } from "@/services/prisma"

export async function GET(request: Request, { params }: any) {
	const id = params.id as string
	try {
		const workflow = await workflowById(id)

		return NextResponse.json({
			workflow: workflow,
			tasks: workflow?.tasks ?? [],
			progress: workflow?.progress,
		})
	} catch (e: any) {
		console.error(e)
		return NextResponse.json({ error: e }, { status: 500 })
	}
}
