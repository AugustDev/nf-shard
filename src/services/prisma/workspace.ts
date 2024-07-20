import { prisma } from "@/services/prisma/prisma"

export const deleteWorkspace = async (id: number) => {
	await prisma.workspace.delete({
		where: {
			id: id,
		},
	})

	await prisma.workflow.updateMany({
		where: {
			workspaceId: id,
		},
		data: {
			workspaceId: null,
		},
	})
}

export const createWorkspace = async (name: string) => {
	await prisma.workspace.create({
		data: {
			name: name,
		},
	})
}

export const getAllWorkspaces = async () => {
	return await prisma.workspace.findMany()
}

export const GetWorkspaceById = async (id: number) => {
	return await prisma.workspace.findUnique({
		where: {
			id: id,
		},
	})
}

export const GetAllComputeEnvironments = async () => {
	return await prisma.computeEnvironment.findMany()
}

type TCreateComputeEnv = {
	name: string
	description?: string
	executor: string
	orchestrator_endpoint: string
	orchestrator_token: string
}

export const CreateComputeEnvironment = async (env: TCreateComputeEnv) => {
	await prisma.computeEnvironment.create({
		data: {
			name: env.name,
			description: env.description,
			executor: env.executor,
			orchestrator_endpoint: env.orchestrator_endpoint,
			orchestrator_token: env.orchestrator_token,
		},
	})
}

export const DeleteComputeEnvironment = async (id: number) => {
	await prisma.computeEnvironment.delete({
		where: {
			id: id,
		},
	})
}
