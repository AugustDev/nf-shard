import { NextResponse } from "next/server"
import { deleteWorkspace, getAllWorkspaces } from "@/services/prisma"

type TDeleteWorkspace = {
	id: number
}

export async function DELETE(request: Request) {
	const requestJson: TDeleteWorkspace = await request.json()

	try {
		await deleteWorkspace(requestJson.id)
		const workspaces = await getAllWorkspaces()
		return NextResponse.json(workspaces)
	} catch (e: any) {
		return NextResponse.json({ error: e }, { status: 500 })
	}
}
