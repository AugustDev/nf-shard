import { prisma } from "@/services/prisma/prisma"
import { Workflow, Workspace } from "@prisma/client"
import { Main } from "./components/Main"
import { getAllWorkspaces, searchWorkflows } from "@/services/prisma"

export default async function Page(request: any) {
	const workspaceId = Number(request.searchParams.workspaceId)
	const props = await getData(workspaceId)

	return <Main runs={props.runs} workspaces={props.workspaces} searchTags={props.searchtags} />
}

type TRunsPageProps = {
	runs: Workflow[]
	workspaces: Workspace[]
	searchtags: string[]
}

const getData = async (workspaceId: number): Promise<TRunsPageProps> => {
	let workflows: Partial<Workflow>[] = []
	let workspaces: Workspace[] = []
	let searchTags: string[] = []
	try {
		const searchRes = await searchWorkflows({ workspaceId: workspaceId })
		workflows = searchRes.workflows
		workspaces = await getAllWorkspaces()
		const workspaceName = workspaces.find((w) => w.id == workspaceId)?.name
		if (workspaceName) {
			searchTags.push(`workspace:${workspaceName}`)
		}
	} catch (e) {
		console.log(e)
	}

	return {
		// @ts-ignore
		runs: workflows,
		workspaces: workspaces,
		searchtags: searchTags,
	}
}

export const fetchCache = "force-no-store"
export const revalidate = 0
