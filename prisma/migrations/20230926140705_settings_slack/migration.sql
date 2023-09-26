-- CreateTable
CREATE TABLE "AppSettings" (
    "id" SERIAL NOT NULL,
    "base_url" TEXT,
    "slack_webhook_url" TEXT,
    "slack_notification_events" TEXT[],
    "slack_notifications_enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AppSettings_pkey" PRIMARY KEY ("id")
);
