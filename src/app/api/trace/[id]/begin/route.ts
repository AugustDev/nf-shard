import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/services/prisma/prisma"
import { BeginRunRequest } from "./types"

export async function PUT(request: NextRequest, { params }: any) {
	const id = params.id

	const requestJson: BeginRunRequest = await request.json()

	const searchableQuery = [
		requestJson.workflow?.manifest?.description,
		requestJson.workflow.projectName,
		requestJson.workflow.runName,
	]
		.filter(Boolean)
		.join(" ")
		.toLowerCase()

	// optional workspace Id
	const workspaceId = request.nextUrl.searchParams.get("workspaceId")
	let workspaceIdParsed
	if (workspaceId) {
		workspaceIdParsed = Number(workspaceId)
	}

	const tags = requestJson.workflow?.params["tags"]?.split(",").map((e: string) => e.trim()) ?? []

	try {
		await prisma.workflow.create({
			data: {
				id: id,
				start: requestJson.workflow.start,
				complete: requestJson.workflow.complete,
				projectDir: requestJson.workflow.projectDir,
				profile: requestJson.workflow.profile,
				homeDir: requestJson.workflow.homeDir,
				workDir: requestJson.workflow.workDir,
				container: requestJson.workflow.container ?? "",
				commitId: requestJson.workflow.commitId,
				errorMessage: requestJson.workflow.errorMessage,
				repository: requestJson.workflow.repository,
				containerEngine: requestJson.workflow.containerEngine,
				scriptFile: requestJson.workflow.scriptFile,
				userName: requestJson.workflow.userName,
				launchDir: requestJson.workflow.launchDir,
				runName: requestJson.workflow.runName,
				sessionId: requestJson.workflow.sessionId,
				errorReport: requestJson.workflow.errorReport,
				scriptId: requestJson.workflow.scriptId,
				revision: requestJson.workflow.revision,
				exitStatus: requestJson.workflow.exitStatus,
				commandLine: requestJson.workflow.commandLine,
				stubRun: requestJson.workflow.stubRun,
				nextflow: requestJson.workflow.nextflow,
				// stats: requestJson.workflow.workflowStats,
				resume: requestJson.workflow.resume,
				success: requestJson.workflow.success,
				projectName: requestJson.workflow.projectName,
				scriptName: requestJson.workflow.scriptName,
				duration: requestJson.workflow.duration ?? 0,
				params: requestJson.workflow.params,
				configFiles: requestJson.workflow.configFiles,
				configText: requestJson.workflow.configText,
				operationId: requestJson.workflow.operationId,
				logFile: requestJson.workflow.logFile,
				outFile: requestJson.workflow.outFile,
				manifest: requestJson.workflow.manifest,
				processNames: requestJson.processNames,
				searchable: searchableQuery,
				workspaceId: workspaceIdParsed,
				tags: tags,
				progress: {
					create: {
						id: id,
						pending: 0,
						ignored: 0,
						loadCpus: 0,
						loadMemory: 0,
						aborted: 0,
						succeeded: 0,
						peakMemory: 0,
						peakCpus: 0,
						failed: 0,
						running: 0,
						retries: 0,
						peakRunning: 0,
						cached: 0,
						submitted: 0,
					},
				},
			},
		})

		const url = new URL(request.url)
		const baseUrl = `${url.protocol}//${url.host}`

		return NextResponse.json({
			watchUrl: `${baseUrl}/runs/${id}`,
		})
	} catch (e: any) {
		console.error(e)
		return NextResponse.json({ error: e }, { status: 500 })
	}
}
