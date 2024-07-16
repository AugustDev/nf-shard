"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ComputeEnvironment, Pipeline } from "@prisma/client"
import { FaCheckCircle, FaGithub, FaTimes } from "react-icons/fa"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { TKVArg } from "@/app/pipeline/types"
import { CodeText } from "@/app/runs/[id]/components/BashCode/CodeText"
import { FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type TProps = {
	pipeline: Pipeline
	computeEnvs: ComputeEnvironment[]
}

export const LaunchPipeline = ({ pipeline, computeEnvs }: TProps) => {
	const [runParams, setRunParams] = useState<TKVArg[]>(pipeline.run_params as TKVArg[])
	const [nextflowCommand, setNextflowCommand] = useState<string>("")

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
						<p className="text-sm text-muted-foreground">{pipeline.description}</p>

						<Separator />

						<div className="flex flex-row items-center gap-4">
							<Label htmlFor="username" className="text-left">
								Compute Environment
							</Label>
							<Select onValueChange={(e) => e}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select Compute Environment" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{computeEnvs.map((env) => (
											<SelectItem value={String(env.id)}>{env.name}</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
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

						<div className="text-right">
							<Button>Launch</Button>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<div className="text-xs text-muted-foreground">
						{/* <strong>{pipelines.length}</strong> {pipelines.length === 1 ? "pipeline" : "pipelines"} */}
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
