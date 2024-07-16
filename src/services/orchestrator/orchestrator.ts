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
	console.log({ computeEnv, data })
	await fetch(`${computeEnv.orchestrator_endpoint}/v1/run`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			Authorization: `Bearer ${computeEnv.orchestrator_token}`,
		},
	})
}
