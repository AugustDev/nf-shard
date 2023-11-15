"use client"

import { TimerDisplayDynamic, WorkflowStatusTag } from "@/app/components"
import { formatDifference, fullDateTime, workflowStatus } from "@/common"
import { Workflow } from "@prisma/client"
import InfiniteScroll from "react-infinite-scroll-component"

import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"

import { OptionsDropdown } from "../OptionsDropdown"
import Link from "next/link"
import React from "react"
import { TPageInfo } from "@/app/api/search/types"

type RunsTableProps = {
	runs: Workflow[]
	className?: string
	onDeleteClick: (id: string) => void
	fetchMoreData: () => void
	pageInfo: TPageInfo
}

export const RunsTable: React.FC<RunsTableProps> = ({
	runs,
	className,
	onDeleteClick,
	fetchMoreData,
	pageInfo,
}: RunsTableProps) => {
	const columns: ColumnsType<Workflow> = [
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			width: 300,
			render: (_, run) => (
				<Link className="text-black" href={`runs/${run.id}`}>
					{run.manifest.description}
				</Link>
			),
		},
		{
			title: "Project",
			dataIndex: "project",
			key: "project",
			width: 200,
			render: (_, run) => (
				<div>
					<div className="font-medium text-gray-900">
						<Link className="text-black" href={`runs/${run.id}`}>
							{run.runName}
						</Link>
					</div>
					<div className="mt-1 text-gray-500">{run.projectName}</div>
				</div>
			),
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			width: 200,
			render: (_, run) => (
				<div>
					<div className="font-medium text-gray-900">{fullDateTime(run.start)}</div>
					<div className="mt-1">
						{run.complete && <div>{formatDifference(run.start, run.complete)}</div>}
						{!run.complete && <TimerDisplayDynamic startedAt={run.start} />}
					</div>
				</div>
			),
		},
		{
			title: "Tags",
			key: "tags",
			dataIndex: "tags",
			width: 200,
			render: (_, { tags }) => (
				<>
					{tags.map((tag) => (
						<span
							key={tag}
							className="inline-flex items-center rounded-md bg-gray-100 px-1.5 py-0.5 mr-1 mb-0.5 text-xs font-medium text-gray-600"
						>
							{tag}
						</span>
					))}
				</>
			),
		},
		{
			title: "Status",
			key: "status",
			dataIndex: "status",
			width: 150,
			render: (_, run) => <WorkflowStatusTag status={workflowStatus(run)} />,
		},
		{
			title: "Options",
			key: "options",
			dataIndex: "options",
			width: 100,
			align: "center",
			render: (_, run) => <OptionsDropdown deleteWorkflow={() => onDeleteClick(run.id)} />,
		},
	]

	return (
		<InfiniteScroll
			dataLength={runs.length}
			next={fetchMoreData}
			hasMore={pageInfo.hasNextPage} // Replace with a condition to check if there's more data to load
			loader={<h4>Loading...</h4>}
			endMessage={
				<p>
					<b>End of runs</b>
				</p>
			}
		>
			<Table
				className="pt-3"
				columns={columns}
				dataSource={runs}
				rowKey={(row) => row.id}
				scroll={{ x: 1000 }}
				pagination={false}
				tableLayout="fixed"
			/>
		</InfiniteScroll>
	)
}
