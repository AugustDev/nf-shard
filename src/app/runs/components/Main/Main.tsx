"use client"

import React, { useEffect, useState } from "react"
import { clsx } from "clsx"
import { SearchBar } from "@/app/components"
import { Workflow, Workspace } from "@prisma/client"
import { RunsTable } from "../RunsTable"
import { SearchRequest, SearchResponse, TPageInfo } from "@/app/api/search/types"
import styles from "./Main.module.scss"
import moment from "moment"

type TMainProps = {
	runs: Workflow[]
	workspaces: Workspace[]
	searchTags: string[]
}

export const Main = (props: TMainProps) => {
	const [searchTags, setSearchTags] = useState<string[]>(props.searchTags ?? [])
	const [workflows, setWorkflows] = useState<Workflow[]>(props.runs)
	const [workspaces, setWorkspaces] = useState<Workspace[]>(props.workspaces)
	const [pageInfo, setPageInfo] = useState<TPageInfo>({ hasNextPage: true })

	const addSearchTag = (tag: string) => {
		if (tag == "" || searchTags.includes(tag)) {
			return
		}
		setSearchTags([...searchTags, tag])
	}

	const removeSearchTag = (tag: string) => {
		setSearchTags(searchTags.filter((t) => t !== tag))
	}

	const searchRuns = async (cursor?: string) => {
		const searchBody: SearchRequest = {}

		for (const tag of searchTags) {
			const [type, value] = tag.split(":").map((e) => e.trim())
			if (!value) {
				searchBody.term = tag
			}

			if (type == "tag") {
				searchBody.tags = searchBody.tags || []
				searchBody.tags.push(value)
			}

			if (type == "id") {
				searchBody.id = value
			}

			if (type == "run") {
				searchBody.run_name = value
			}

			if (type == "project") {
				searchBody.project_name = value
			}

			if (type == "user") {
				searchBody.user_name = value
			}

			if (type == "after") {
				const date = moment(value)
				if (date) {
					searchBody.after = date.toDate()
				}
			}

			if (type == "before") {
				const date = moment(value)
				if (date) {
					searchBody.before = date.toDate()
				}
			}

			if (type == "workspace") {
				const workspaceId = workspaces.find((w) => w.name.toLowerCase() == value.toLowerCase())?.id
				if (workspaceId) {
					searchBody.workspace_id = workspaceId
				}
			}
		}

		if (cursor) {
			searchBody.cursor = cursor
		}

		const response = await fetch(`/api/search`, {
			body: JSON.stringify(searchBody),
			method: "POST",
			cache: "no-store",
		})

		const results: SearchResponse = await response.json()
		return results
	}

	const executeSearch = async () => {
		const results = await searchRuns()
		setWorkflows(results.workflows)
		setPageInfo(results.pageInfo)
	}

	const getLatestRuns = async () => {
		const results = await searchRuns()
		setWorkflows((prevWorkflows) => {
			const newWorkflows = [...prevWorkflows, ...results.workflows]
			const idToWorkflowMap = new Map(newWorkflows.map((workflow) => [workflow.id, workflow]))
			return Array.from(idToWorkflowMap.values())
		})
	}

	const onWorkflowDeleteClick = async (id: string) => {
		await fetch(`/api/runs/${id}`, {
			method: "DELETE",
			cache: "no-store",
		})
		setWorkflows((prevWorkflows) => prevWorkflows.filter((workflow) => workflow.id !== id))
	}

	const fetchMoreData = async () => {
		const results = await searchRuns(pageInfo.endCursor)
		setWorkflows((prevWorkflows) => {
			const newWorkflows = [...prevWorkflows, ...results.workflows]
			const idToWorkflowMap = new Map(newWorkflows.map((workflow) => [workflow.id, workflow]))
			return Array.from(idToWorkflowMap.values())
		})
		setPageInfo(results.pageInfo)
	}

	useEffect(() => {
		executeSearch()

		// Execute every 5 seconds
		const intervalId = setInterval(() => {
			getLatestRuns()
		}, 5000) // 5000 milliseconds = 5 seconds

		// Clear interval on component unmount
		return () => {
			clearInterval(intervalId)
		}
	}, [searchTags])

	return (
		<>
			<SearchBar tags={searchTags} addTag={addSearchTag} removeTag={removeSearchTag} />
			{workflows.length > 0 && (
				<RunsTable
					runs={workflows}
					className={clsx(styles.fadeInBottom, "mt-8")}
					onDeleteClick={onWorkflowDeleteClick}
					fetchMoreData={fetchMoreData}
					pageInfo={pageInfo}
				/>
			)}
		</>
	)
}
