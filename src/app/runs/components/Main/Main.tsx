"use client"

import React, { useEffect, useState } from "react"
import { clsx } from "clsx"
import { SearchBar } from "@/app/components"
import { Workflow } from "@prisma/client"
import { RunsTable } from "../RunsTable"
import { SearchRequest, SearchResponse } from "@/app/api/search/types"
import styles from "./Main.module.scss"
import moment from "moment"

type TMainProps = {
	runs: Workflow[]
}

export const Main = (props: TMainProps) => {
	const [searchTags, setSearchTags] = useState<string[]>([])
	const [workflows, setWorkflows] = useState<Workflow[]>(props.runs)

	const addSearchTag = (tag: string) => {
		if (tag == "" || searchTags.includes(tag)) {
			return
		}
		setSearchTags([...searchTags, tag])
	}

	const removeSearchTag = (tag: string) => {
		setSearchTags(searchTags.filter((t) => t !== tag))
	}

	const executeSearch = async () => {
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
		}

		const response = await fetch(`/api/search`, {
			body: JSON.stringify(searchBody),
			method: "POST",
			cache: "no-store",
		})

		const results: SearchResponse = await response.json()
		setWorkflows(results.workflows)
	}

	useEffect(() => {
		executeSearch()

		// Execute every 5 seconds
		const intervalId = setInterval(() => {
			console.log("brah")
			executeSearch()
		}, 5000) // 5000 milliseconds = 5 seconds

		// Clear interval on component unmount
		return () => {
			clearInterval(intervalId)
		}
	}, [searchTags])

	return (
		<>
			<SearchBar tags={searchTags} addTag={addSearchTag} removeTag={removeSearchTag} />
			{workflows.length > 0 && <RunsTable runs={workflows} className={clsx(styles.fadeInBottom, "mt-8")} />}
		</>
	)
}
