import { prisma } from "@/services/prisma/prisma"

type TSearchRequest = {
	term?: string
	id?: string
	runName?: string
	projectName?: string
	userName?: string
	tags?: string[]
	after?: Date
	before?: Date
}

export const searchWorkflows = async (request: TSearchRequest) => {
	let conditions = []

	if (request.term) {
		conditions.push({
			searchable: {
				contains: request.term?.toLowerCase(),
			},
		})
	}

	if (request.id) {
		conditions.push({
			id: {
				equals: request.id,
			},
		})
	}

	if (request.runName) {
		conditions.push({
			runName: {
				equals: request.runName,
			},
		})
	}

	if (request.projectName) {
		conditions.push({
			projectName: {
				equals: request.projectName,
			},
		})
	}

	if (request.userName) {
		conditions.push({
			userName: {
				equals: request.userName,
			},
		})
	}

	if (request.tags) {
		conditions.push({
			tags: {
				hasEvery: request.tags,
			},
		})
	}

	if (request.after) {
		conditions.push({
			updatedAt: {
				gte: request.after,
			},
		})
	}

	if (request.before) {
		conditions.push({
			updatedAt: {
				lte: request.before,
			},
		})
	}

	const workflows = await prisma.workflow.findMany({
		where: {
			AND: conditions,
		},
	})

	return workflows
}
