"use client"

import { Prism } from "@mantine/prism"

export function CodeText({ code, className }: { code: string; className?: string }) {
	return (
		<Prism className={className} language="bash">
			{code}
		</Prism>
	)
}
