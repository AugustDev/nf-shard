import { NextResponse } from "next/server"
import { UpdateSlackSettings, GetSettings } from "@/services/prisma"

type TUpdateSettings = {
	slack?: {
		webhook_url: string
		notification_events: string[]
		notifications_enabled: boolean
	}
}

export async function PUT(request: Request) {
	const requestJson: TUpdateSettings = await request.json()
	const url = new URL(request.url)
	const baseUrl = `${url.protocol}//${url.host}`

	try {
		if (requestJson.slack) {
			await UpdateSlackSettings(
				requestJson.slack.notifications_enabled,
				requestJson.slack.notification_events,
				requestJson.slack.webhook_url,
				baseUrl
			)
		}

		const settings = await GetSettings()
		return NextResponse.json(settings)
	} catch (e: any) {
		return NextResponse.json({ error: e }, { status: 500 })
	}
}
