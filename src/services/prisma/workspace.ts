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
