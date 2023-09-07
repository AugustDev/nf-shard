import { NextResponse } from "next/server"
import { createWorkspace, getAllWorkspaces } from "@/services/prisma"

type TCreateWorkspace = {
	name: string
}

export async function POST(request: Request) {
	const requestJson: TCreateWorkspace = await request.json()

	try {
		await createWorkspace(requestJson.name)
		const workspaces = await getAllWorkspaces()
		return NextResponse.json(workspaces)
	} catch (e: any) {
		return NextResponse.json({ error: e }, { status: 500 })
	}
}
