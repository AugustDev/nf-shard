"use client"

import { useState } from "react"
import { SearchTag } from "./SearchTag"

type SearchProps = {
	tags: string[]
	addTag: (tag: string) => void
	removeTag: (tag: string) => void
}

export const SearchBar = ({ tags, addTag, removeTag }: SearchProps) => {
	const [search, setSearch] = useState("")

	const addNewTag = (tag: string) => {
		addTag(tag)
		setSearch("")
	}

	return (
		<>
			<div className="bg-white border border-gray-300 rounded-md pl-2 py-1 mx-4 md:mx-0">
				<ul className="inline-flex flex-wrap content-center items-center w-full">
					{tags.map((tag, i) => (
						<SearchTag key={i} tag={tag} onRemoveClick={removeTag} />
					))}
					<li className="flex-grow">
						<input
							className="flex-grow w-full focus:outline-none border-none focus:ring-0 text-sm text-gray-900"
							placeholder="Search runs, workflow id, tags etc"
							type="text"
							onChange={(e) => setSearch(e.target.value)}
							value={search}
							onKeyDown={(e) => (e.key === "Enter" ? addNewTag(search) : undefined)}
						/>
					</li>
				</ul>
			</div>
		</>
	)
}
