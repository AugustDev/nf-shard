"use server"

import { TKVArg, TComputeEnvOverride } from "@/app/launch/create/types"
import { prisma } from "@/services"

export type TCreatePipeline = {
	name: string
	description: string
	githubUrl: string
	runParams: TKVArg[]
	computeOverrides: TComputeEnvOverride[]
}

export const createPipeline = async (pipeline: TCreatePipeline) => {
	try {
		await prisma.pipeline.create({
			data: {
				name: pipeline.name,
				description: pipeline.description,
				github_url: pipeline.githubUrl,
				run_params: pipeline.runParams,
				compute_overrides: pipeline.computeOverrides,
			},
		})
	} catch (error) {
		console.log(error)
		return false
	}
	return true
}
