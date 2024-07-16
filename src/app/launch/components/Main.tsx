"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pipeline } from "@prisma/client"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { IoMdPlay } from "react-icons/io"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type TProps = {
	pipelines: Pipeline[]
	deletePipeline: (id: string) => Promise<any>
}

export const Main = ({ deletePipeline, pipelines }: TProps) => {
	const router = useRouter()
	return (
		<div className="flex flex-col gap-4">
			<div className="ml-auto flex items-center gap-2">
				<Link href="/compute">
					<Button size="sm" className="h-8 gap-1">
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Compute Environments</span>
					</Button>
				</Link>
				<Link href="/pipeline/create">
					<Button size="sm" className="h-8 gap-1">
						<PlusCircle className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Pipeline</span>
					</Button>
				</Link>
			</div>
			<Card x-chunk="dashboard-06-chunk-0">
				<CardHeader>
					<CardTitle>Launchpad</CardTitle>
					<CardDescription>
						Launch a pipeline run by selecting your pipeline template. Pipeline is identified by the pipeline
						repository, compute environment and run configuration.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Launch</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>id</TableHead>
								<TableHead>Description</TableHead>
								<TableHead>Repository</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{pipelines.map((pipeline) => (
								<TableRow key={pipeline.id}>
									<TableCell>
										<Button variant="ghost" size="icon">
											<IoMdPlay className="h-4 w-4" />
										</Button>
									</TableCell>
									<TableCell className="font-medium">{pipeline.name}</TableCell>
									<TableCell className="font-normal">{pipeline.description}</TableCell>
									<TableCell className="font-normal">{pipeline.id}</TableCell>
									<TableCell>
										<Badge variant="outline">{pipeline.github_url}</Badge>
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button aria-haspopup="true" size="icon" variant="ghost">
													<MoreHorizontal className="h-4 w-4" />
													<span className="sr-only">Toggle menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuItem onClick={() => router.push(`/pipeline/${pipeline.id}`)}>
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => {
														deletePipeline(pipeline.id)
														router.refresh()
													}}
												>
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
				<CardFooter>
					<div className="text-xs text-muted-foreground">
						<strong>{pipelines.length}</strong> {pipelines.length === 1 ? "pipeline" : "pipelines"}
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
