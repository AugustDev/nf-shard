import { prisma } from "@/services/prisma/prisma"

export const ProcessKeyByRunName = async (runName?: string) => {
	if (!runName) {
		return null
	}
	const processKey = await prisma.processKeys.findFirst({
		where: { runName: runName },
		include: {
			computeEnvironment: true,
		},
	})
	return processKey
}
