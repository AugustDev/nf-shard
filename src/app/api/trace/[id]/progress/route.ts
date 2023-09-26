import { NextResponse } from "next/server"
import { prisma } from "@/services/prisma/prisma"
import { GetSettings } from "@/services/prisma"
import { formatDuration } from "@/common"
import { TTaskCompletedOptions, TaskCompleteWebhook } from "@/services/slack"

export async function PUT(request: Request, { params }: any) {
	const id = params.id
	const requestJson = await request.json()
	const settings = await GetSettings()

	try {
		// update tasks
		for (const task of requestJson.tasks) {
			await prisma.task.upsert({
				where: {
					workflowId_taskId: { workflowId: id, taskId: task.taskId },
				},
				update: {
					data: task,
				},
				create: {
					workflowId: id,
					taskId: task.taskId,
					data: task,
				},
			})

			if (
				settings.slack_notifications_enabled &&
				settings.slack_webhook_url &&
				settings.slack_notification_events.includes("task_completed") &&
				(task.status == "COMPLETED" || task.status == "FAILED")
			) {
				const duration = formatDuration(task.duration / 1000)
				const status = task.status == "COMPLETED" ? true : false
				const slackWebhookOpts: TTaskCompletedOptions = {
					workflowId: id,
					baseUrl: settings.base_url ?? "",
					name: task.name,
					tag: task.tag,
					duration: duration,
					status: status,
				}
				TaskCompleteWebhook(settings.slack_webhook_url, slackWebhookOpts)
			}
		}

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

		await prisma.workflow.update({
			where: {
				id: id,
			},
			data: {
				id: id,
			},
		})
	} catch (e: any) {
		return NextResponse.json({ error: e }, { status: 500 })
	}

	return NextResponse.json({})
}
