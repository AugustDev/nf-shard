import { NextResponse } from "next/server";
import { prisma } from "@services/postgres/prisma";
import { CompleteRunRequest } from "./types";

export async function PUT(request: Request, { params }: any) {
  const id = params.id as string;
  const requestJson: CompleteRunRequest = await request.json();

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
    });

    // update workflow stats and metrics
    await prisma.workflow.update({
      where: {
        id: id,
      },
      data: {
        stats: requestJson.workflow.stats,
        metrics: requestJson.metrics,
        complete: requestJson.workflow.complete,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e }, { status: 500 });
  }

  return NextResponse.json({});
}
