"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pipeline } from "@prisma/client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { TComputeEnvOverride, TKVArg, computeEnvOverrides } from "@/app/pipeline/types"
import { TUpsertPipeline } from "@/app/pipeline/actions/UpsertPipeline"

type TProps = {
	pipeline?: Pipeline | null
	submitPipeline: (pipeline: TUpsertPipeline) => Promise<boolean>
}

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	description: z.string(),
	pipelineUrl: z.string().url(),
})

const defaultArgs: TKVArg[] = [
	{ id: "0", key: "--input", value: "", required: true, flag: false },
	{ id: "1", key: "-r", value: "main", required: true, flag: false },
	{ id: "2", key: "-latest", value: "", required: true, flag: true },
]

export const CreatePipeline = ({ pipeline, submitPipeline }: TProps) => {
	const router = useRouter()
	const [computeConfigOverrides, setComputeConfigOverrides] = useState<TComputeEnvOverride[]>(
		(pipeline?.compute_overrides ?? computeEnvOverrides) as TComputeEnvOverride[]
	)

	const [args, setArgs] = useState<TKVArg[]>((pipeline?.run_params ?? defaultArgs) as TKVArg[])

	const updateOverrides = (name: string, content: string) => {
		setComputeConfigOverrides(computeConfigOverrides.map((env) => (env.name === name ? { ...env, content } : env)))
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: pipeline?.name ?? "",
			description: pipeline?.description ?? "",
			pipelineUrl: pipeline?.github_url ?? "",
		},
	})

	const addArg = () => {
		const newItem: TKVArg = {
			id: Date.now().toString(),
			key: "",
			value: "",
			required: false,
			flag: false,
		}
		setArgs([...args, newItem])
	}

	const updateArg = (id: string, field: keyof TKVArg, value: string | boolean) => {
		setArgs(args.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
	}

	const deleteArg = (id: string) => {
		setArgs(args.filter((item) => item.id !== id))
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const filteredArgs = args.filter((item) => item.key !== "")

		const status = await submitPipeline({
			id: pipeline?.id,
			name: values.name,
			description: values.description,
			githubUrl: values.pipelineUrl,
			runParams: filteredArgs,
			computeOverrides: computeConfigOverrides,
		})
		if (status) {
			router.push("/launch")
		}
	}

	return (
		<Card x-chunk="dashboard-06-chunk-0">
			<CardHeader>
				<CardTitle>Add Pipeline</CardTitle>
				<CardDescription>
					Adding a pipeline to Shard allows to execute it from the UI together with the specified configuration
					settings.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="flex flex-col gap-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<div>
										<div className="grid grid-cols-4 gap-4 w-full">
											<FormLabel className="text-right pt-3">Name</FormLabel>
											<div className="w-full col-span-3">
												<FormControl>
													<Input placeholder="Pipeline name" {...field} />
												</FormControl>
												{/* <FormDescription>Name of the pipeline.</FormDescription> */}
												<FormMessage className="pt-3" />
											</div>
										</div>
									</div>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<div>
										<div className="grid grid-cols-4 gap-4 w-full">
											<FormLabel className="text-right pt-3">Description</FormLabel>
											<div className="w-full col-span-3">
												<FormControl>
													<Input placeholder="Pipeline description" {...field} />
												</FormControl>
												{/* <FormDescription>Name of the pipeline.</FormDescription> */}
												<FormMessage className="pt-3" />
											</div>
										</div>
									</div>
								)}
							/>
							<FormField
								control={form.control}
								name="pipelineUrl"
								render={({ field }) => (
									<div>
										<div className="grid grid-cols-4 gap-4 w-full">
											<FormLabel className="text-right pt-3">Github URL</FormLabel>
											<div className="w-full col-span-3">
												<FormControl>
													<Input placeholder="https://github.com/nf-core/methylseq" {...field} />
												</FormControl>
												<FormDescription>
													This is Github repository of the pipeline. It should specify root directory. If your pipeline
													is in a subdirectory, you must configure <code>-main-script</code> and <code>-entry</code>{" "}
													arguments later.
												</FormDescription>
												<FormMessage className="pt-3" />
											</div>
										</div>
									</div>
								)}
							/>
						</div>

						<Separator />

						<div>
							<p className="font-medium text-md">Run Parameters</p>
							<p className="text-sm text-muted-foreground">
								Specify parameters template used in the pipeline. The parameters will require to be provided by the
								operator when executing the pipeline. You can specify default values. <code>Required</code> implies that
								a non-empty value needs to be provided during the job submission. <code>Flag</code> implies that the
								parameter does not accept a value, like <code>-resume</code> or <code>-latest</code>.
							</p>
							<div className="">
								<div className="space-y-4 pt-4">
									{args.map((item) => (
										<div key={item.id} className="flex space-x-2 items-center">
											<Input
												placeholder="Key"
												value={item.key}
												onChange={(e) => updateArg(item.id, "key", e.target.value)}
												className="w-1/3"
											/>
											<div className={`w-1/3 ${item.flag ? "invisible" : "visible"}`}>
												<Input
													placeholder="Value"
													value={item.value}
													onChange={(e) => updateArg(item.id, "value", e.target.value)}
													className="w-full"
													disabled={item.flag}
												/>
											</div>
											<div className="grid grid-col-1 gap-1">
												<div className="flex items-center space-x-2">
													<Checkbox
														id={`required-${item.id}`}
														checked={item.required}
														onCheckedChange={(checked) => updateArg(item.id, "required", checked as boolean)}
													/>
													<label
														htmlFor={`required-${item.id}`}
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													>
														Required
													</label>
												</div>
												<div className="flex items-center space-x-2">
													<Checkbox
														id={`flag-${item.id}`}
														checked={item.flag}
														onCheckedChange={(checked) => updateArg(item.id, "flag", checked as boolean)}
													/>
													<label
														htmlFor={`flag-${item.id}`}
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													>
														Flag
													</label>
												</div>
											</div>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => deleteArg(item.id)}
												disabled={args.length === 1}
											>
												<X className="h-4 w-4" />
											</Button>
										</div>
									))}
									<Button
										variant="outline"
										onClick={(e) => {
											e.preventDefault()
											addArg()
										}}
									>
										New Parameter
									</Button>
								</div>
							</div>
						</div>

						<Separator />

						<div>
							<p className="font-medium text-md">Compute Environment Overrides</p>
							<p className="text-sm text-muted-foreground">
								Some compute environments may require additional configuration. You can override the default here. Shard
								will handle implementation behind the scenes.
							</p>

							<Tabs defaultValue="awsbatch" className="pt-4 w-full">
								<TabsList>
									{computeConfigOverrides.map((env) => (
										<TabsTrigger key={env.name} className="data-[state=active]:bg-white" value={env.name}>
											{env.name}
										</TabsTrigger>
									))}
								</TabsList>
								{computeConfigOverrides.map((env) => (
									<TabsContent key={env.name} value={env.name}>
										<Textarea
											onChange={(e) => updateOverrides(env.name, e.target.value)}
											rows={10}
											placeholder="process {}"
											value={env.content}
										/>
									</TabsContent>
								))}
							</Tabs>
						</div>
						<Separator />
						<Button type="submit">Save</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
