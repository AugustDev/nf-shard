-- CreateTable
CREATE TABLE "Progress" (
    "id" SERIAL NOT NULL,
    "pending" INTEGER NOT NULL,
    "ignored" INTEGER NOT NULL,
    "loadCpus" INTEGER NOT NULL,
    "loadMemory" INTEGER NOT NULL,
    "processes" JSONB NOT NULL,
    "aborted" INTEGER NOT NULL,
    "succeeded" INTEGER NOT NULL,
    "peakMemory" INTEGER NOT NULL,
    "peakCpus" INTEGER NOT NULL,
    "failed" INTEGER NOT NULL,
    "running" INTEGER NOT NULL,
    "retries" INTEGER NOT NULL,
    "peakRunning" INTEGER NOT NULL,
    "cached" INTEGER NOT NULL,
    "submitted" INTEGER NOT NULL,
    "index" INTEGER,
    "name" TEXT,
    "stored" INTEGER,
    "terminated" BOOLEAN,
    "workflowId" TEXT NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Progress_workflowId_key" ON "Progress"("workflowId");

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
