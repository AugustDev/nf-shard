import { prisma } from "@/services/prisma/prisma"
import { NextResponse } from "next/server"
import { SearchRequest } from "./types"
import { searchWorkflows } from "@/services/prisma"

export async function POST(request: Request) {
	const searchRequest: SearchRequest = await request.json()

	const searchResults = await searchWorkflows({
		term: searchRequest.term,
		id: searchRequest.id,
		runName: searchRequest.run_name,
		projectName: searchRequest.project_name,
		userName: searchRequest.user_name,
		tags: searchRequest.tags,
		after: searchRequest.after,
		before: searchRequest.before,
		workspaceId: searchRequest.workspace_id,
		first: searchRequest.first,
		cursor: searchRequest.cursor,
	})

	return NextResponse.json(searchResults)
}
