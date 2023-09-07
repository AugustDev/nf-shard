-- DropIndex
DROP INDEX "Workflow_id_updatedAt_projectName_runName_userName_tags_idx";

-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "workspaceId" INTEGER;

-- CreateTable
CREATE TABLE "Workspace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Workspace_id_idx" ON "Workspace" USING HASH ("id");

-- CreateIndex
CREATE INDEX "Workflow_id_updatedAt_projectName_runName_userName_tags_wor_idx" ON "Workflow"("id", "updatedAt", "projectName", "runName", "userName", "tags", "workspaceId");

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
