async function SendSlackWebhook(webhookUrl: string, body: any) {
	if (webhookUrl == "") {
		return
	}

	try {
		return await fetch(webhookUrl, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"content-type": "application/json",
			},
		})
	} catch (error) {
		console.error(error)
	}
}

export async function TestSlackConnection(webhookUrl: string) {
	SendSlackWebhook(webhookUrl, { text: "nf-shard: Integration successful :white_check_mark:" })
}

export type RunCompletedOptions = {
	baseUrl: string
	id: string
	name?: string
	runName: string
	duration: string
	tags: string[]
	status: boolean
	workspaceName?: string
}

export async function RunCompletedWebhook(webhookUrl: string, options: RunCompletedOptions) {
	const fields = []
	const status = options.status ? "Success :large_green_circle:" : "Failed :red_circle:"

	fields.push({
		type: "mrkdwn",
		text: `*Status*\n${status}`,
	})

	fields.push({
		type: "mrkdwn",
		text: `*Duration*\n${options.duration}`,
	})

	fields.push({
		type: "mrkdwn",
		text: `*Run ID*\n${options.runName}`,
	})

	if (options.name) {
		fields.push({
			type: "mrkdwn",
			text: `*Name*\n${options.name}`,
		})
	}

	if (options.tags.length > 0) {
		fields.push({
			type: "mrkdwn",
			text: `*Tags*\n${options.tags.join(", ")}`,
		})
	}

	if (options.workspaceName) {
		fields.push({
			type: "mrkdwn",
			text: `*Workspace*\n${options.workspaceName}`,
		})
	}

	const heading = options.name != "" ? options.name : "Workflow completed"
	const body = {
		blocks: [
			{
				type: "header",
				text: {
					type: "plain_text",
					text: heading,
					emoji: true,
				},
			},
			{
				type: "divider",
			},
			{
				type: "section",
				fields: fields,
			},
			{
				type: "actions",
				elements: [
					{
						type: "button",
						style: "primary",
						text: {
							type: "plain_text",
							emoji: true,
							text: "View Run",
						},
						url: `${options.baseUrl}/runs/${options.id}`,
					},
				],
			},
		],
	}

	try {
		SendSlackWebhook(webhookUrl, body)
	} catch (error) {
		console.error(error)
	}
}

export type TTaskCompletedOptions = {
	workflowId: string
	baseUrl: string
	name: string
	tag?: string
	duration: string
	status: boolean
}

export async function TaskCompleteWebhook(webhookUrl: string, options: TTaskCompletedOptions) {
	const fields = []
	const status = options.status ? "Success :large_green_circle:" : "Failed :red_circle:"

	fields.push({
		type: "mrkdwn",
		text: `*Status*\n${status}`,
	})

	fields.push({
		type: "mrkdwn",
		text: `*Duration*\n${options.duration}`,
	})

	if (options.name) {
		fields.push({
			type: "mrkdwn",
			text: `*Name*\n${options.name}`,
		})
	}

	const heading = `Task completed: ${options.name}`
	const body = {
		blocks: [
			{
				type: "header",
				text: {
					type: "plain_text",
					text: heading,
					emoji: true,
				},
			},
			{
				type: "divider",
			},
			{
				type: "section",
				fields: fields,
			},
			{
				type: "actions",
				elements: [
					{
						type: "button",
						style: "primary",
						text: {
							type: "plain_text",
							emoji: true,
							text: "View Run",
						},
						url: `${options.baseUrl}/runs/${options.workflowId}`,
					},
				],
			},
		],
	}

	try {
		SendSlackWebhook(webhookUrl, body)
	} catch (error) {
		console.error(error)
	}
}
