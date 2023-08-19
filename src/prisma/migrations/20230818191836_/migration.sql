/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Workflow" (
    "id" TEXT NOT NULL,
    "commandLine" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "configFiles" TEXT[],
    "configText" TEXT NOT NULL,
    "container" TEXT,
    "containerEngine" TEXT,
    "duration" INTEGER,
    "errorMessage" TEXT,
    "homeDir" TEXT,
    "launchDir" TEXT,
    "profileId" TEXT,
    "projectDir" TEXT,
    "projectName" TEXT NOT NULL,
    "repository" TEXT,
    "resume" BOOLEAN NOT NULL,
    "runName" TEXT NOT NULL,
    "scriptFile" TEXT,
    "scriptId" TEXT,
    "scriptName" TEXT,
    "sessionId" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "success" BOOLEAN NOT NULL,
    "stubRun" BOOLEAN NOT NULL,
    "userName" TEXT NOT NULL,
    "workDir" TEXT NOT NULL,
    "params" JSONB NOT NULL,
    "nextflow" JSONB NOT NULL,
    "manifest" JSONB NOT NULL,
    "workflowStats" JSONB NOT NULL,
    "stats" JSONB NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);
