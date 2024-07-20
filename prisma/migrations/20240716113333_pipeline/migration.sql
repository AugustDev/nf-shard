-- CreateTable
CREATE TABLE "Pipeline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "github_url" TEXT NOT NULL,
    "compute_overrides" JSONB,
    "run_params" JSONB,

    CONSTRAINT "Pipeline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pipeline_id_key" ON "Pipeline"("id");
