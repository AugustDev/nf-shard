/*
  Warnings:

  - You are about to drop the column `workerUrl` on the `ProcessKeys` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProcessKeys" DROP COLUMN "workerUrl",
ADD COLUMN     "computeEnvironmentId" INTEGER;

-- AddForeignKey
ALTER TABLE "ProcessKeys" ADD CONSTRAINT "ProcessKeys_computeEnvironmentId_fkey" FOREIGN KEY ("computeEnvironmentId") REFERENCES "ComputeEnvironment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
