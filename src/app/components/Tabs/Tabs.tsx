"use client"

import { Tab } from "@headlessui/react"
import { useState } from "react"
import { clsx } from "clsx"

type TabProps = {
	name: string
	content: React.ReactNode
}

type TabsProps = {
	tabs: TabProps[]
	className?: string
	panelClassName?: string
	style?: React.CSSProperties
}

export const Tabs: React.FC<TabsProps> = ({ tabs, className, panelClassName, style }: TabsProps) => {
	const [selectedIndex, setSelectedIndex] = useState(0)
	return (
		<div className={clsx(className, "bg-white rounded-md")}>
			<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
				<Tab.List className={"overflow-auto py-1.5"}>
					<div>
						<nav className="flex space-x-4" aria-label="Tabs">
							{tabs.map((tab) => (
								<Tab key={tab.name}>
									{({ selected }) => (
										<a
											key={tab.name}
											href={undefined}
											className={clsx(
												selected ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:text-gray-700",
												"rounded-md px-3 py-2 text-sm font-medium",
												"whitespace-nowrap"
											)}
										>
											{tab.name}
										</a>
									)}
								</Tab>
							))}
						</nav>
					</div>
				</Tab.List>
				<Tab.Panels className="mt-8 overflow-auto" style={style}>
					<div className={clsx(panelClassName)}>
						{tabs.map((tab) => (
							<Tab.Panel key={tab.name}>{tab.content}</Tab.Panel>
						))}
					</div>
				</Tab.Panels>
			</Tab.Group>
		</div>
	)
}
