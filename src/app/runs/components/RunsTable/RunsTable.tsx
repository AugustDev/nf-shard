"use client"

import { useRouter } from "next/navigation"
import { Tag, TimerDisplayDynamic, WorkflowStatusTag } from "@/app/components"
import { formatDifference, fullDateTime, workflowStatus } from "@/common"
import { Workflow } from "@prisma/client"

import { clsx } from "clsx"
import { OptionsDropdown } from "../OptionsDropdown"
import Link from "next/link"

type RunsTableProps = {
	runs: Workflow[]
	className?: string
	onDeleteClick: (id: string) => void
}

export const RunsTable: React.FC<RunsTableProps> = ({ runs, className, onDeleteClick }: RunsTableProps) => {
	return (
		<div className={clsx(className, "overflow-x-auto h-full mx-4 md:mx-0")}>
			<div className="rounded-md text-left bg-white min-w-max">
				{runs.map((run) => (
					<Link href={`/runs/${run.id}`} key={run.id}>
						<div
							key={run.id}
							className="grid hover:bg-gray-50 cursor-pointer align-middle sm:px-6 lg:px-8"
							style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr auto" }}
						>
							<div className="whitespace-nowrap px-6 py-5 text-sm text-gray-500 flex-auto">
								<div className="text-gray-900">{run.manifest.description}</div>
							</div>
							<div className="whitespace-nowrap py-5 px-3 text-sm sm:pl-0 flex-auto">
								<div className="flex items-center">
									<div className="ml-4">
										<div className="font-medium text-gray-900">{run.runName}</div>
										<div className="mt-1 text-gray-500">{run.projectName}</div>
									</div>
								</div>
							</div>
							<div className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-right flex-auto">
								<div className="font-medium text-gray-900">{fullDateTime(run.start)}</div>
								<div className="text-gray-500 mt-1">
									{run.complete && <div>{formatDifference(run.start, run.complete)}</div>}
									{!run.complete && <TimerDisplayDynamic startedAt={run.start} />}
								</div>
							</div>
							<div className="whitespace-nowrap px-3 py-5 text-sm grid-column-span-2 text-right flex justify-center items-center flex-auto w-1/8">
								{run.tags.map((tag) => (
									<Tag key={tag} name={tag} />
								))}
							</div>
							<div className="whitespace-nowrap py-5 text-sm text-gray-500 flex justify-center items-center">
								<WorkflowStatusTag status={workflowStatus(run)} />
							</div>
							<div className="whitespace-nowrap py-5 text-sm text-gray-500 flex justify-end items-center">
								<OptionsDropdown deleteWorkflow={() => onDeleteClick(run.id)} />
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
