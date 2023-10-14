"use client"

import { JsonViewer } from "@textea/json-viewer"

type DataViewerProps = {
	data: any
}

export const DataViewer = ({ data }: DataViewerProps) => {
	return (
		<JsonViewer
			displayDataTypes={false}
			displaySize={false}
			maxDisplayLength={300}
			value={data}
			enableClipboard={false}
		/>
	)
}
