"use client"

import { useRouter } from "next/navigation"
import { Tag, TimerDisplayDynamic, WorkflowStatusTag } from "@/app/components"
import { formatDifference, fullDateTime, workflowStatus } from "@/common"
import { Workflow } from "@prisma/client"

import { clsx } from "clsx"
import { OptionsDropdown } from "../OptionsDropdown"

type RunsTableProps = {
	runs: Workflow[]
	className?: string
	onDeleteClick: (id: string) => void
}

export const RunsTable: React.FC<RunsTableProps> = ({ runs, className, onDeleteClick }: RunsTableProps) => {
	const { push } = useRouter()

	const handleRowClick = (id: string) => {
		push(`/runs/${id}`)
	}

	return (
		<div className={clsx(className, "overflow-auto h-full")}>
			<table className="rounded-md text-left bg-white w-full mx-4 md:mx-0 ">
				<tbody className="divide-y align-middle sm:px-6 lg:px-8">
					{runs.map((run) => (
						<tr onClick={() => handleRowClick(run.id)} key={run.id} className="hover:bg-gray-50 cursor-pointer">
							<td className="whitespace-nowrap px-6 py-5 text-sm text-gray-500">
								<div className="text-gray-900">{run.manifest.description}</div>
							</td>
							<td className="whitespace-nowrap py-5 px-3 text-sm sm:pl-0">
								<div className="flex items-center">
									<div className="ml-4">
										<div className="font-medium text-gray-900">{run.runName}</div>
										<div className="mt-1 text-gray-500">{run.projectName}</div>
									</div>
								</div>
							</td>

							<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-right">
								<div className="font-medium text-gray-900">{fullDateTime(run.start)}</div>
								<div className="text-gray-500 mt-1">
									{run.complete && <div>{formatDifference(run.start, run.complete)}</div>}
									{!run.complete && <TimerDisplayDynamic startedAt={run.start} />}
								</div>
							</td>
							<td className="text-right">
								{run.tags.map((tag) => (
									<Tag key={tag} name={tag} />
								))}
							</td>
							<td className="whitespace-nowrap pr-6 py-5 text-sm text-gray-500 text-right">
								<WorkflowStatusTag status={workflowStatus(run)} />
							</td>
							<td className="whitespace-nowrap pr-6 py-5 text-sm text-gray-500 text-right">
								<OptionsDropdown deleteWorkflow={() => onDeleteClick(run.id)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
