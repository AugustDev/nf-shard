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
	console.log(lastUpdatedAt)
	if (lastUpdatedAt > 30) {
		return WorkflowStatus.FAILED_TIMEOUT
	}

	return WorkflowStatus.RUNNING
}
