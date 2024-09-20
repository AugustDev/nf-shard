"use client"

import { toast } from "react-hot-toast"
import { ProcessKeys, Progress, Task, Workflow, Workspace } from "@prisma/client"
import {
	AggregateStats,
	CodeText,
	Configuration,
	DataViewer,
	General,
	MentionedResources,
	MetricsOverview,
	Processes,
	Status,
	TaskDetails,
	TasksTable,
	Utilisation,
	WorkflowDetails,
} from ".."
import { Tabs } from "@/app/components/Tabs/Tabs"
import { RunResponse } from "@/app/api/runs/[id]/types"
import { useEffect, useMemo, useRef, useState } from "react"
import { SlideOver } from "@/app/components"
import { workflowStatus } from "@/common/index"
import { LogsContainer } from "@/app/components/LogsContainer/LogsContainer"
import { useSubscription } from "urql"
import { Log, StreamLogsDocument } from "@/generated/graphql/graphql"

type PageProps = {
	workflow: Workflow
	tasks: Task[]
	progress?: Progress | null
	workspace?: Workspace | null
	processsKey?: ProcessKeys | null
}

export const MainRun = (props: PageProps) => {
	const [workflow, setWorkflow] = useState<Workflow>(props.workflow)
	const [tasks, setTasks] = useState<Task[]>(props.tasks)
	const [progress, setProgress] = useState<Progress | undefined | null>(props.progress)
	const tasksRef = useRef<Task[]>()
	const shouldPoll = useRef<boolean>(true)
	const [selectedTask, setselectedTask] = useState<Task | undefined>()
	const [newLogSub] = useSubscription({
		query: StreamLogsDocument,
		variables: { runName: workflow.runName },
	})
	const [logs, setLogs] = useState<Log[]>([])

	const status = useMemo(() => {
		return workflowStatus(workflow)
	}, [workflow])

	const fetchData = async () => {
		if (workflow.complete) {
			shouldPoll.current = false
			return
		}

		const response = await fetch(`/api/runs/${workflow.id}`, {
			cache: "no-store",
		})
		const result: RunResponse = await response.json()

		setWorkflow(result.workflow)
		setTasks(result.tasks)
		setProgress(result.progress)

		if (result.workflow.complete) {
			shouldPoll.current = false
		}
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (shouldPoll.current) {
				fetchData()
			}
		}, 5000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	useEffect(() => {
		const previousTasks = tasksRef.current
		if (previousTasks) {
			tasks.forEach((currentTask) => {
				const prevTask = previousTasks.find((t) => t.id === currentTask.id)

				if (!prevTask) {
					return
				}

				if (prevTask.data.status === "RUNNING" && currentTask.data.status === "COMPLETED") {
					toast.success(<div className="text-xs font-medium">{currentTask.data.name} completed</div>, {
						duration: 6000,
					})
				}
			})
		}

		tasksRef.current = tasks
	}, [tasks])

	useEffect(() => {
		console.log("sub", newLogSub)
		if (newLogSub.data) {
			const log = newLogSub.data.streamLogs
			setLogs((prev) => [...prev, log])
			console.log(log.message)
		}
	}, [newLogSub, workflow.runName])

	const tabs = [
		{
			name: "Command",
			content: <CodeText code={workflow?.commandLine || ""} />,
		},
		{
			name: "Parameters",
			content: <DataViewer data={workflow?.params || ""} />,
		},
		{
			name: "Configuration",
			content: <Configuration files={workflow?.configFiles || []} configText={workflow?.configText || ""} />,
		},
		{
			name: "Resources",
			content: <MentionedResources data={workflow?.params} />,
		},
		{
			name: "Logs",
			content: <LogsContainer logs={logs} />,
		},
	]
	return (
		<>
			<SlideOver
				open={!!selectedTask}
				setOpen={function (status: Boolean): void {
					setselectedTask(undefined)
				}}
			>
				<>{selectedTask && <TaskDetails task={selectedTask} />}</>
			</SlideOver>

			<WorkflowDetails
				runName={workflow?.manifest.description || ""}
				workflowName={workflow?.runName || ""}
				projectName={workflow.projectName}
				className="mb-12"
				status={status}
				errorMessage={workflow.errorMessage}
				exitStatus={workflow.exitStatus}
				errorReport={workflow.errorReport}
				processKey={props.processsKey}
			/>

			<Tabs tabs={tabs} className="py-5 px-5" panelClassName="max-h-96" />

			<div className="md:grid md:grid-cols-2 md:gap-4 pt-8 grid-cols-1">
				{progress && <Status progress={progress} />}
				<AggregateStats tasks={tasks} completedAt={workflow.complete} startedAt={workflow.start} />
			</div>

			<div className="md:grid md:grid-cols-2 md:gap-4 pt-8 grid-cols-1">
				<div>
					<General workflow={workflow} workspace={props.workspace} />
				</div>
				<div>
					<Utilisation
						tasks={tasks}
						peakCpus={workflow?.stats?.peakCpus ?? 0}
						loadCpus={workflow?.stats?.loadCpus ?? 0}
					/>
				</div>
			</div>

			<div className="pt-8">
				<div>{progress && <Processes processes={progress.processes} />}</div>
			</div>

			{tasks.length > 0 && <TasksTable tasks={tasks} className="mt-8" onTaskClick={setselectedTask} />}

			{workflow.metrics.length > 0 && <MetricsOverview className="mt-8 h-full" metrics={workflow.metrics} />}
		</>
	)
}
