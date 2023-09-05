"use client"

import { clsx } from "clsx"
import dynamic from "next/dynamic"
import { Data, Layout } from "plotly.js"
import { ComponentType } from "react"

const DynamicPlot: ComponentType<{ data: Data[]; layout: Partial<Layout>; className?: string }> = dynamic(
	() => import("react-plotly.js") as any,
	{ ssr: false }
)

type PlotBoxProps = {
	className?: string
	data: Data[]
	layout: Partial<Layout>
}

export const PlotBox = (props: PlotBoxProps) => {
	return <DynamicPlot data={props.data} layout={props.layout} className={clsx("w-full", props.className)} />
}
