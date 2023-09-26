import { GetSettings } from "@/services/prisma"
import { TestSlackConnection } from "@/services/slack/slack"
import { NextResponse } from "next/server"

export async function POST() {
	const settings = await GetSettings()
	if (settings.slack_webhook_url) {
		TestSlackConnection(settings.slack_webhook_url)
	}
	return NextResponse.json({ success: true })
}
