import { NextResponse } from "next/server"
import { WorkflowById, DeleteWorkflow } from "@/services/prisma"

export async function GET(request: Request, { params }: any) {
	const id = params.id as string
	try {
		const workflow = await WorkflowById(id)

		return NextResponse.json({
			workflow: workflow,
			tasks: workflow?.tasks ?? [],
			progress: workflow?.progress,
		})
	} catch (e: any) {
		console.log(e)
		return NextResponse.json({ error: e }, { status: 500 })
	}
}

export async function DELETE(request: Request, { params }: any) {
	const id = params.id as string
	try {
		await DeleteWorkflow(id)
		return NextResponse.json({ success: true })
	} catch (e: any) {
		console.log(e)
		return NextResponse.json({ error: e }, { status: 500 })
	}
}
