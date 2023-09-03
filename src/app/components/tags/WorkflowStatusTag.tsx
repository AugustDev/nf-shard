import { WorkflowStatus } from "@/common"
import clsx from "clsx"
import { useMemo } from "react"
import { AnimatedIcon } from ".."
import { AiOutlineLoading3Quarters } from "react-icons/ai"

type WorkflowStatusProps = {
	status: WorkflowStatus
}

export const WorkflowStatusTag = ({ status }: WorkflowStatusProps) => {
	const styles = clsx({
		"inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium capitalize": true,
		"bg-green-100 text-green-700": status === WorkflowStatus.SUCCESS,
		"bg-red-100 text-red-700": status === WorkflowStatus.FAILED || status === WorkflowStatus.FAILED_TIMEOUT,
		"bg-indigo-100 text-indigo-700": status === WorkflowStatus.RUNNING,
	})
	const message = useMemo(() => {
		if (status === WorkflowStatus.SUCCESS) {
			return "Success"
		} else if (status === WorkflowStatus.FAILED || status === WorkflowStatus.FAILED_TIMEOUT) {
			return "Failed"
		} else {
			return "Running"
		}
	}, [status])
	return (
		<span className={styles}>
			{status === WorkflowStatus.RUNNING && (
				<AnimatedIcon>
					<AiOutlineLoading3Quarters className="h-4 w-4 flex-shrink-0 text-indigo-700" />
				</AnimatedIcon>
			)}

			{status}
		</span>
	)
}
