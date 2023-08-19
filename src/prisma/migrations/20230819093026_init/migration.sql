/*
  Warnings:

  - You are about to drop the column `completedAt` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `workflowStats` on the `Workflow` table. All the data in the column will be lost.
  - Added the required column `profile` to the `Workflow` table without a default value. This is not possible if the table is not empty.
  - Made the column `container` on table `Workflow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `Workflow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `homeDir` on table `Workflow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `launchDir` on table `Workflow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectDir` on table `Workflow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `scriptFile` on table `Workflow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `scriptId` on table `Workflow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `scriptName` on table `Workflow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sessionId` on table `Workflow` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Workflow" DROP COLUMN "completedAt",
DROP COLUMN "profileId",
DROP COLUMN "startedAt",
DROP COLUMN "updatedAt",
DROP COLUMN "workflowStats",
ADD COLUMN     "commitId" TEXT,
ADD COLUMN     "complete" TIMESTAMP(3),
ADD COLUMN     "errorReport" TEXT,
ADD COLUMN     "exitStatus" INTEGER,
ADD COLUMN     "logFile" TEXT,
ADD COLUMN     "operationId" TEXT,
ADD COLUMN     "outFile" TEXT,
ADD COLUMN     "profile" TEXT NOT NULL,
ADD COLUMN     "revision" TEXT,
ADD COLUMN     "start" TIMESTAMP(3),
ALTER COLUMN "container" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "homeDir" SET NOT NULL,
ALTER COLUMN "launchDir" SET NOT NULL,
ALTER COLUMN "projectDir" SET NOT NULL,
ALTER COLUMN "scriptFile" SET NOT NULL,
ALTER COLUMN "scriptId" SET NOT NULL,
ALTER COLUMN "scriptName" SET NOT NULL,
ALTER COLUMN "sessionId" SET NOT NULL,
ALTER COLUMN "params" SET DATA TYPE TEXT;
