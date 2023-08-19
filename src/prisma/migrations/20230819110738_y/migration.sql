/*
  Warnings:

  - The primary key for the `Progress` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Progress_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Progress_id_seq";
