"use client"
import { ColorDot, Container } from "@/app/components"
import { CodeText } from "@/app/runs/[id]/components"

import { Fragment, useEffect, useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { Workspace } from "@prisma/client"
import { clsx } from "clsx"
import { stringToColour } from "@/common"

type TMainProps = {
	workspaces: Workspace[]
}

export const Main = (props: TMainProps) => {
	const workspaces = [{ id: 0, name: "Default" }, ...props.workspaces]
	const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>(workspaces[0])
	const [shardConfig, setShardConfig] = useState<string>("")

	useEffect(() => {
		let config = []
		config.push("enabled = true")
		config.push(`accessToken = "x"`)
		config.push(`endpoint = "${process.env.NEXT_PUBLIC_WATCH_BASE_URI}/api"`)
		if (selectedWorkspace.id !== 0) {
			config.push(`workspaceId = "${selectedWorkspace.id}"`)
		}

		let configString = "tower {\n"
		for (const line of config) {
			configString += `\t${line}\n`
		}
		configString += "}"
		setShardConfig(configString)
	}, [selectedWorkspace])

	return (
		<Container sectionName="Get Started">
			<div className="text-left">
				<h3 className="mt-2 text-md text-gray-900"></h3>
				<p className="mt-1 text-sm text-gray-500">
					To get started with nf-shard add following code in your Nextflow config. After that you can run your Nextflow
					pipeline to see the results in the dashboard.
				</p>
				<div className="text-md pt-8">Workspace</div>
				<Menu as="div" className="relative inline-block text-left pt-4">
					<div>
						<Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
							{selectedWorkspace.name}
							<ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
						</Menu.Button>
					</div>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute left-full z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								{workspaces.map((workspace) => (
									<Menu.Item key={workspace.id}>
										{({ active }) => (
											<a
												href="#"
												className={clsx(
													active ? "bg-gray-100 text-gray-900" : "text-gray-700",
													"block px-4 py-2 text-sm"
												)}
												onClick={() => setSelectedWorkspace(workspace)}
											>
												<ColorDot color={stringToColour(workspace.name)} className="pr-2" /> {workspace.name}
											</a>
										)}
									</Menu.Item>
								))}
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
				<CodeText className="mt-8" code={shardConfig} />
			</div>
		</Container>
	)
}
