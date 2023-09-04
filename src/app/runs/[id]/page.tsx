import { RunResponse } from "@/app/api/runs/[id]/types"
import { MainRun } from "./components/Main/Main"

export default async function Page({ params }: { params: { id: string } }) {
	const { workflow, tasks, progress } = await getData(params.id)

	if (!workflow) {
		return <p>Missing workflow</p>
	}

	return <MainRun workflow={workflow} tasks={tasks} progress={progress} />
}

const getData = async (id: string) => {
	try {
		const response = await fetch(`${process.env.SERVER_URI}/api/runs/${id}`, {
			cache: "no-store",
		})
		const result: RunResponse = await response.json()

		return {
			isLoading: false,
			workflow: result.workflow,
			tasks: result.tasks,
			progress: result.progress,
		}
	} catch (e) {
		console.error(e)
	}

	return {
		isLoading: false,
		workflow: undefined,
	}
}
