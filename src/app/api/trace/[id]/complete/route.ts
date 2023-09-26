import { NextResponse } from "next/server"
import { prisma } from "@/services/prisma/prisma"
import { GetSettings } from "@/services/prisma/appSettings"
import { RunCompletedWebhook, RunCompletedOptions } from "@/services/slack"
import { CompleteRunRequest } from "./types"
import { GetWorkspaceById } from "@/services/prisma/workspace"
import { formatDuration } from "@/common"

export async function PUT(request: Request, { params }: any) {
	const id = params.id as string
	const requestJson: CompleteRunRequest = await request.json()

	try {
		//update progress
		await prisma.progress.update({
			where: {
				workflowId: id,
			},
			data: {
				pending: requestJson.progress.pending,
				ignored: requestJson.progress.ignored,
				loadCpus: requestJson.progress.loadCpus,
				loadMemory: requestJson.progress.loadMemory,
				processes: requestJson.progress.processes,
				aborted: requestJson.progress.aborted,
				succeeded: requestJson.progress.succeeded,
				peakMemory: requestJson.progress.peakMemory,
				peakCpus: requestJson.progress.peakCpus,
				failed: requestJson.progress.failed,
				running: requestJson.progress.running,
				retries: requestJson.progress.retries,
				peakRunning: requestJson.progress.peakRunning,
				cached: requestJson.progress.cached,
				submitted: requestJson.progress.submitted,
			},
		})

		// update workflow stats and metrics
		await prisma.workflow.update({
			where: {
				id: id,
			},
			data: {
				stats: requestJson.workflow.stats,
				metrics: requestJson.metrics,
				complete: requestJson.workflow.complete,
				duration: requestJson.workflow.duration,
				errorMessage: requestJson.workflow.errorMessage,
				exitStatus: requestJson.workflow.exitStatus,
				success: requestJson.workflow.success,
				errorReport: requestJson.workflow.errorReport,
			},
		})

		const settings = await GetSettings()
		if (
			settings.slack_notifications_enabled &&
			settings.slack_webhook_url &&
			settings.slack_notification_events.includes("run_completed")
		) {
			const tags = requestJson.workflow?.params["tags"]?.split(",").map((e: string) => e.trim()) ?? []
			const duration = formatDuration(requestJson.workflow.duration / 1000)
			const slackWebhookOpts: RunCompletedOptions = {
				id: id,
				baseUrl: settings.base_url ?? "",
				name: requestJson.workflow.manifest.description,
				runName: requestJson.workflow.runName,
				duration: duration,
				tags: tags,
				status: requestJson.workflow.success,
			}
			RunCompletedWebhook(settings.slack_webhook_url, slackWebhookOpts)
		}
	} catch (e: any) {
		return NextResponse.json({ error: e }, { status: 500 })
	}

	return NextResponse.json({})
}
