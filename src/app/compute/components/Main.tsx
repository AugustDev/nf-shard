"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { Dialog } from "@/components/ui/dialog"
import { NewComputeEnvironment } from "./NewComputeEnvironment"
import { ComputeEnvironment } from "@prisma/client"
import { TCreateComputeEnv } from "@/app/api/compute/create/route"
import { emitKeypressEvents } from "readline"

type ComputeEnvDer = Pick<ComputeEnvironment, "id" | "name" | "executor" | "orchestrator_endpoint">

type TProps = {
	environments: ComputeEnvDer[]
}

export const Main = (props: TProps) => {
	const [environments, setComputeEnvs] = useState<ComputeEnvDer[]>(props.environments)
	const [open, setOpen] = useState(false)

	const createComputeEnvironment = async (env: TCreateComputeEnv) => {
		if (
			env.name.length === 0 ||
			env.executor.length === 0 ||
			env.orchestrator_endpoint.length === 0 ||
			env.orchestrator_token.length === 0
		) {
			return
		}

		const response = await fetch(`/api/compute/create`, {
			body: JSON.stringify(env),
			method: "POST",
			cache: "no-store",
		})

		const computeEnvs: ComputeEnvDer[] = await response.json()
		if (computeEnvs) {
			setComputeEnvs(computeEnvs)
		}
		setOpen(false)
	}

	const deleteComputeEnvironment = async (id: number) => {
		const response = await fetch(`/api/compute/delete`, {
			body: JSON.stringify({ id }),
			method: "DELETE",
			cache: "no-store",
		})

		const computeEnvs: ComputeEnvDer[] = await response.json()
		if (computeEnvs) {
			setComputeEnvs(computeEnvs)
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="ml-auto flex items-center gap-2">
				<Button size="sm" className="h-8 gap-1" onClick={() => setOpen(true)}>
					<PlusCircle className="h-3.5 w-3.5" />
					<span className="whitespace-nowrap">Create</span>
				</Button>
				<Dialog open={open} onOpenChange={setOpen}>
					<NewComputeEnvironment close={() => {}} createComputeEnv={createComputeEnvironment} />
				</Dialog>
			</div>
			<Card x-chunk="dashboard-06-chunk-0">
				<CardHeader>
					<CardTitle>Compute Environments</CardTitle>
					<CardDescription>Compute environments are</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Executor</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{environments.map((environment) => (
								<TableRow key={environment.id}>
									<TableCell className="font-medium">{environment.name}</TableCell>
									<TableCell>{environment.executor}</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button aria-haspopup="true" size="icon" variant="ghost">
													<MoreHorizontal className="h-4 w-4" />
													<span className="sr-only">Toggle menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												{/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
												<DropdownMenuItem onClick={() => deleteComputeEnvironment(environment.id)}>
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
