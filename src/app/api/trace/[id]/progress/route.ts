import { NextResponse } from "next/server";
import { prisma } from "@services/postgres/prisma";
import { ProgressRequest } from "./types";

export async function PUT(request: Request, { params }: any) {
  const id = params.id;
  const requestJson: ProgressRequest = await request.json();

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
      });
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
    });
  } catch (error) {}

  return NextResponse.json({});
}
