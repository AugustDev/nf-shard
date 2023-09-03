"use client"

import { clsx } from "clsx"
import dynamic from "next/dynamic"
import { Data, Layout } from "plotly.js"

const DynamicPlot = dynamic(() => import("react-plotly.js"), { ssr: false })

type PlotBoxProps = {
	className?: string
	data: Data[]
	layout: Partial<Layout>
}

export const PlotBox = (props: PlotBoxProps) => {
	return <DynamicPlot data={props.data} layout={props.layout} className={clsx("w-full", props.className)} />
}
