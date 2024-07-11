import { clsx } from "clsx"

type ContainerProps = {
	children: React.ReactNode
	headerChildren?: React.ReactNode
	sectionName: string
	className?: string
}

export const Container = ({ children, className, sectionName, headerChildren }: ContainerProps) => {
	return (
		<div className={clsx(className, "bg-white shadow-sm rounded-s mx-4 md:mx-0")}>
			<header className="flex items-center gap-x-4 px-5 py-4 border-b border-gray-100">
				<h2 className="font-semibold text-gray-800">{sectionName}</h2>
				{headerChildren}
			</header>
			<div className="px-6 py-6">{children}</div>
		</div>
	)
}
