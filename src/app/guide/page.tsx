import { Main } from "./components"
import { Workspace } from "@prisma/client"
import { getAllWorkspaces } from "@/services/prisma"

export default async function Page() {
	const props = await getData()
	const baseUri = process.env.NEXT_PUBLIC_BASE_URI || ""
	return <Main workspaces={props.workspaces} baseUri={baseUri} />
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
