CREATE EXTENSION pg_trgm;

-- CreateTable
CREATE TABLE "Workflow" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3),
    "complete" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectDir" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "homeDir" TEXT NOT NULL,
    "workDir" TEXT NOT NULL,
    "container" TEXT NOT NULL,
    "commitId" TEXT,
    "errorMessage" TEXT,
    "repository" TEXT,
    "containerEngine" TEXT,
    "scriptFile" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "launchDir" TEXT NOT NULL,
    "runName" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "errorReport" TEXT,
    "scriptId" TEXT NOT NULL,
    "revision" TEXT,
    "exitStatus" INTEGER,
    "commandLine" TEXT NOT NULL,
    "stubRun" BOOLEAN NOT NULL,
    "nextflow" JSONB NOT NULL,
    "stats" JSONB NOT NULL,
    "resume" BOOLEAN NOT NULL,
    "success" BOOLEAN NOT NULL,
    "projectName" TEXT NOT NULL,
    "scriptName" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "params" JSONB NOT NULL,
    "configFiles" TEXT[],
    "configText" TEXT NOT NULL,
    "operationId" TEXT,
    "logFile" TEXT,
    "outFile" TEXT,
    "manifest" JSONB NOT NULL,
    "processNames" TEXT[],
    "metrics" JSONB[],
    "searchable" TEXT,
    "tags" TEXT[],

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "pending" INTEGER NOT NULL,
    "ignored" INTEGER NOT NULL,
    "loadCpus" INTEGER NOT NULL,
    "loadMemory" BIGINT NOT NULL,
    "processes" JSONB[],
    "aborted" INTEGER NOT NULL,
    "succeeded" INTEGER NOT NULL,
    "peakMemory" BIGINT NOT NULL,
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

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "workflowId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Workflow_id_updatedAt_projectName_runName_userName_tags_idx" ON "Workflow"("id", "updatedAt", "projectName", "runName", "userName", "tags");

-- CreateIndex
CREATE INDEX "searchable_idx" ON "Workflow" USING GIN ("searchable" gin_trgm_ops);

-- CreateIndex
CREATE UNIQUE INDEX "Progress_id_key" ON "Progress"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Progress_workflowId_key" ON "Progress"("workflowId");

-- CreateIndex
CREATE INDEX "Progress_id_workflowId_idx" ON "Progress"("id", "workflowId");

-- CreateIndex
CREATE INDEX "Task_taskId_workflowId_idx" ON "Task"("taskId", "workflowId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_workflowId_taskId_key" ON "Task"("workflowId", "taskId");

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
