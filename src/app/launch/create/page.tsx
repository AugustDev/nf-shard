import { prisma } from "@/services"
import { CreatePipeline } from "./components/CreatePipeline"

export default async function Page() {
	const { computeEnvironments } = await getData()
	return <CreatePipeline computeEnvironments={computeEnvironments} />
}

const getData = async () => {
	const computeEnvironments = await prisma.computeEnvironment.findMany()
	return { computeEnvironments }
}

export const fetchCache = "force-no-store"
export const revalidate = 0
