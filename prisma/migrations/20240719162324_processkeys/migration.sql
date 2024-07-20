-- CreateTable
CREATE TABLE "ProcessKeys" (
    "id" SERIAL NOT NULL,
    "processKey" TEXT NOT NULL,
    "executor" TEXT NOT NULL,
    "workerUrl" TEXT NOT NULL,

    CONSTRAINT "ProcessKeys_pkey" PRIMARY KEY ("id")
);
