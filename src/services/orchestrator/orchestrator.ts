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
	const timeout = 120000
	const controller = new AbortController()
	const id = setTimeout(() => controller.abort(), timeout)

	try {
		const response = await fetch(`${computeEnv.orchestrator_endpoint}/v1/run`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				Authorization: `Bearer ${computeEnv.orchestrator_token}`,
			},
			signal: controller.signal,
		})

		clearTimeout(id)
		return response
	} catch (error) {
		clearTimeout(id)
		if ((error as Error).name === "AbortError") {
			throw new Error("Request timed out")
		}
		throw error
	}
}

export const Health = async (computeEnv: ComputeEnvironment) => {
	try {
		const res = await fetch(`${computeEnv.orchestrator_endpoint}/v1/health`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${computeEnv.orchestrator_token}`,
			},
		})

		if (!res.ok) {
			const errorText = await res.text()
			return {
				status: false,
				message: errorText.trim(),
			}
		}

		const data = await res.json()
		return {
			status: data.status,
		}
	} catch (error) {
		console.error("Health check failed:", error)
		return {
			status: false,
			message: (error as Error).message || "An unexpected error occurred",
		}
	}
}
