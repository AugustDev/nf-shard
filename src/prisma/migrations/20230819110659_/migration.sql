/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Progress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Progress_id_key" ON "Progress"("id");
