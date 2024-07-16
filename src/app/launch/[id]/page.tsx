import { Main } from "@/app/launch/components/Main"
import { prisma } from "@/services"
import { Pipeline } from "@prisma/client"
import { LaunchPipeline } from "@/app/launch/[id]/components/LaunchPipeline"

export default async function Page({ params }: { params: { id: string } }) {
	const { pipeline, computeEnvs } = await getData(params.id)

	if (!pipeline) {
		return <div>Could not find the pipeline</div>
	}

	return <LaunchPipeline pipeline={pipeline} computeEnvs={computeEnvs} />
}

const getData = async (id: string) => {
	const pipeline = await prisma.pipeline.findFirst({ where: { id: id } })
	const computeEnvs = await prisma.computeEnvironment.findMany()

	return {
		pipeline,
		computeEnvs,
	}
}

export const fetchCache = "force-no-store"
export const revalidate = 0
