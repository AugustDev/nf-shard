import { prisma } from "@/services/prisma/prisma"

interface BigInt {
	/** Convert to BigInt to string form in JSON.stringify */
	toJSON: () => string
}

// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function (): string {
	return this.toString()
}

export const workflowById = async (id: string) => {
	const workflow = await prisma.workflow.findUnique({
		where: {
			id: id,
		},
		include: {
			tasks: true,
			progress: true,
		},
	})

	return workflow
}

export const getWorkflows = async (skip?: number) => {
	const workflows = await prisma.workflow.findMany({
		take: 20,
		skip: skip,
		orderBy: {
			updatedAt: "desc",
		},
	})

	return workflows
}