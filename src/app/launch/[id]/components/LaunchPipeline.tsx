"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ComputeEnvironment, Pipeline } from "@prisma/client"
import { FaCheckCircle, FaGithub, FaTimes } from "react-icons/fa"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { TKVArg } from "@/app/pipeline/types"
import { CodeText } from "@/app/runs/[id]/components/BashCode/CodeText"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import confetti from "canvas-confetti"
import { Spinner } from "@/app/components/Spinner/Spinner"
import { useQuery, useSubscription } from "urql"
import { Log, RunJobDocument, StatusCheckDocument, StreamLogsDocument } from "@/generated/graphql/graphql"
import { useMutationWithContext } from "@/common/urql"
import { LogsContainer } from "@/app/components/LogsContainer/LogsContainer"
import { uniqueNamesGenerator, Config, adjectives, animals, names } from "unique-names-generator"

const extraNames = [
	"ravi",
	"solanki",
	"augustinas",
	"malinauskas",
	"jay",
	"ganbat",
	"christoforos",
	"nalmpantis",
	"hannah",
	"thompson",
	"maxence",
	"lam",
	"robert",
	"pouya",
	"yanki",
	"yangi",
	"arif",
	"surani",
	"ben",
	"fredericka",
	"luccas",
	"husam",
	"jonathan",
	"wan",
	"tim",
]
const customConfig: Config = {
	dictionaries: [adjectives, [...animals, ...names, ...extraNames]],
	separator: "-",
	length: 2,
}

type TProps = {
	pipeline: Pipeline
	computeEnvs: ComputeEnvironment[]
	createProcessKey: (processKey: string, executor: string, runName: string, computeEnvironmentId: number) => void
}

const validateKVArg = (arg: TKVArg) => {
	if (arg.flag === true) {
		return true
	}

	if (arg.required && arg.value !== "") {
		return true
	}

	if (!arg.required) {
		return true
	}

	return false
}

enum SubmissionStatus {
	Idle = 0,
	Loading = 1,
	Submitted = 2,
	Failed = 3,
}

export const LaunchPipeline = ({ pipeline, computeEnvs, createProcessKey }: TProps) => {
	const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(SubmissionStatus.Idle)
	const [submissionError, setSubmissionError] = useState<string | null>(null)
	const [selectedComputeEnv, setSelectedComputeEnv] = useState<ComputeEnvironment | null>(null)
	const [computeEnvStatus, setComputeEnvStatus] = useState<{ status?: boolean; message?: string }>({
		status: undefined,
	})
	const [runName, setRunName] = useState<string>("")
	const [runParams, setRunParams] = useState<TKVArg[]>(pipeline.run_params as TKVArg[])
	const [nextflowCommand, setNextflowCommand] = useState<string>("")
	const [_, runJobMutation] = useMutationWithContext(RunJobDocument)
	const [result, executeHealthQuery] = useQuery({ query: StatusCheckDocument, pause: true })
	const [newLogSub] = useSubscription({
		query: StreamLogsDocument,
		variables: { runName: runName },
	})
	const [logs, setLogs] = useState<Log[]>([])

	useEffect(() => {
		if (result.data) {
			setComputeEnvStatus({ status: true, message: "" })
		}

		if (result.error) {
			setComputeEnvStatus({ status: false, message: result.error.message })
		}
	}, [result, executeHealthQuery])

	useEffect(() => {
		console.log("sub")
		if (newLogSub.data) {
			const log = newLogSub.data.streamLogs
			setLogs((prev) => [...prev, log])
			console.log(log)
		}
	}, [newLogSub, runName])

	const validRunParams = runParams.filter(validateKVArg).filter((item) => item.value !== "" && !item.flag)

	const showLaunchButton = useMemo(() => {
		if (selectedComputeEnv === null) {
			return false
		}

		if (runParams.filter((item) => !validateKVArg(item)).length != 0) {
			return false
		}

		if (!computeEnvStatus.status) {
			return false
		}

		return true
	}, [runParams, selectedComputeEnv, computeEnvStatus])

	const checkHealth = async () => {
		if (!selectedComputeEnv) {
			return
		}

		executeHealthQuery({
			url: `${selectedComputeEnv.orchestrator_endpoint}/query`,
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${selectedComputeEnv.orchestrator_token}`,
				},
			},
		})
	}

	useEffect(() => {
		checkHealth()
	}, [selectedComputeEnv])

	const launch = async () => {
		if (selectedComputeEnv === null) {
			return
		}

		const params = validRunParams.map((item) => ({
			key: item.key,
			value: item.value,
			isFlag: item.flag,
		}))

		const computeOverride: string =
			pipeline.compute_overrides.find((item: any) => item.name === selectedComputeEnv.executor)?.content ?? ""

		try {
			setSubmissionStatus(SubmissionStatus.Loading)

			const runName: string = uniqueNamesGenerator(customConfig)
			setRunName(runName)
			setLogs([])

			const res = await runJobMutation(
				{
					command: {
						runName: runName,
						pipelineUrl: pipeline.github_url,
						executor: {
							name: selectedComputeEnv.executor,
							computeOverride: computeOverride,
						},
						parameters: params,
					},
				},
				{
					url: `${selectedComputeEnv.orchestrator_endpoint}/query`,
					token: `${selectedComputeEnv.orchestrator_token}`,
				}
			)

			if (res.data) {
				createProcessKey(
					res.data.runJob.processKey,
					res.data.runJob.executor,
					res.data.runJob.runName,
					selectedComputeEnv.id
				)

				setSubmissionStatus(SubmissionStatus.Submitted)

				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.6 },
				})
			}

			if (res.error) {
				setSubmissionStatus(SubmissionStatus.Failed)
				setSubmissionError(res.error.message)
			}
		} catch (error) {
			setSubmissionStatus(SubmissionStatus.Failed)
			setSubmissionError((error as Error).message)
			console.error(error)
		}
	}

	const updateRunParam = (id: string, field: keyof TKVArg, value: string | boolean) => {
		setRunParams(runParams.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
	}

	useEffect(() => {
		const command = `nextflow run ${pipeline.github_url} `
		const args = runParams
			.filter((item) => validateKVArg(item))
			.filter((item) => item.value !== "")
			.map((item) => {
				if (item.flag) {
					return `${item.key}`
				} else {
					return `${item.key} ${item.value}`
				}
			})
		const full = `${command} ${args.join(" \\\n")}`
		setNextflowCommand(full)
	}, [pipeline, runParams])

	return (
		<div>
			<Card x-chunk="dashboard-06-chunk-0">
				<CardContent>
					<div className="space-y-8 pt-8">
						<div className="flex flex-row items-center">
							<h3 className="text-2xl font-semibold leading-none tracking-tight grow">{pipeline.name}</h3>
							<div className="flex flex-row gap-2 items-center font-medium text-sm">
								<FaGithub className="h-6 w-h text-gray-400" aria-hidden="true" />{" "}
								<Link className="hover:underline" target="_blank" href={pipeline.github_url}>
									{pipeline.github_url.replace("https://", "")}
								</Link>
							</div>
						</div>
						<p className="text-sm text-muted-foreground whitespace-pre">{pipeline.description}</p>

						<Separator />

						<div className="flex flex-row items-center gap-4">
							<Label htmlFor="username" className="text-left">
								Compute Environment
							</Label>
							<Select
								onValueChange={(value) => {
									const selectedEnv = computeEnvs.find((env) => String(env.id) === value)
									setSelectedComputeEnv(selectedEnv || null)
								}}
								value={selectedComputeEnv?.id.toString()}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select Compute Environment" />
								</SelectTrigger>
								<SelectContent>
									{computeEnvs.map((env) => (
										<SelectItem key={env.id} value={env.id.toString()}>
											{env.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<div>
								{computeEnvStatus.status ? (
									<FaCheckCircle className="w-5 h-5" />
								) : (
									<FaTimes className="w-5 h-5 text-red-600" />
								)}
							</div>
						</div>

						<div>
							<p className="font-medium text-md">Run Parameters</p>
							<div className="space-y-4 pt-4">
								{runParams.map((item) => (
									<div key={item.id} className="flex space-x-2 items-center">
										<Input placeholder="Key" value={item.key} onChange={() => 0} className="w-2/5" disabled={true} />
										<div className={`w-2/5 ${item.flag ? "invisible" : "visible"}`}>
											<Input
												placeholder="Value"
												value={item.value}
												onChange={(e) => updateRunParam(item.id, "value", e.target.value)}
												className="w-full"
											/>
										</div>
										<div className="w-1/5 text-center">
											{validateKVArg(item) ? (
												<FaCheckCircle className="w-5 h-5" />
											) : (
												<FaTimes className="w-5 h-5 text-red-600" />
											)}
										</div>
									</div>
								))}
							</div>
						</div>
						<Separator />
						<div>
							<p className="font-medium text-md">Nextflow preview</p>
							<CodeText className="mt-4" code={nextflowCommand} />
						</div>

						<Separator />

						{submissionStatus === SubmissionStatus.Loading && (
							<div className="flex justify-end">
								<div className="text-right">
									<div className="flex flex-col items-center">
										<Spinner />
										<div className="text-sm pt-2">Simulating...</div>
									</div>
								</div>
							</div>
						)}

						{submissionStatus === SubmissionStatus.Submitted && (
							<Alert>
								<Terminal className="h-4 w-4" />
								<AlertTitle>Job Submitted!</AlertTitle>
								<AlertDescription>
									Your job should soon be visible in the{" "}
									<Link className="hover:underline" href={"/runs"}>
										Runs list
									</Link>
									. Float jobs may take up to 5 minutes to appear.{" "}
									<span
										className="underline hover:cursor-pointer"
										onClick={() => {
											setSubmissionStatus(SubmissionStatus.Idle)
											setLogs([])
										}}
									>
										Run another job.
									</span>
								</AlertDescription>
							</Alert>
						)}

						{computeEnvStatus?.status === false && (
							<Alert variant={"destructive"}>
								<Terminal className="h-4 w-4" />
								<AlertTitle>Could not access compute environment</AlertTitle>
								<AlertDescription>{computeEnvStatus.message}</AlertDescription>
							</Alert>
						)}

						{submissionStatus === SubmissionStatus.Failed && (
							<Alert variant={"destructive"}>
								<Terminal className="h-4 w-4" />
								<AlertTitle>Failed to submit job</AlertTitle>
								<AlertDescription>{submissionError}</AlertDescription>
							</Alert>
						)}

						{logs.length > 0 && <LogsContainer logs={logs} />}

						{(submissionStatus === SubmissionStatus.Idle || submissionStatus == SubmissionStatus.Failed) &&
							showLaunchButton && (
								<div className="text-right">
									<Button onClick={() => launch()}>Launch</Button>
								</div>
							)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
