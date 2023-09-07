import { prisma } from "@/services"
import { Workspace } from "@prisma/client"
import { Main } from "./components"

export default async function Page() {
	const props = await getData()

	return <Main workspaces={props.workspaces} />
}

type TWorkspaceProps = {
	workspaces: Workspace[]
}

const getData = async (): Promise<TWorkspaceProps> => {
	let workspaces: Workspace[] = []
	try {
		workspaces = await prisma.workspace.findMany()
	} catch (e) {
		console.error(e)
	}

	return {
		workspaces: workspaces,
	}
}

export const fetchCache = "force-no-store"
export const revalidate = 0
