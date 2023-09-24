import { Main } from "./components"
import { Workspace } from "@prisma/client"
import { getAllWorkspaces } from "@/services/prisma"

export default async function Page() {
	const props = await getData()
	return <Main workspaces={props.workspaces} />
}

const getData = async () => {
	let workspaces: Workspace[] = []

	try {
		workspaces = await getAllWorkspaces()
	} catch (e) {
		console.error(e)
	}

	return {
		workspaces: workspaces,
	}
}

export const fetchCache = "force-no-store"
export const revalidate = 0
