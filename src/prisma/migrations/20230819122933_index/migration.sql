-- DropIndex
DROP INDEX "Task_id_workflowId_idx";

-- CreateIndex
CREATE INDEX "Task_taskId_workflowId_idx" ON "Task"("taskId", "workflowId");
