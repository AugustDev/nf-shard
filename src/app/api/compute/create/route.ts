import { NextResponse } from "next/server"
import { CreateComputeEnvironment, GetAllComputeEnvironments } from "@/services/prisma"

export type TCreateComputeEnv = {
	name: string
	description?: string
	executor: string
	orchestrator_endpoint: string
	orchestrator_token: string
}

export async function POST(request: Request) {
	const requestJson: TCreateComputeEnv = await request.json()

	try {
		await CreateComputeEnvironment(requestJson)
		const computeEnvs = await GetAllComputeEnvironments()
		return NextResponse.json(computeEnvs)
	} catch (e: any) {
		return NextResponse.json({ error: e }, { status: 500 })
	}
}
