import { prisma } from "@/services/prisma/prisma"
import { Workflow, Workspace } from "@prisma/client"
import { Main } from "./components/Main"
import { getAllWorkspaces, GetWorkflows } from "@/services/prisma"

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
	let workflows: Workflow[] = []
	let workspaces: Workspace[] = []
	let searchTags: string[] = []
	try {
		workflows = await prisma.workflow.findMany({
			take: 20,
			orderBy: {
				updatedAt: "desc",
			},
			where: {
				workspaceId: workspaceId ? workspaceId : undefined,
			},
		})
		workspaces = await getAllWorkspaces()
		const workspaceName = workspaces.find((w) => w.id == workspaceId)?.name
		if (workspaceName) {
			searchTags.push(`workspace:${workspaceName}`)
		}
	} catch (e) {
		console.log(e)
	}

	return {
		runs: workflows,
		workspaces: workspaces,
		searchtags: searchTags,
	}
}

export const fetchCache = "force-no-store"
export const revalidate = 0
