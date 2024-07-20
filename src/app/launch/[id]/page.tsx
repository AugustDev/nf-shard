import { prisma } from "@/services"
import { LaunchPipeline } from "@/app/launch/[id]/components/LaunchPipeline"
import { CreateProcessKey } from "../actions/ProcessKeys"

export default async function Page({ params }: { params: { id: string } }) {
	const { pipeline, computeEnvs } = await getData(params.id)

	if (!pipeline) {
		return <div>Could not find the pipeline</div>
	}

	return <LaunchPipeline createProcessKey={CreateProcessKey} pipeline={pipeline} computeEnvs={computeEnvs} />
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
