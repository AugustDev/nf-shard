"use client"
import { Container, Tabs } from "@/app/components"
import { PlotBox } from ".."
import { useMemo } from "react"
import moment from "moment"
import clsx from "clsx"

type MetricsProps = {
	className?: string
	metrics: PrismaJson.Metric[]
}

type MetricsCollection = {
	cpu: any[]
	cpuUsage: any[]
	mem: any[]
	memUsage: any[]
	vmem: any[]
	time: any[]
	timeUsage: any[]
	reads: any[]
	writes: any[]
}

export const MetricsOverview = (props: MetricsProps) => {
	const metricsCollection = useMemo(() => {
		let metrics: MetricsCollection = {
			cpu: [],
			cpuUsage: [],
			mem: [],
			memUsage: [],
			vmem: [],
			time: [],
			timeUsage: [],
			reads: [],
			writes: [],
		}

		for (const process of props.metrics) {
			if (process.cpu) {
				metrics.cpu.push({
					y: [process.cpu.min, process.cpu.q1, process.cpu.q2, process.cpu.q3, process.cpu.max],
					name: process.process,
					type: "box",
					boxmean: true,
					boxpoints: false,
				})
			}

			if (process.cpuUsage) {
				metrics.cpuUsage.push({
					y: [
						process.cpuUsage.min,
						process.cpuUsage.q1,
						process.cpuUsage.q2,
						process.cpuUsage.q3,
						process.cpuUsage.max,
					],
					name: process.process,
					type: "box",
					boxmean: true,
					boxpoints: false,
				})
			}

			if (process.mem) {
				metrics.mem.push({
					y: [process.mem.min, process.mem.q1, process.mem.q2, process.mem.q3, process.mem.max],
					name: process.process,
					type: "box",
					boxmean: true,
					boxpoints: false,
				})
			}

			if (process.vmem) {
				metrics.vmem.push({
					y: [process.vmem.min, process.vmem.q1, process.vmem.q2, process.vmem.q3, process.vmem.max],
					name: process.process,
					type: "box",
					boxmean: true,
					boxpoints: false,
				})
			}

			if (process.memUsage) {
				metrics.memUsage.push({
					y: [
						process.memUsage.min,
						process.memUsage.q1,
						process.memUsage.q2,
						process.memUsage.q3,
						process.memUsage.max,
					],
					name: process.process,
					type: "box",
					boxmean: true,
					boxpoints: false,
				})
			}

			if (process.time) {
				metrics.time.push({
					y: [process.time.min, process.time.q1, process.time.q2, process.time.q3, process.time.max].map((t) =>
						moment.duration(t).asMinutes().toFixed(1)
					),
					name: process.process,
					type: "box",
					boxmean: true,
					boxpoints: false,
				})
			}

			if (process.timeUsage) {
				metrics.time.push({
					y: [process.timeUsage].map((t) => moment.duration(t).asMinutes().toFixed(1)),
					name: process.process,
					type: "box",
					boxmean: true,
					boxpoints: false,
				})
			}

			if (process.reads) {
				metrics.reads.push({
					y: [process.reads.min, process.reads.q1, process.reads.q2, process.reads.q3, process.reads.max],
					name: process.process,
					type: "box",
					boxmean: true,
					boxpoints: false,
				})
			}

			if (process.writes) {
				metrics.writes.push({
					y: [process.writes.min, process.writes.q1, process.writes.q2, process.writes.q3, process.writes.max],
					name: process.process,
					type: "box",
					boxmean: true,
					boxpoints: false,
				})
			}
		}

		return metrics
	}, [props.metrics])

	return (
		<Container sectionName="Metrics" className={props.className}>
			<Tabs
				className="overflow-x-auto w-full min-w-24"
				style={{ minWidth: "1000px" }}
				tabs={[
					{
						name: "CPU Usage",
						content: (
							<PlotBox
								className="w-full min-w-24"
								data={metricsCollection.cpu}
								layout={{
									title: "CPU Usage",
									yaxis: {
										title: "% single core CPU usage",
										tickformat: ".1f",
										rangemode: "tozero",
									},
								}}
							/>
						),
					},
					{
						name: "CPU %",
						content: (
							<PlotBox
								data={metricsCollection.cpuUsage}
								layout={{
									title: "% Requested CPU used",
									yaxis: {
										title: "% of Allocated CPU used",
										tickformat: ".1f",
										rangemode: "tozero",
									},
								}}
							/>
						),
					},
					{
						name: "Physical (RAM)",
						content: (
							<PlotBox
								data={metricsCollection.mem}
								layout={{
									title: "Physical Memory Usage",
									yaxis: {
										title: "Memory",
										tickformat: ".4s",
										rangemode: "tozero",
									},
								}}
							/>
						),
					},
					{
						name: "Virtual (RAM + Disk swap)",
						content: (
							<PlotBox
								data={metricsCollection.vmem}
								layout={{
									title: "Virtual Memory Usage",
									yaxis: {
										title: "Memory",
										tickformat: ".4s",
										rangemode: "tozero",
									},
								}}
							/>
						),
					},
					{
						name: "RAM %",
						content: (
							<PlotBox
								data={metricsCollection.memUsage}
								layout={{
									title: "% Requested Physical Memory Used",
									yaxis: {
										title: "% Memory",
										tickformat: ".1f",
										rangemode: "tozero",
									},
								}}
							/>
						),
					},
					{
						name: "Duration Raw",
						content: (
							<PlotBox
								data={metricsCollection.time}
								layout={{
									title: "Task execution real-time",
									yaxis: {
										title: "Execution time (minutes)",
										tickformat: ".1f",
										rangemode: "tozero",
									},
								}}
							/>
						),
					},
					{
						name: "Duration %",
						content: (
							<PlotBox
								data={metricsCollection.timeUsage}
								layout={{
									title: "% Requested Time Used",
									yaxis: {
										title: "% Allocated Time Used",
										tickformat: ".1f",
										rangemode: "tozero",
									},
								}}
							/>
						),
					},
					{
						name: "IO Read",
						content: (
							<PlotBox
								data={metricsCollection.reads}
								layout={{
									title: "Number of bytes read",
									yaxis: {
										title: "Read bytes",
										tickformat: ".4s",
										rangemode: "tozero",
									},
								}}
							/>
						),
					},
					{
						name: "IO Writes",
						content: (
							<PlotBox
								data={metricsCollection.writes}
								layout={{
									title: "Number of bytes written",
									yaxis: {
										title: "Written bytes",
										tickformat: ".4s",
										rangemode: "tozero",
									},
								}}
							/>
						),
					},
				]}
			/>
		</Container>
	)
}
