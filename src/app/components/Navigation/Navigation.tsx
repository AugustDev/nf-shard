"use client"

import { FC } from "react"
import { clsx } from "clsx"
import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Toaster } from "react-hot-toast"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { CircleUser, Menu, Package2 } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const navigation = [
	{ name: "Runs", href: "/runs" },
	{ name: "Launch", href: "/launch" },
	{ name: "Workspaces", href: "/workspaces" },
	{ name: "Get Started", href: "/guide" },
	{ name: "Settings", href: "/settings" },
]

type MainNavigationProps = {
	child: React.ReactNode
}

export const MainNavigation: FC<MainNavigationProps> = ({ child }) => {
	const currentPath = usePathname()

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
						<div className="flex-shrink-0">
							<img className="h-9" src="/logo.png" alt="nf-shard" />
						</div>
						<span className="sr-only">Shard</span>
					</Link>

					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								item.href === currentPath
									? "text-foreground font-medium"
									: "text-muted-foreground hover:text-foreground",
								"transition-colors hover:text-foreground"
							)}
						>
							{item.name}
						</Link>
					))}
				</nav>
				{/* <Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon" className="shrink-0 md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="grid gap-6 text-lg font-medium">
							<Link href="#" className="flex items-center gap-2 text-lg font-semibold">
								<Package2 className="h-6 w-6" />
								<span className="sr-only">Acme Inc</span>
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-foreground">
								Dashboard
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-foreground">
								Orders
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-foreground">
								Products
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-foreground">
								Customers
							</Link>
							<Link href="#" className="hover:text-foreground">
								Settings
							</Link>
						</nav>
					</SheetContent>
				</Sheet> */}
				{/* <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div> */}
			</header>
			{/* </div> */}

			<div className="h-full py-6 sm:px-6 lg:px-8">
				{child} <Toaster position="top-right" />
			</div>
		</div>
	)

	return (
		<div className="h-full">
			<Disclosure as="nav" className="bg-indigo-600">
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="flex h-16 items-center justify-between">
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<img className="h-9" src="/logo.png" alt="nf-shard" />
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
