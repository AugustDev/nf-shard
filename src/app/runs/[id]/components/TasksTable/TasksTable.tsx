import React, { useMemo } from "react"
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { Container, StatusTag, TaskStatusTag } from "@/app/components"
import { formatDuration, fullDateTime } from "@/common"
import { Task } from "@prisma/client"
import bytes from "bytes"
import { FaCaretDown } from "react-icons/fa"

type TasksTableProps = {
	tasks: Task[]
	className?: string
	onTaskClick: (task: Task) => void
}

const columnHelper = createColumnHelper<Task>()

const columns = [
	columnHelper.accessor((row) => row.data.status, {
		id: "status",
		header: "Status",
		cell: (info) => <TaskStatusTag status={info.getValue().toLowerCase()} />,
	}),
	columnHelper.accessor((row) => row.data.process, {
		id: "process",
		header: "Process",
	}),
	columnHelper.accessor((row) => row.data.duration, {
		id: "duration",
		header: "Duration",
		cell: (info) => formatDuration(info.getValue(), "ms"),
	}),
	columnHelper.accessor((row) => row.data.realtime, {
		id: "realtime",
		header: "Realtime",
		cell: (info) => formatDuration(info.getValue(), "ms"),
	}),
	columnHelper.accessor((row) => row.data.pcpu, {
		id: "pcpu",
		header: "% CPU",
	}),
	columnHelper.accessor((row) => row.data.pmem, {
		id: "pmem",
		header: "% Memory",
	}),
	columnHelper.accessor((row) => row.data.tag, {
		id: "tag",
		header: "Tag",
	}),
	columnHelper.accessor("id", {
		header: "Task Id",
	}),
	columnHelper.accessor((row) => row.data.hash, {
		id: "hash",
		header: "Hash",
	}),
	columnHelper.accessor((row) => row.data.exit, {
		id: "exit",
		header: "Exit",
	}),
	columnHelper.accessor((row) => row.data.container, {
		id: "container",
		header: "Container",
	}),
	columnHelper.accessor((row) => row.data.nativeId, {
		id: "nativeId",
		header: "Native Id",
	}),
	columnHelper.accessor((row) => row.data.submit, {
		id: "submit",
		header: "Submitted",
		cell: (info) => fullDateTime(info.getValue()),
	}),
	columnHelper.accessor((row) => row.data.peakRss, {
		id: "peakRss",
		header: "Peak RSS",
		cell: (info) => bytes(info.getValue() ?? 0),
	}),
	columnHelper.accessor((row) => row.data.peakVmem, {
		id: "peakVmem",
		header: "Peak VMEM",
		cell: (info) => bytes(info.getValue() ?? 0),
	}),
	columnHelper.accessor((row) => row.data.rchar, {
		id: "rchar",
		header: "rchar",
		cell: (info) => bytes(info.getValue()),
	}),
	columnHelper.accessor((row) => row.data.wchar, {
		id: "wchar",
		header: "wchar",
		cell: (info) => bytes(info.getValue()),
	}),
	columnHelper.accessor((row) => row.data.volCtxt, {
		id: "volCtxt",
		header: "vol_ctxt",
	}),
	columnHelper.accessor((row) => row.data.invCtxt, {
		id: "invCtxt",
		header: "inv_ctxt",
	}),
]

export const TasksTable = ({ tasks, className, onTaskClick }: TasksTableProps) => {
	const data = useMemo(() => tasks, [tasks])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<Container sectionName="Tasks" className={className}>
			<div className="overflow-x-auto">
				<table className="table-auto w-full text-black">
					<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th key={header.id} className="p-2 whitespace-nowrap">
										{header.isPlaceholder ? null : (
											<div
												className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
												onClick={header.column.getToggleSortingHandler()}
												title={
													header.column.getCanSort()
														? header.column.getNextSortingOrder() === "asc"
															? "Sort ascending"
															: header.column.getNextSortingOrder() === "desc"
															? "Sort descending"
															: "Clear sort"
														: undefined
												}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{{
													asc: " ▲",
													desc: " ▼",
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="text-sm divide-y divide-gray-100">
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onTaskClick(row.original)}>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="p-2 whitespace-nowrap">
										<div className={cell.column.id === "process" ? "text-left" : "text-center"}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</div>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Container>
	)
}
