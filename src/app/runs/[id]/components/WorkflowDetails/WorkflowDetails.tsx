"use client"

import { AnimatedIcon, Modal, Spinner } from "@/app/components"
import { WorkflowStatus } from "@common/index"
import { FaCircleCheck } from "react-icons/fa6"
import { MdCancel } from "react-icons/md"

import { clsx } from "clsx"
import { CodeText } from ".."
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { ComputeEnvironment, ProcessKeys } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { TerminateJobDocument } from "@/generated/graphql/graphql"
import { useMutationWithContext } from "@/common/urql"

type WorkflowDetailsProps = {
	runName: string
	projectName: string
	workflowName: string
	className?: string
	status: WorkflowStatus
	errorMessage?: string | null
	exitStatus: number | null
	errorReport?: string | null
	processKey?: ProcessKeys | null
}

export const WorkflowDetails = (props: WorkflowDetailsProps) => {
	const [terminateWorkflow, setTerminateWorkflow] = useState<boolean>(false)
	const [_, terminateJobMutation] = useMutationWithContext(TerminateJobDocument)

	const stopProcess = async () => {
		if (!props.processKey) {
			return
		}

		const computeEnv: ComputeEnvironment = (props.processKey as any).computeEnvironment
		const body = {
			process_id: props.processKey.processKey,
			executor: props.processKey.executor,
		}

		try {
			terminateJobMutation(
				{
					command: {
						processKey: props.processKey.processKey,
						executor: props.processKey.executor,
					},
				},
				{
					url: `${computeEnv.orchestrator_endpoint}/query`,
					token: `${computeEnv.orchestrator_token}`,
				}
			)

			console.log("stopping process key", props.processKey)
		} catch (error) {
			console.log(props.processKey)
			console.error(error)
		}

		setTerminateWorkflow(false)
	}

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

				<div className="flex flex-row items-center justify-between w-full">
					<div className="flex flex-col items-start">
						<div className="font-medium text-xl text-black">
							<div>{props.runName}</div>
						</div>
						<div className="font-medium text-sm text-gray-500">
							{props.workflowName} {props.projectName}
						</div>
					</div>
					{props.status == WorkflowStatus.RUNNING && props.processKey?.executor !== "float" && (
						<Button variant="destructive" onClick={() => setTerminateWorkflow(true)}>
							Stop
						</Button>
					)}
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

			<Modal open={terminateWorkflow} setOpen={setTerminateWorkflow}>
				<div>
					<div className="text-center">
						<div className="mt-2 text-left">
							<p className="text-md text-black">Terminate run?</p>
							<p className="text-xs text-black">Termination is irreversible.</p>
						</div>
					</div>
				</div>
				<div className="mt-5 ">
					<button
						type="button"
						className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
						onClick={stopProcess}
					>
						Terminate
					</button>
				</div>
			</Modal>
		</div>
	)
}
