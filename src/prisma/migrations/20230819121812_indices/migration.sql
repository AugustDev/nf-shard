-- CreateIndex
CREATE INDEX "Progress_id_workflowId_idx" ON "Progress"("id", "workflowId");

-- CreateIndex
CREATE INDEX "Task_id_workflowId_idx" ON "Task"("id", "workflowId");

-- CreateIndex
CREATE INDEX "Workflow_id_idx" ON "Workflow"("id");
