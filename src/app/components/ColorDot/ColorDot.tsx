import { stringToColour } from "@/common"
import clsx from "clsx"

type TColorDotProps = {
	color: string
	className?: string
}

export const ColorDot = ({ color, className }: TColorDotProps) => {
	return (
		<span className={clsx(className, "inline-flex items-center")}>
			<svg className="h-2 w-2" fill={color} viewBox="0 0 6 6" aria-hidden="true">
				<circle cx={3} cy={3} r={3} />
			</svg>
		</span>
	)
}
