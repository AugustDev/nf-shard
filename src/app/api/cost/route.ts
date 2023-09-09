import { NextResponse } from "next/server"
import { EstimateComputeCost } from "@/services"

type TPriceRequest = {
	executor: string
	machineType: string
	cloudZone: string
	priceModel: string
	duration: number
}
export async function POST(request: Request) {
	const r: TPriceRequest = await request.json()

	let costEstimate: number | null = null
	const pricePerCPUHour = await EstimateComputeCost(r.executor, r.duration, r.machineType, r.cloudZone, r.priceModel)
	if (pricePerCPUHour) {
		costEstimate = (pricePerCPUHour * 16 * 25000000) / (3600 * 1000)
	}

	console.error({ costEstimate, pricePerCPUHour })
	return NextResponse.json(costEstimate)
}
