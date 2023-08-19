/*
  Warnings:

  - Changed the type of `params` on the `Workflow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Workflow" DROP COLUMN "params",
ADD COLUMN     "params" JSONB NOT NULL;
