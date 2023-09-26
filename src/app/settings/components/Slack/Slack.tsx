"use client"

import { useState } from "react"
import { Switch } from "@headlessui/react"
import clsx from "clsx"

export type TSlackSettingsProps = {
	webhookUrl?: string | null
	notificationEvents: string[]
	notificationsEnabled: boolean
	onSave: (enabled: boolean, webhookUrl: string, notificationEvents: string[]) => void
	testConnection: () => void
}

export const Slack = (props: TSlackSettingsProps) => {
	const [enabled, setEnabled] = useState(props.notificationsEnabled)
	const [webhookUrl, setWebhookUrl] = useState(props.webhookUrl ?? "")
	const [eventRunCompleted, setEventRunCompleted] = useState(props.notificationEvents.includes("run_completed"))
	const [eventTaskCompleted, setEventTaskCompleted] = useState(props.notificationEvents.includes("task_completed"))

	const onSave = () => {
		const events = []
		if (eventRunCompleted) {
			events.push("run_completed")
		}
		if (eventTaskCompleted) {
			events.push("task_completed")
		}
		props.onSave(enabled, webhookUrl, events)
	}

	return (
		<div className="space-y-10 divide-y divide-gray-900/10">
			<div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
				<div className="px-4 sm:px-0">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Slack integration</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Receive notifications in Slack when your workflow completes or other events occur.
					</p>
					<p className="mt-5 text-sm leading-6 text-gray-600">
						nf-shard cannot read your Slack messages or access any information in your workspace.
					</p>
				</div>

				<div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
					<div className="px-4 py-6 sm:p-8">
						<div className="max-w-2xl transition ease-in-out delay-150">
							<Switch.Group as="div" className="flex items-center justify-between">
								<span className="flex flex-grow flex-col">
									<Switch.Label as="span" className="text-md font-semibold leading-6 text-gray-900" passive>
										Status
									</Switch.Label>
								</span>
								<Switch
									checked={enabled}
									onChange={setEnabled}
									className={clsx(
										enabled ? "bg-indigo-600" : "bg-gray-200",
										"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
									)}
								>
									<span
										aria-hidden="true"
										className={clsx(
											enabled ? "translate-x-5" : "translate-x-0",
											"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
										)}
									/>
								</Switch>
							</Switch.Group>

							{enabled && (
								<div className="space-y-10 pt-8 transition ease-in-out delay-150">
									<div className="sm:col-span-4">
										<label htmlFor="website" className="text-sm font-semibold leading-6 text-gray-900">
											Webhook URL
										</label>
										<div className="mt-2">
											<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
												<input
													type="text"
													name="webhook"
													id="webhook"
													value={webhookUrl}
													onChange={(e) => setWebhookUrl(e.target.value)}
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
									</div>

									<fieldset>
										<legend className="text-sm font-semibold leading-6 text-gray-900">Events</legend>
										<div className="mt-6 space-y-6">
											<div className="relative flex gap-x-3">
												<div className="flex h-6 items-center">
													<input
														type="checkbox"
														checked={eventRunCompleted}
														onChange={(e) => setEventRunCompleted(e.target.checked)}
														className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
													/>
												</div>
												<div className="text-sm leading-6">
													<label htmlFor="comments" className="font-medium text-gray-900">
														Run completed
													</label>
													<p className="text-gray-500">
														Get notified when Nextflow completes a run with either success or failed status.
													</p>
												</div>
											</div>
											<div className="relative flex gap-x-3">
												<div className="flex h-6 items-center">
													<input
														type="checkbox"
														checked={eventTaskCompleted}
														onChange={(e) => setEventTaskCompleted(e.target.checked)}
														className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
													/>
												</div>
												<div className="text-sm leading-6">
													<label htmlFor="candidates" className="font-medium text-gray-900">
														Task completed
													</label>
													<p className="text-gray-500">
														Get notified when Nextflow completes a task with sucess or failed status.
													</p>
												</div>
											</div>
										</div>
									</fieldset>
								</div>
							)}
						</div>
					</div>
					<div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
						{enabled && (
							<button
								type="button"
								className="text-sm font-semibold leading-6 text-gray-900"
								onClick={props.testConnection}
							>
								Test Connection
							</button>
						)}
						<button
							type="submit"
							className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={onSave}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
