import clsx from "clsx"

type TaskStatusProps = {
	status: string
}

export const TaskStatusTag = ({ status }: TaskStatusProps) => {
	const styles = clsx({
		"inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium capitalize": true,
		"bg-green-100 text-green-700": status === "completed" || status === "cached",
		"bg-red-100 text-red-700": status === "failed" || status === "aborted",
		"bg-orange-100 text-orange-700": status === "submitted" || status === "new",
		"bg-indigo-100 text-indigo-700": status === "running",
	})
	return <span className={styles}>{status}</span>
}
