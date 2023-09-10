import { prisma } from "@/services/prisma/prisma"

interface BigInt {
	/** Convert to BigInt to string form in JSON.stringify */
	toJSON: () => string
}

// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function (): string {
	return this.toString()
}

export const WorkflowById = async (id: string, includeWorkspace?: boolean) => {
	const workflow = await prisma.workflow.findUnique({
		where: {
			id: id,
		},
		include: {
			tasks: true,
			progress: true,
			workspace: includeWorkspace ?? false,
		},
	})

	return workflow
}

export const GetWorkflows = async (skip?: number, workspace_id?: number) => {
	const workflows = await prisma.workflow.findMany({
		take: 20,
		skip: skip,
		orderBy: {
			updatedAt: "desc",
		},
		where: {
			workspaceId: workspace_id,
		},
	})

	return workflows
}

export const DeleteWorkflow = async (id: string) => {
	await prisma.workflow.delete({
		where: {
			id: id,
		},
	})
}
