import { prisma } from "@/services/prisma/prisma"
import { Workflow } from "@prisma/client"
import { Main } from "./components/Main"

export default async function Page() {
	const props = await getData()

	return <Main runs={props.runs} />
}

type TRunsPageProps = {
	runs: Workflow[]
}

const getData = async (): Promise<TRunsPageProps> => {
	let workflows: Workflow[] = []
	try {
		workflows = await prisma.workflow.findMany({
			take: 20,
			orderBy: {
				updatedAt: "desc",
			},
		})
	} catch (e) {
		console.error(e)
	}

	return {
		runs: workflows,
	}
}

export const fetchCache = "force-no-store"
