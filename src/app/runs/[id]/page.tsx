import { MainRun } from "./components/Main/Main"
import { WorkflowById } from "@/services/prisma"

export default async function Page({ params }: { params: { id: string } }) {
	const { workflow, tasks, progress, workspace } = await getData(params.id)

	if (!workflow) {
		return <p>Missing workflow</p>
	}

	return <MainRun workflow={workflow} tasks={tasks} progress={progress} workspace={workspace} />
}

const getData = async (id: string) => {
	try {
		const workflow = await WorkflowById(id, true)

		return {
			isLoading: false,
			workflow: workflow,
			tasks: workflow?.tasks ?? [],
			progress: workflow?.progress,
			workspace: workflow?.workspace,
		}
	} catch (e) {
		console.error(e)
	}

	return {
		isLoading: false,
		workflow: undefined,
	}
}
