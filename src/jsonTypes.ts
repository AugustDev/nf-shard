import { Workflow } from "@prisma/client"

declare global {
	namespace PrismaJson {
		export type Nextflow = {
			version: string
			build: number
			timestamp: Date
			enable: Enable
		}

		type Enable = {
			dsl: number
		}

		export type Stats = {
			succeededCount: number
			computeTimeFmt: string
			cachedCount: number
			processes: Process[]
			changeTimestamp: number
			peakRunning: number
			succeedDuration: number
			cachedPct: number
			loadMemory: number
			succeedCountFmt: string
			failedPct: number
			ignoredCount: number
			submittedCount: number
			peakMemory: number
			succeedPct: number
			succeedCount: number
			runningCount: number
			pendingCount: number
			loadCpus: number
			cachedDuration: number
			abortedCount: number
			failedDuration: number
			failedCount: number
			loadMemoryFmt: string
			retriesCount: number
			cachedCountFmt: string
			progressLength: number
			peakMemoryFmt: string
			failedCountFmt: string
			ignoredCountFmt: string
			peakCpus: number
			ignoredPct: number
		}

		export type Process = {
			pending: number
			ignored: number
			loadCpus: number
			loadMemory: number
			aborted: number
			succeeded: number
			peakMemory: number
			peakCpus: number
			failed: number
			running: number
			retries: number
			peakRunning: number
			cached: number
			submitted: number
			index: number
			name: string
			stored: number
			terminated: boolean
		}

		export type Metric = {
			cpuUsage: Measurement
			process: string
			mem: Measurement
			memUsage: Measurement
			timeUsage?: number
			vmem: Measurement
			reads: Measurement
			cpu: Measurement
			time: Measurement
			writes: Measurement
		}

		export type Measurement = {
			mean: number
			min: number
			q1: number
			q2: number
			q3: number
			max: number
			minLabel: string
			maxLabel: string
			q1Label: string
			q2Label: string
			q3Label: string
		}

		export type Manifest = {
			doi?: string
			nextflowVersion?: string
			defaultBranch: string
			version: string
			homePage?: string
			gitmodules?: string
			description: string
			recurseSubmodules: boolean
			name?: string
			mainScript: string
			author?: string
		}

		export type Task = {
			taskId: number
			status: string
			hash: string
			name: string
			exit?: number
			submit?: Date
			start?: Date
			process?: string
			tag?: string
			module?: any[]
			container?: string
			attempt?: number
			script?: string
			scratch?: string
			workdir?: string
			queue?: string
			cpus: number
			memory: number
			disk?: string
			time?: string
			env?: string
			errorAction?: string
			complete?: Date
			duration: number
			realtime?: number
			pcpu: number
			rchar: number
			wchar: number
			syscr: number
			syscw: number
			readBytes: number
			writeBytes: number
			pmem: number
			vmem: number
			rss: number
			peakVmem: number
			peakRss?: number
			volCtxt: number
			invCtxt: number
			nativeId?: string
			executor?: string
			cloudZone?: string
			machineType?: string
			priceModel?: string
		}

		export type TComputeEnvOverride = {
			name: string
			content: string
		}
	}
}

export {}
