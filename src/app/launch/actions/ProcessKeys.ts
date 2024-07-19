"use server"

import { prisma } from "@/services"
import { ProcessKeyByRunName } from "@/services/prisma/processKeys"

export const CreateProcessKey = async (
	processKey: string,
	executor: string,
	runName: string,
	computeEnvironmentId: number
) => {
	try {
		await prisma.processKeys.create({
			data: {
				processKey: processKey,
				executor: executor,
				runName: runName,
				computeEnvironmentId: computeEnvironmentId,
			},
		})
	} catch (error) {
		console.log(error)
	}
}

export const GetProcessKey = async (runName: string) => {
	try {
		const processKey = await ProcessKeyByRunName(runName)
		return processKey
	} catch (error) {
		console.error(error)
		return null
	}
}
