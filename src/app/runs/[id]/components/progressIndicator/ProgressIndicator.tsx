"use client"

import { useEffect, useRef } from "react"

type ProgressIndicatorProps = {
	percent: number
	text?: string
}

export const ProgressIndicator = ({ percent, text }: ProgressIndicatorProps) => {
	const circumference = 2 * Math.PI * 50
	const offset = (1 - percent / 100) * circumference

	return (
		<div className="flex items-center justify-center">
			<div className="relative">
				<svg className="w-32 h-32" viewBox="0 0 120 120">
					<circle cx="60" cy="60" r="50" fill="none" stroke="#eaeaea" strokeWidth="10" />
					<circle
						className={`transition-all duration-500 ${"stroke-current"}`}
						cx="60"
						cy="60"
						r="50"
						fill="none"
						stroke="blue"
						strokeWidth="10"
						strokeDasharray={`${circumference} ${circumference}`}
						strokeDashoffset={offset}
						transform="rotate(-180 60 60)"
					/>
					<text
						x="60"
						y="60" // Adjusted to center
						className="text-xl text-blue-500"
						textAnchor="middle"
						dominantBaseline="middle" // Adjusted to center
					>
						{text ? text : `${percent.toFixed(2)}%`}
					</text>
				</svg>
			</div>
		</div>
	)
}
