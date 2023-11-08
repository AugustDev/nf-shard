"use client"

import { useRouter } from "next/navigation"
import { Tag, TimerDisplayDynamic, WorkflowStatusTag } from "@/app/components"
import { formatDifference, fullDateTime, workflowStatus } from "@/common"
import { Workflow } from "@prisma/client"

import { clsx } from "clsx"
import { OptionsDropdown } from "../OptionsDropdown"
import Link from "next/link"
import React from "react"

type RunsTableProps = {
	runs: Workflow[]
	className?: string
	onDeleteClick: (id: string) => void
}

export const RunsTable: React.FC<RunsTableProps> = ({ runs, className, onDeleteClick }: RunsTableProps) => {
	return (
		<div className={clsx(className, "overflow-x-auto h-full mx-4 md:mx-0 bg-white")}>
			<div className="rounded-md text-left bg-white">
				{runs.map((run) => (
					<Link href={`/runs/${run.id}`} key={run.id} className="">
						<div className="grid grid-cols-[minmax(auto,1fr),minmax(auto,1fr),minmax(auto,1fr),minmax(auto,1fr),minmax(auto,1fr),min-content] gap-4  align-middle sm:px-6 lg:px-8 hover:bg-gray-50 cursor-pointer">
							<div className="px-6 py-5 text-sm text-gray-500 min-w-[300px]">
								<div className="text-gray-900">{run.manifest.description}</div>
							</div>
							<div className="py-5 px-3 text-sm flex items-center min-w-[200px]">
								<div className="ml-4">
									<div className="font-medium text-gray-900">{run.runName}</div>
									<div className="mt-1 text-gray-500">{run.projectName}</div>
								</div>
							</div>
							<div className="px-3 py-5 text-sm text-gray-500 text-right min-w-[200px]">
								<div className="font-medium text-gray-900">{fullDateTime(run.start)}</div>
								<div className="mt-1">
									{run.complete && <div>{formatDifference(run.start, run.complete)}</div>}
									{!run.complete && <TimerDisplayDynamic startedAt={run.start} />}
								</div>
							</div>
							<div className="px-3 py-5 text-sm flex flex-wrap justify-center items-center min-w-[150px]">
								{run.tags.map((tag) => (
									<Tag key={tag} name={tag} />
								))}
							</div>
							<div className="py-5 text-sm text-gray-500 flex justify-center items-center min-w-[150px]">
								<WorkflowStatusTag status={workflowStatus(run)} />
							</div>
							<div className="py-5 text-sm text-gray-500 flex justify-end items-center">
								<OptionsDropdown deleteWorkflow={() => onDeleteClick(run.id)} />
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
