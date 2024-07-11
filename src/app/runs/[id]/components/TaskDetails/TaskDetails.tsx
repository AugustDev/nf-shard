import { Container } from "@/app/components"
import { Task } from "@prisma/client"
import React from "react"
import { CodeText } from ".."
import { formatDuration, fullDateTime } from "@/common"
import bytes from "bytes"
import Link from "next/link"

type TaskDetailsProps = {
	task: Task
}

export const TaskDetails = ({ task }: TaskDetailsProps) => {
	console.log(task.id)
	return (
		<div className="text-black">
			{task.data.executor === "float" && (
				<div className="mb-4">
					<Link
						target="_blank"
						href={`${process.env.NEXT_PUBLIC_MMC_CLOUD_BASE_URL}/#/opcenter/jobs/${task.data.nativeId}`}
					>
						<button
							type="button"
							className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm text-indigo-600 shadow-sm hover:bg-indigo-100"
						>
							Open in MMCloud
						</button>
					</Link>
				</div>
			)}
			<div>
				<div className="text-lg">Name</div>
				<CodeText code={`${task.data.process} ${task.data.name}`} />
			</div>

			<div className="pt-6">
				<div className="text-lg">Command</div>
				<CodeText code={task.data.script ?? ""} />
			</div>

			<div className="pt-6">
				<div className="text-lg">Status</div>
				<CodeText code={`Exit: ${task.data.exit}\nStatus: ${task.data.status}\nAttempts ${task.data.attempt ?? 0}`} />
				<div className="text-sm"></div>
			</div>

			<div className="pt-6">
				<div className="text-lg">Work directory</div>
				<CodeText code={task.data.workdir ?? ""} />
				<div className="text-sm"></div>
			</div>

			{task.data.env && (
				<div className="pt-6">
					<div className="text-lg">Environment</div>
					<CodeText code={task.data.env} />
				</div>
			)}

			<div className="text-lg pt-6">Execution time</div>
			<div className="overflow-x-auto pt-4">
				<table className="table-auto w-full">
					<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
						<tr>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-left">Label</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-left">Value</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-left">Description</div>
							</th>
						</tr>
					</thead>
					<tbody className="text-sm divide-y divide-gray-100">
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Submit</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left"> {fullDateTime(task.data.submit)}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Timestamp when the task has been submitted</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Start</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left"> {fullDateTime(task.data.start)}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Timestamp when the task execution has started</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Complete</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left"> {fullDateTime(task.data.complete)}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Timestamp when task execution has completed</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Duration</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left"> {formatDuration(task.data.duration, "ms")}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">
									Time elapsed to complete since the submission i.e. including scheduling time
								</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Realtime</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left"> {formatDuration(task.data.realtime, "ms")}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Task script execution time</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="text-lg pt-6">Resources requested</div>
			<div className="overflow-x-auto pt-4">
				<table className="table-auto w-full">
					<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
						<tr>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-left">Label</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-left">Value</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-left">Description</div>
							</th>
						</tr>
					</thead>
					<tbody className="text-sm divide-y divide-gray-100">
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Container</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{task.data.container}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Container image name used to execute the task</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Queue</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{task.data.queue ?? "-"}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">The queue that the executor attempted to run the process on</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">CPUs</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{task.data.cpus}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">The cpus number request for the task execution</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Memory</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{bytes(task.data.memory, { unitSeparator: " " })}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">The memory request for the task execution</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Disk</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{task.data.disk ?? "-"}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">The disk space request for the task execution</div>
							</td>
						</tr>
						{task.data.time && (
							<tr>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">Time</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left"> {task.data.time}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">The time request for the task execution</div>
								</td>
							</tr>
						)}
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Executor</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left"> {task.data.executor ?? "-"}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">The Nextflow executor used to carry out this task</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Machine Type</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left"> {task.data.machineType ?? "-"}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">The virtual machine type used to carry out by this task</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Cloud Zone</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left"> {task.data.cloudZone ?? "-"}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">The cloud zone where the job get executed</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Price model</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left"> {task.data.priceModel ?? "-"}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">The price model used to charge the job computation</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="text-lg pt-6">Resources usage</div>
			<div className="overflow-x-auto pt-4">
				<table className="table-auto w-full">
					<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
						<tr>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-left">Label</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-left">Value</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-left">Description</div>
							</th>
						</tr>
					</thead>
					<tbody className="text-sm divide-y divide-gray-100">
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">pCPU</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{task.data.pcpu}%</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Percentage of CPU used by the process</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">RSS</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{bytes(task.data.rss, { unitSeparator: " " })}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Real memory (resident set) size of the process</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Peak RSS</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{bytes(task.data.peakRss ?? 0, { unitSeparator: " " })}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Peak of real memory</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">vMem</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{bytes(task.data.vmem, { unitSeparator: " " })}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Virtual memory size of the process</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Peak vMem</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{bytes(task.data.peakVmem ?? 0, { unitSeparator: " " })}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Peak of virtual memory</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">rchar</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{bytes(task.data.rchar, { unitSeparator: " " })}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">
									Number of bytes the process read, using any read-like system call from files, pipes, tty, etc
								</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">wchar</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{bytes(task.data.wchar, { unitSeparator: " " })}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Number of bytes the process wrote, using any write-like system call.</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Read Bytes</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{bytes(task.data.readBytes, { unitSeparator: " " })}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Number of bytes the process directly read from disk</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Write Bytes</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{bytes(task.data.writeBytes, { unitSeparator: " " })}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">
									Number of bytes the process originally dirtied in the page-cache (assuming they will go to disk
									later).
								</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">syscr</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{bytes(task.data.syscr, { unitSeparator: " " })}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Number of read-like system call invocations that the process performed</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">syscw</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">{bytes(task.data.syscw, { unitSeparator: " " })}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Number of write-like system call invocations that the process performed</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">volCtxt</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left"> {task.data.volCtxt}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Number of voluntary context switches</div>
							</td>
						</tr>
						<tr>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">volCtxt</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left"> {task.data.invCtxt}</div>
							</td>
							<td className="p-2 whitespace-nowrap">
								<div className="text-left">Number of involuntary context switches</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}
