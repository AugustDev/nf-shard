import { Workflow } from "@prisma/client"
import moment from "moment"

export enum WorkflowStatus {
	SUCCESS = "SUCCESS",
	RUNNING = "RUNNING",
	FAILED = "FAILED",
	FAILED_TIMEOUT = "FAILED_TIMEOUT",
}

export const workflowStatus = (workflow: Workflow): WorkflowStatus => {
	if (workflow.success) {
		return WorkflowStatus.SUCCESS
	}

	if (workflow.errorMessage || workflow.complete) {
		return WorkflowStatus.FAILED
	}

	const lastUpdatedAt = moment(new Date()).diff(moment(workflow.updatedAt), "minutes")
	if (lastUpdatedAt > 15) {
		return WorkflowStatus.FAILED
	}

	return WorkflowStatus.RUNNING
}

export const extractExecutor = (configText: string) => {
	const executorRegex = /^\s*executor\s*=\s*['"]?(\w+)['"]?/m

	const match = configText.match(executorRegex)

	if (match) {
		return match[1]
	}

	return null
}
