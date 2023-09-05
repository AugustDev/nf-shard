import { MainRun } from "./components/Main/Main"
import { workflowById } from "@/services/prisma"

export default async function Page({ params }: { params: { id: string } }) {
	const { workflow, tasks, progress } = await getData(params.id)

	if (!workflow) {
		return <p>Missing workflow</p>
	}

	return <MainRun workflow={workflow} tasks={tasks} progress={progress} />
}

const getData = async (id: string) => {
	try {
		const workflow = await workflowById(id)

		return {
			isLoading: false,
			workflow: workflow,
			tasks: workflow?.tasks ?? [],
			progress: workflow?.progress,
		}
	} catch (e) {
		console.error(e)
	}

	return {
		isLoading: false,
		workflow: undefined,
	}
}
