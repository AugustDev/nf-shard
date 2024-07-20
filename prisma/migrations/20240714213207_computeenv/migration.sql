-- CreateTable
CREATE TABLE "ComputeEnvironment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "orchestrator_endpoint" TEXT NOT NULL,
    "orchestrator_token" TEXT NOT NULL,
    "executor" TEXT NOT NULL,

    CONSTRAINT "ComputeEnvironment_pkey" PRIMARY KEY ("id")
);
