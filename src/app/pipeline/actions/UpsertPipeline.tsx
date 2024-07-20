"use server"

import { prisma } from "@/services"
import { TKVArg, TComputeEnvOverride } from "@/app/pipeline/types"

export type TUpsertPipeline = {
	id?: string
	name: string
	description: string
	githubUrl: string
	runParams: TKVArg[]
	computeOverrides: TComputeEnvOverride[]
}

const createPipelineAction = async (pipeline: TUpsertPipeline) => {
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

const updatePipelineAction = async (pipeline: TUpsertPipeline) => {
	try {
		await prisma.pipeline.update({
			where: {
				id: pipeline.id,
			},
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

export const upsertPipelineAction = async (pipeline: TUpsertPipeline): Promise<boolean> => {
	if (pipeline?.id) {
		return updatePipelineAction(pipeline)
	} else {
		return createPipelineAction(pipeline)
	}
}
