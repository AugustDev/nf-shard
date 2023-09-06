import { clsx } from "clsx"
import { Progress } from "@prisma/client"

type StatusProps = {
	progress: Progress
	className?: string
}

export const Status: React.FC<StatusProps> = ({ progress, className }: StatusProps) => {
	return (
		<div>
			<dl className={clsx(className, "grid grid-cols-3 md:grid-cols-6 gap-5 px-4 md:px-0")}>
				<div className="overflow-hidden rounded-md bg-indigo-500 px-4 py-5 shadow text-white">
					<dt className="truncate text-sm font-medium text-white">Pending</dt>
					<dd className="mt-1 text-3xl font-semibold tracking-tight text-white">{progress.pending}</dd>
				</div>
				<div className="overflow-hidden rounded-md bg-amber-500 px-4 py-5 shadow ">
					<dt className="truncate text-sm font-medium text-white">Submitted</dt>
					<dd className="mt-1 text-3xl font-semibold tracking-tight text-white">{progress.submitted}</dd>
				</div>
				<div className="overflow-hidden rounded-md bg-sky-500 px-4 py-5 shadow">
					<dt className="truncate text-sm font-medium text-white">Running</dt>
					<dd className="mt-1 text-3xl font-semibold tracking-tight text-white">{progress.running}</dd>
				</div>
				<div className="overflow-hidden rounded-md bg-slate-500 px-4 py-5 shadow">
					<dt className="truncate text-sm font-medium text-white">Cached</dt>
					<dd className="mt-1 text-3xl font-semibold tracking-tight text-white">{progress.cached}</dd>
				</div>
				<div className="overflow-hidden rounded-md bg-green-500 px-4 py-5 shadow">
					<dt className="truncate text-sm font-medium text-white">Succeeded</dt>
					<dd className="mt-1 text-3xl font-semibold tracking-tight text-white">{progress.succeeded}</dd>
				</div>
				<div className="overflow-hidden rounded-md bg-red-500 px-4 py-5 shadow">
					<dt className="truncate text-sm font-medium text-white">Failed</dt>
					<dd className="mt-1 text-3xl font-semibold tracking-tight text-white">{progress.failed}</dd>
				</div>
			</dl>
		</div>
	)
}
