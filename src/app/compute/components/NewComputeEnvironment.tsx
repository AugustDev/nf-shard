import { TCreateComputeEnv } from "@/app/api/compute/create/route"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React, { useState } from "react"

type TProps = {
	close: () => void
	createComputeEnv: (env: TCreateComputeEnv) => void
}

export const NewComputeEnvironment = ({ close, createComputeEnv }: TProps) => {
	const [name, setName] = useState<string>("")
	const [executor, setExecutor] = useState<string>("")
	const [orchestratorEndpoint, setOrchestratorEndpoint] = useState<string>("")
	const [orchestratorToken, setOrchestratorToken] = useState<string>("")

	const onSave = () => {
		createComputeEnv({
			name,
			executor,
			orchestrator_endpoint: orchestratorEndpoint,
			orchestrator_token: orchestratorToken,
		})
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>New Compute Environment</DialogTitle>
				<DialogDescription>
					Before creating a new compute environment you should first deploy and configure the <strong>shard</strong>{" "}
					orchestrator.
				</DialogDescription>
			</DialogHeader>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="env-name" className="text-right">
						Environment name
					</Label>
					<Input id="name" className="col-span-3" onChange={(e) => setName(e.target.value)} />
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="username" className="text-right">
						Executor
					</Label>
					<Select onValueChange={(e) => setExecutor(e)}>
						<SelectTrigger className="w-48">
							<SelectValue placeholder="Select executor" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="awsbatch">AWS Batch</SelectItem>
								<SelectItem value="gcpbatch">GCP Batch</SelectItem>
								<SelectItem value="float">nf-float</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="orchestrator-url" className="text-right">
						Orchestrator URL
					</Label>
					<Input id="url" className="col-span-3" onChange={(e) => setOrchestratorEndpoint(e.target.value)} />
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="orchestrator-secret" className="text-right">
						Orchestrator Secret
					</Label>
					<Input id="name" className="col-span-3" onChange={(e) => setOrchestratorToken(e.target.value)} />
				</div>
			</div>
			<DialogFooter>
				<div className="flex flex-col text-sm gap-4">
					<Button type="submit" onClick={onSave}>
						Save changes
					</Button>
				</div>
			</DialogFooter>
		</DialogContent>
	)
}
