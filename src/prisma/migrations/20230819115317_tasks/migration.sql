-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "taskId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "workflowId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_workflowId_key" ON "Task"("workflowId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
