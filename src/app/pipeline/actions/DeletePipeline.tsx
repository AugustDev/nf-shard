"use server"

import { prisma } from "@/services"

export const DeletePipelineAction = async (id: string) => {
	try {
		await prisma.pipeline.delete({
			where: {
				id: id,
			},
		})
	} catch (error) {
		console.log(error)
		return []
	}

	const pipelines = await prisma.pipeline.findMany()
	return pipelines
}
