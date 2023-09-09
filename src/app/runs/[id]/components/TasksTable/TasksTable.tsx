import { Container, StatusTag, TaskStatusTag } from "@/app/components"
import { formatDuration, fullDateTime } from "@/common"
import { Task } from "@prisma/client"
import bytes from "bytes"

type TasksTableProps = {
	tasks: Task[]
	className?: string
	onTaskClick: (task: Task) => void
}

export const TasksTable = ({ tasks, className, onTaskClick }: TasksTableProps) => {
	return (
		<Container sectionName="Tasks" className={className}>
			<div className="overflow-x-auto">
				<table className="table-auto w-full text-black">
					<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
						<tr>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">Status</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-left">Process</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-left">Tag</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-left">Task Id</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">Hash</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">Exit</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">Container</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">Native Id</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">Submitted</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">Duration</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">Realtime</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">% CPU</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">% Memory</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">Peak RSS</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">Peak VMEM</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">rchar</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">wchar</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">vol_ctxt</div>
							</th>
							<th className="p-2 whitespace-nowrap">
								<div className="font-semibold text-center">inv_ctxt</div>
							</th>
						</tr>
					</thead>
					<tbody className="text-sm divide-y divide-gray-100">
						{tasks.map((task) => (
							<tr key={task.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onTaskClick(task)}>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">
										<TaskStatusTag status={task.data.status.toLowerCase()} />
									</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">{task.data.process}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">{task.data.tag}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">{task.id}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">{task.data.hash}</div>
								</td>

								<td className="p-2 whitespace-nowrap">
									<div className="text-left">{task.data.exit}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">{task.data.container}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">{task.data.nativeId}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">{fullDateTime(task.data.submit)}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">{formatDuration(task.data.duration, "ms")}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">{formatDuration(task.data.realtime, "ms")}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">{task.data.pcpu}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-center">{task.data.pmem}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-center">{bytes(task.data.peakRss ?? 0)}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-center">{bytes(task.data.peakVmem ?? 0)}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-center">{bytes(task.data.rchar)}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-center">{bytes(task.data.wchar)}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-center">{task.data.volCtxt}</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-center">{task.data.invCtxt}</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Container>
	)
}
