import { NextResponse } from "next/server";
import { prisma } from "@/services/prisma/prisma";
import { BeginRunRequest } from "./types";

export async function PUT(request: Request, { params }: any) {
  const id = params.id;
  const requestJson: BeginRunRequest = await request.json();

  const searchableQuery = [
    requestJson.workflow?.manifest?.description,
    requestJson.workflow.projectName,
    requestJson.workflow.runName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

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
        container: requestJson.workflow.container,
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
        stats: requestJson.workflow.workflowStats,
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
        progress: {
          create: {
            id: id,
            pending: requestJson.workflow.workflowStats.pendingCount,
            ignored: requestJson.workflow.workflowStats.ignoredCount,
            loadCpus: requestJson.workflow.workflowStats.loadCpus,
            loadMemory: requestJson.workflow.workflowStats.loadMemory,
            processes: requestJson.workflow.workflowStats.processes,
            aborted: requestJson.workflow.workflowStats.abortedCount,
            succeeded: requestJson.workflow.workflowStats.succeededCount,
            peakMemory: requestJson.workflow.workflowStats.peakMemory,
            peakCpus: requestJson.workflow.workflowStats.peakCpus,
            failed: requestJson.workflow.workflowStats.failedCount,
            running: requestJson.workflow.workflowStats.runningCount,
            retries: requestJson.workflow.workflowStats.retriesCount,
            peakRunning: requestJson.workflow.workflowStats.peakRunning,
            cached: requestJson.workflow.workflowStats.cachedCount,
            submitted: requestJson.workflow.workflowStats.submittedCount,
          },
        },
      },
    });

    return NextResponse.json({});
  } catch (e: any) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
