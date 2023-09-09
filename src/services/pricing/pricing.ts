import { PricePerHourAWS } from "./aws"

const fallbackPricePerCPUHour = 0.1

/**
 *
 * @param {string} executor Nextflow executor
 * @param {string} instanceType The instance type to get the price for
 * @param {string} regionCode AWS region (eu-west-1, us-east-1, etc.)
 * @param {string} marketOption OnDemand or Spot
 * @returns
 */
export const EstimateComputeCost = async (
	executor: string,
	durationMs?: number,
	instanceType?: string,
	regionCode?: string,
	marketOption?: string
) => {
	if (!durationMs) {
		return 0
	}

	if (executor === "awsbatch") {
		if (!instanceType || !regionCode || !marketOption) {
			return 0
		}

		const pricePerHour = await PricePerHourAWS(instanceType, regionCode, marketOption)

		if (!pricePerHour) {
			return null
		}

		return (pricePerHour * durationMs) / (3600 * 1000)
	}

	if (
		executor === "azurebatch" ||
		executor === "bridge" ||
		executor === "flux" ||
		executor === "google-batch" ||
		executor === "google-lifesciences" ||
		executor === "hyperqueue" ||
		executor === "condor" ||
		executor === "ignite" ||
		executor === "lsf" ||
		executor === "moab" ||
		executor === "nqsii" ||
		executor === "oar" ||
		executor === "pbs" ||
		executor === "pbspro" ||
		executor === "sge" ||
		executor === "slurm" ||
		executor === "k8s"
	) {
		console.log(
			`Pricing for this executor is not implemented. Using fallback price of \$${fallbackPricePerCPUHour}/cpu/h`
		)
		return (fallbackPricePerCPUHour * durationMs) / (3600 * 1000)
	}

	return (fallbackPricePerCPUHour * durationMs) / (3600 * 1000)
}
