"use client"
import { Alert } from "@/components/ui/alert"
import { Log } from "@/generated/graphql/graphql"

type TProps = {
	logs: Log[]
}

export const LogsContainer = ({ logs }: TProps) => {
	if (logs.length === 0) {
		return null
	}

	return (
		<Alert className="bg-gray-800 text-gray-100 max-h-96 overflow-auto">
			<div className="font-mono">
				{logs.map((log, index) => (
					<div key={index} className="flex">
						<pre className="flex-1 text-xs typing items-center">{log.message}</pre>
					</div>
				))}
			</div>
		</Alert>
	)
}
