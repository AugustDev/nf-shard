-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "costEstimate" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Task_updatedAt_idx" ON "Task"("updatedAt");
