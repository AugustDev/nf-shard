"use client"

import { Container } from "@/app/components"
import { toast } from "react-hot-toast"
import { Slack } from "../Slack"
import { AppSettings } from "@prisma/client"

type TSettingsProps = {
	settings: AppSettings
}

export const Main = ({ settings }: TSettingsProps) => {
	const saveSlackSettings = async (enabled: boolean, webhookUrl: string, notificationEvents: string[]) => {
		const settings = {
			slack: {
				webhook_url: webhookUrl ?? "",
				notification_events: notificationEvents,
				notifications_enabled: enabled,
			},
		}
		const response = await fetch(`/api/settings`, {
			body: JSON.stringify(settings),
			method: "PUT",
			cache: "no-store",
		})

		const s = await response.json()
		if (s) {
			toast.success(<div className="text-sm font-medium">Settings updated</div>, {
				duration: 3000,
			})
		}
	}

	const testSlackConnection = async () => {
		await fetch(`/api/slack/test`, {
			method: "POST",
			cache: "no-store",
		})
		toast(<div className="text-sm font-medium">Attempted to send webhook</div>, {
			duration: 3000,
		})
	}

	return (
		<Container sectionName="Settings">
			<Slack
				notificationEvents={settings.slack_notification_events}
				webhookUrl={settings.slack_webhook_url}
				notificationsEnabled={settings.slack_notifications_enabled}
				onSave={saveSlackSettings}
				testConnection={testSlackConnection}
			/>
		</Container>
	)
}
