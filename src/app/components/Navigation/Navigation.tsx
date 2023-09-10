"use client"

import { FC } from "react"
import { clsx } from "clsx"
import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Toaster } from "react-hot-toast"
import { usePathname } from "next/navigation"

const navigation = [
	{ name: "Runs", href: "/runs" },
	{ name: "Workspaces", href: "/workspaces" },
	{ name: "Get Started", href: "/guide" },
]

type MainNavigationProps = {
	child: React.ReactNode
}

export const MainNavigation: FC<MainNavigationProps> = ({ child }) => {
	const currentPath = usePathname()

	return (
		<div className="h-full">
			<Disclosure as="nav" className="bg-indigo-600">
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="flex h-16 items-center justify-between">
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<img
											className="h-8 w-8"
											src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
											alt="Your Company"
										/>
									</div>
									<div className="hidden md:block">
										<div className="ml-10 flex items-baseline space-x-4">
											{navigation.map((item) => (
												<a
													key={item.name}
													href={item.href}
													className={clsx(
														item.href === currentPath
															? "bg-indigo-700 text-white"
															: "text-white hover:bg-indigo-500 hover:bg-opacity-75",
														"rounded-md px-3 py-2 text-sm font-medium"
													)}
													aria-current={item.href == currentPath ? "page" : undefined}
												>
													{item.name}
												</a>
											))}
										</div>
									</div>
								</div>
								<div className="-mr-2 flex md:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="md:hidden">
							<div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.href}
										className={clsx(
											item.href == currentPath
												? "bg-indigo-700 text-white"
												: "text-white hover:bg-indigo-500 hover:bg-opacity-75",
											"block rounded-md px-3 py-2 text-base font-medium"
										)}
										aria-current={item.href == currentPath ? "page" : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>

			<main className="h-full">
				<div className="h-full mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
					{child} <Toaster position="top-right" />
				</div>
			</main>
		</div>
	)
}
