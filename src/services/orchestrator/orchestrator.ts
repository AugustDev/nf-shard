import { ComputeEnvironment } from "@prisma/client"

export type TRunRequest = {
	pipeline_url: string
	executor: {
		name: string
		compute_override: string
	}
	parameters: TParameter[]
}

export type TParameter = {
	key: string
	value: string
	is_flag: boolean
}

export const Run = async (computeEnv: ComputeEnvironment, data: TRunRequest) => {
	await fetch(`${computeEnv.orchestrator_endpoint}/v1/run`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			Authorization: `Bearer ${computeEnv.orchestrator_token}`,
		},
	})
}

export const Health = async (computeEnv: ComputeEnvironment) => {
	try {
		const res = await fetch(`${computeEnv.orchestrator_endpoint}/v1/health`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${computeEnv.orchestrator_token}`,
			},
		})
		const data = await res.json()
		return {
			status: data.status,
		}
	} catch (error) {
		return {
			status: false,
			message: (error as Error).message,
		}
	}
}
