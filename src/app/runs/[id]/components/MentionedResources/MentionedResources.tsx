"use client"

import { useMemo } from "react"

type MentionedResourcesProps = {
	data?: any
}

type MatchedResourceLink = {
	key: string
	url: string
	urlName: string
}

export const MentionedResources = ({ data }: MentionedResourcesProps) => {
	const findS3Entries = (dict: any) => {
		let result: { [key: string]: string } = {}

		for (let key in dict) {
			if (typeof dict[key] === "string" && dict[key].includes("s3://")) {
				result[key] = dict[key]
			}
			if (typeof dict[key] === "object" && dict[key] !== null) {
				let nestedResults = findS3Entries(dict[key])
				for (let nestedKey in nestedResults) {
					result[nestedKey] = nestedResults[nestedKey]
				}
			}
		}

		return result
	}

	const resolveLinks = (dict: any) => {
		let result: MatchedResourceLink[] = []

		for (let key in dict) {
			if (dict[key].includes("s3://")) {
				const urlName = dict[key].split("s3://")[1]
				const url = `https://s3.console.aws.amazon.com/s3/buckets/${urlName}`
				result.push({
					key: key,
					url: cleanUrl(url),
					urlName: dict[key],
				})
			}
		}
		return result
	}

	const priorityKeywords = ["output"]

	const hasPriority = (key: string): boolean => {
		return priorityKeywords.some((keyword) => key.includes(keyword))
	}

	const sortLinks = (links: MatchedResourceLink[]): MatchedResourceLink[] => {
		return links.sort((a, b) => {
			if (hasPriority(a.key) && !hasPriority(b.key)) {
				return -1
			} else if (!hasPriority(a.key) && hasPriority(b.key)) {
				return 1
			}
			return 0
		})
	}

	const cleanUrl = (url: string): string => {
		// Remove duplicate slashes
		url = url.replace(/([^:]\/)\/+/g, "$1")

		// for S3 directories
		if (url.includes("s3")) {
			const extensionPattern = /\.[0-9a-z]+$/i

			// If the URL doesn't have a file extension
			if (!extensionPattern.test(url)) {
				// Ensure there's a slash at the end
				if (!url.endsWith("/")) {
					url += "/"
				}
			}
		}

		console.log(url)
		return url
	}

	const matches = useMemo(() => (data ? findS3Entries(data) : {}), [data])
	const resolvedLinks = useMemo(() => (matches ? resolveLinks(matches) : []), [matches])
	const sortedLinks = useMemo(() => (resolvedLinks ? sortLinks(resolvedLinks) : []), [resolvedLinks])

	return (
		<div className="mx-auto">
			<p className="mb-4 text-gray-600 font-sm">
				Below are paths used in Nextflow resources and links to resources (S3) if possible.
			</p>
			<table className="min-w-full divide-y divide-gray-200">
				<tbody className="bg-white divide-y divide-gray-200">
					{sortedLinks.map((link) => (
						<tr key={link.key}>
							<td className="py-2">{link.key}</td>
							<td className="py-2 pl-4">
								<a href={link.url} className="text-blue-500 underline text-sm" target="_blank">
									{link.urlName}
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
