import { prisma } from "@/services"
import { ComputeEnvironment } from "@prisma/client"
import { Main } from "@/app/compute/components/Main"

export default async function Page() {
	const props = await getData()
	return <Main environments={props.computeEnvs} />
}

type TProps = {
	computeEnvs: ComputeEnvironment[]
}

const getData = async (): Promise<TProps> => {
	let computeEnvs: ComputeEnvironment[] = []
	try {
		computeEnvs = await prisma.computeEnvironment.findMany()
	} catch (e) {
		console.error(e)
	}

	return {
		computeEnvs: computeEnvs,
	}
}
