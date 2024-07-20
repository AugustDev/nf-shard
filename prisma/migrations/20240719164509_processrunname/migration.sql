/*
  Warnings:

  - Added the required column `runName` to the `ProcessKeys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProcessKeys" ADD COLUMN     "runName" TEXT NOT NULL;
