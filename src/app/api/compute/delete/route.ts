import { NextResponse } from "next/server"
import { DeleteComputeEnvironment, GetAllComputeEnvironments } from "@/services/prisma"

type TDeleteComputeEnv = {
	id: number
}

export async function DELETE(request: Request) {
	const requestJson: TDeleteComputeEnv = await request.json()
	try {
		await DeleteComputeEnvironment(requestJson.id)
		const computeEnvs = await GetAllComputeEnvironments()
		return NextResponse.json(computeEnvs)
	} catch (e: any) {
		return NextResponse.json({ error: e }, { status: 500 })
	}
}
