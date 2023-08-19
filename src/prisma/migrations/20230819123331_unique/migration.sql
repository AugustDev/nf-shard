/*
  Warnings:

  - A unique constraint covering the columns `[workflowId,taskId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Task_workflowId_taskId_key" ON "Task"("workflowId", "taskId");
