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
}

export type SearchResponse = {
	workflows: Workflow[]
}
