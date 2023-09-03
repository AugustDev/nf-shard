"use client"

import { AnimatedIcon, Spinner } from "@/app/components"
import { WorkflowStatus } from "@common/index"
import { FaCircleCheck } from "react-icons/fa6"
import { MdCancel } from "react-icons/md"

import { clsx } from "clsx"
import { CodeText } from ".."
import { AiOutlineLoading3Quarters } from "react-icons/ai"

type WorkflowDetailsProps = {
	runName: string
	projectName: string
	workflowName: string
	className?: string
	status: WorkflowStatus
	errorMessage?: string | null
	exitStatus: number | null
	errorReport?: string | null
}

export const WorkflowDetails = (props: WorkflowDetailsProps) => {
	return (
		<div className={clsx("bg-white py-8 px-8 rounded-md shadow-sm ring-1 ring-gray-900/5", props.className)}>
			<div className="flex flex-row items-center">
				{props.status == WorkflowStatus.SUCCESS && (
					<FaCircleCheck className="h-10 w-10 text-green-500 mr-4" aria-hidden="true" />
				)}
				{props.status == WorkflowStatus.RUNNING && (
					<AnimatedIcon className="mr-4">
						<AiOutlineLoading3Quarters className="h-8 w-8 flex-shrink-0 text-indigo-700" />
					</AnimatedIcon>
				)}
				{(props.status == WorkflowStatus.FAILED || props.status == WorkflowStatus.FAILED_TIMEOUT) && (
					<MdCancel className="h-10 w-10 text-red-500 mr-4" aria-hidden="true" />
				)}

				<div className="flex flex-col items-end">
					<div className="font-medium text-2xl pr-4 text-black">
						<div>{props.runName}</div>
					</div>
					<div className="font-medium text-xl pr-4 text-gray-500">
						{props.workflowName} {props.projectName}
					</div>
				</div>
			</div>

			{props.errorReport && (
				<div className="rounded-md bg-red-50 p-4 mt-8">
					<div className="ml-3">
						<h3 className="text-sm font-medium text-red-800">Workflow failed</h3>
						<div className="mt-2 text-sm text-red-700">
							{props.errorMessage && <p>{props.errorMessage}</p>}
							{props.exitStatus && <p>{props.exitStatus}</p>}
							<CodeText className="w-full" code={props.errorReport} />
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
