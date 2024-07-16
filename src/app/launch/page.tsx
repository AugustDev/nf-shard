import { Main } from "@/app/launch/components/Main"
import { prisma } from "@/services"
import { Pipeline } from "@prisma/client"
import { DeletePipelineAction } from "../pipeline/actions/DeletePipeline"

export default async function Page() {
	const { pipelines } = await getData()
	return <Main deletePipeline={DeletePipelineAction} pipelines={pipelines} />
}

const getData = async () => {
	let pipelines: Pipeline[] = []
	try {
		pipelines = await prisma.pipeline.findMany()
	} catch (error) {
		console.error(error)
	}

	return {
		pipelines,
	}
}

export const fetchCache = "force-no-store"
export const revalidate = 0
