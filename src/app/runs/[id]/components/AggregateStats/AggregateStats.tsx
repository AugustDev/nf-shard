"use client"

import { clsx } from "clsx"
import { Task } from "@prisma/client"
import { useMemo } from "react"
import { formatDifference, formatDuration } from "@common/utils/index"
import moment from "moment"
import { TimerDisplayDynamic } from "@/app/components"
const bytes = require("bytes")

type AggregateStatsProps = {
	tasks: Task[]
	startedAt?: Date | null
	completedAt?: Date | null
	className?: string
}

type Stats = {
	cpuTime: number
	totalMemory: number
	storageRead: number
	storageWrite: number
	estimatedCostUsd: number
}

export const AggregateStats: React.FC<AggregateStatsProps> = ({
	tasks,
	completedAt,
	startedAt,
	className,
}: AggregateStatsProps) => {
	const aggregates = useMemo(() => {
		let aggr: Stats = {
			cpuTime: 0,
			totalMemory: 0,
			storageRead: 0,
			storageWrite: 0,
			estimatedCostUsd: 0,
		}

		for (const task of tasks) {
			aggr.cpuTime += (task?.data.cpus * (task?.data?.realtime ?? 0)) / (3600 * 1000)
			aggr.totalMemory += task?.data.rss ?? 0
			aggr.storageRead += task?.data.rchar ?? 0
			aggr.storageWrite += task?.data.wchar ?? 0
		}

		return aggr
	}, [tasks])

	const averageCostPerCpuHour = 0.1
	const costEstimate = aggregates.cpuTime * averageCostPerCpuHour

	return (
		<div>
			<dl className={clsx(className, "grid grid-cols-3 gap-5 px-4 md:px-0 mt-8 md:mt-0")}>
				<div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow">
					<dt className="truncate text-sm font-medium text-gray-500">Wall Time</dt>
					<dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
						{completedAt && <div>{formatDifference(startedAt, completedAt)}</div>}
						{!completedAt && <TimerDisplayDynamic startedAt={startedAt} />}
					</dd>
				</div>
				<div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow">
					<dt className="truncate text-sm font-medium text-gray-500">CPU time</dt>
					<dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
						{aggregates.cpuTime.toFixed(2)} h
					</dd>
				</div>
				<div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow">
					<dt className="truncate text-sm font-medium text-gray-500">Total Memory</dt>
					<dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
						{bytes(aggregates.totalMemory, { unitSeparator: " " })}
					</dd>
				</div>
				<div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow">
					<dt className="truncate text-sm font-medium text-gray-500">Storage Read</dt>
					<dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
						{bytes(aggregates.storageRead, { unitSeparator: " " })}
					</dd>
				</div>
				<div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow">
					<dt className="truncate text-sm font-medium text-gray-500">Storage Write</dt>
					<dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
						{bytes(aggregates.storageWrite, { unitSeparator: " " })}
					</dd>
				</div>
				<div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow">
					<dt className="truncate text-sm font-medium text-gray-500">Estimated Cost</dt>
					<dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">$ {costEstimate.toFixed(3)}</dd>
				</div>
			</dl>
		</div>
	)
}
