"use client"

import { formatDuration } from "@/common"
import moment from "moment"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

export const useTimer = (startTime: number) => {
	const [seconds, setSeconds] = useState(startTime)

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSeconds((prevSeconds) => prevSeconds + 1)
		}, 1000)

		return () => clearInterval(intervalId)
	}, [])

	return seconds
}

type TTimerDisplayProps = {
	startedAt?: Date | null
}

export const TimerDisplay = ({ startedAt }: TTimerDisplayProps) => {
	const s = useTimer(moment().diff(startedAt, "seconds"))
	return <div>{formatDuration(s * 1000)}</div>
}

export const TimerDisplayDynamic = dynamic(() => Promise.resolve(TimerDisplay), {
	ssr: false,
})
