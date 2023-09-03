import { clsx } from "clsx"
import styles from "./AnimatedIcon.module.scss"

export interface AnimatedIconProps {
	children: React.ReactNode
	className?: string
}

export const AnimatedIcon = ({ children, className }: AnimatedIconProps) => {
	return <div className={clsx(styles.linear, className)}>{children}</div>
}
