"use client"

import { clsx } from "clsx"
import { Prism } from "@mantine/prism"

import { DocumentIcon } from "@heroicons/react/24/outline"

type ConfigurationProps = {
	files: string[]
	configText: string
	className?: string
}

export const Configuration = ({ files, configText, className }: ConfigurationProps) => {
	return (
		<div className={className}>
			<div>
				<div className="text-gray-900 font-medium pb-2">Files</div>
				{files.map((file) => (
					<div key={file} className="text-gray-500 text-sm flex items-center space-x-2">
						<DocumentIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
						<span>{file}</span>
					</div>
				))}

				<div className="text-gray-900 font-medium pt-8 pb-2">Resolved configuration</div>
				<div className="text-gray-500 text-sm">
					<Prism language="bash">{configText}</Prism>
				</div>
			</div>
		</div>
	)
}
