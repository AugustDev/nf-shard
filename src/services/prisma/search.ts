import { prisma } from "@/services/prisma/prisma"
import { Workflow } from "@prisma/client"

type TSearchRequest = {
	term?: string
	id?: string
	runName?: string
	projectName?: string
	userName?: string
	tags?: string[]
	after?: Date
	before?: Date
	workspaceId?: number
	first?: number
	cursor?: string
}

type TPageInfo = {
	hasNextPage: boolean
	endCursor: string
}

export const searchWorkflows = async (request: TSearchRequest) => {
	let searchOpts = []

	if (request.term) {
		searchOpts.push({
			searchable: {
				contains: request.term?.toLowerCase(),
			},
		})
	}

	if (request.id) {
		searchOpts.push({
			id: {
				equals: request.id,
			},
		})
	}

	if (request.runName) {
		searchOpts.push({
			runName: {
				equals: request.runName,
			},
		})
	}

	if (request.projectName) {
		searchOpts.push({
			projectName: {
				equals: request.projectName,
			},
		})
	}

	if (request.userName) {
		searchOpts.push({
			userName: {
				equals: request.userName,
			},
		})
	}

	if (request.tags) {
		searchOpts.push({
			tags: {
				hasEvery: request.tags,
			},
		})
	}

	if (request.after) {
		searchOpts.push({
			updatedAt: {
				gte: request.after,
			},
		})
	}

	if (request.before) {
		searchOpts.push({
			updatedAt: {
				lte: request.before,
			},
		})
	}

	if (request.workspaceId) {
		searchOpts.push({
			workspaceId: {
				equals: request.workspaceId,
			},
		})
	}

	let paginationOpts = {}
	// Cursor based pagination in Prisma requires skipping the first result
	if (request.cursor) {
		paginationOpts = {
			cursor: {
				id: request.cursor,
			},
			skip: 1,
		}
	}

	const take = request.first || 20
	// @ts-ignore
	const workflows: Workflow[] = await prisma.workflow.findMany({
		take: take,
		...paginationOpts,
		where: {
			AND: searchOpts,
		},
		orderBy: {
			start: "desc",
		},
		select: {
			id: true,
			runName: true,
			projectName: true,
			userName: true,
			tags: true,
			start: true,
			updatedAt: true,
			complete: true,
			workspaceId: true,
			progress: true,
			manifest: true,
			exitStatus: true,
			duration: true,
			success: true,
			errorMessage: true,
		},
	})

	return {
		// @ts-ignore
		workflows: workflows,
		pageInfo: {
			hasNextPage: workflows.length === take,
			endCursor: workflows.length > 0 ? workflows[workflows.length - 1].id : null,
		},
	}
}
