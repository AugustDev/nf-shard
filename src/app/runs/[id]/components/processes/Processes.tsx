import { Process } from "@/app/api/trace/[id]/begin/types"
import { Container } from "@/app/components"
import { clsx } from "clsx"

type ProcessesProps = {
	processes: Process[]
	className?: string
}

type ProgressBarProps = {
	completed: number
	failed: number
	total: number
	running: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, running, failed, total }: ProgressBarProps) => {
	const completedPercent = (completed / total) * 100
	const failedPercent = (failed / total) * 100
	const runningPercent = (running / total) * 100
	const remainingPercent = 100 - completedPercent - failedPercent - runningPercent
	return (
		<div className="pt-1">
			<div className="overflow-hidden h-2 mb-4 text-xs flex rounded-sm bg-gray-200">
				<div
					style={{ width: completedPercent + "%" }}
					className="transition-all duration-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
				></div>
				<div
					style={{ width: runningPercent + "%" }}
					className="transition-all duration-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400"
				></div>
				<div
					style={{ width: failedPercent + "%" }}
					className="transition-all duration-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-400"
				></div>
				<div
					style={{ width: remainingPercent + "%" }}
					className="transition-all duration-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-200"
				></div>
			</div>
		</div>
	)
}

export const Processes: React.FC<ProcessesProps> = ({ processes, className }: ProcessesProps) => {
	return (
		<Container sectionName="Processes" className={className}>
			<div className="flex flex-col  border-gray-900/5 ">
				{processes.map((progress) => {
					const total =
						progress.succeeded +
						progress.failed +
						progress.running +
						progress.pending +
						progress.aborted +
						progress.cached +
						progress.ignored
					return (
						<div key={progress.index}>
							<a href={undefined}>
								<div className="flex flex-col w-full">
									<div className="flex flex-row justify-between">
										<span className="text-sm font-medium text-gray-500 group-hover:text-gray-900">{progress.name}</span>
										<span className="text-sm font-medium text-gray-500 group-hover:text-gray-900">
											{progress.succeeded + progress.failed} / {total}
										</span>
									</div>
									<ProgressBar
										completed={progress.succeeded}
										running={progress.running}
										failed={progress.failed}
										total={total}
									/>
								</div>
							</a>
						</div>
					)
				})}
			</div>
		</Container>
	)
}
