import { prisma } from "@/services/prisma/prisma"

export const GetSettings = async () => {
	const settings = await prisma.appSettings.findMany()

	// settings do not exist yet - create
	if (settings.length == 0) {
		const newSettings = await prisma.appSettings.create({})
		return newSettings
	}

	return settings[0]
}

export const UpdateSlackSettings = async (
	enabled: boolean,
	notificationEvents: string[],
	webhookUrl: string,
	baseUrl: string
) => {
	const settings = await GetSettings()

	await prisma.appSettings.update({
		where: {
			id: settings.id,
		},
		data: {
			slack_notifications_enabled: enabled,
			slack_notification_events: notificationEvents,
			slack_webhook_url: webhookUrl,
			base_url: baseUrl,
		},
	})
}
