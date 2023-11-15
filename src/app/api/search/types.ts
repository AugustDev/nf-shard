import { Workflow } from "@prisma/client"

export type SearchRequest = {
	term?: string
	id?: string
	run_name?: string
	project_name?: string
	user_name?: string
	tags?: string[]
	after?: Date
	before?: Date
	workspace_id?: number
	first?: number
	cursor?: string
}

export type TPageInfo = {
	hasNextPage: boolean
	endCursor?: string
}

export type SearchResponse = {
	workflows: Workflow[]
	pageInfo: TPageInfo
}
