import { prisma } from "@/services"
import { upsertPipelineAction } from "@/app/pipeline/actions/UpsertPipeline"
import { CreatePipeline } from "@/app/pipeline/components/PipelineForm"

export default async function Page({ params }: { params: { id: string } }) {
	const { pipeline } = await getData(params.id)
	return <CreatePipeline pipeline={pipeline} submitPipeline={upsertPipelineAction} />
}

const getData = async (id: string) => {
	const pipeline = await prisma.pipeline.findFirst({ where: { id: id } })
	return {
		pipeline,
	}
}

export const fetchCache = "force-no-store"
export const revalidate = 0
