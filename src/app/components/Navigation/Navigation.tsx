"use client"

import { FC, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Toaster } from "react-hot-toast"

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
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
				<div className="flex items-center gap-6">
					<Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
						<div className="flex-shrink-0">
							<img className="h-9" src="/logo.png" alt="nf-shard" />
						</div>
						<span className="sr-only">Shard</span>
					</Link>

					<nav className="hidden md:flex md:items-center md:gap-5 lg:gap-6">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									item.href === currentPath
										? "text-foreground font-medium"
										: "text-muted-foreground hover:text-foreground",
									"text-sm font-medium transition-colors hover:text-foreground"
								)}
							>
								{item.name}
							</Link>
						))}
					</nav>
				</div>

				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="md:hidden p-2 text-muted-foreground hover:text-foreground"
				>
					{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					<span className="sr-only">Toggle menu</span>
				</button>
			</header>

			{isMenuOpen && (
				<div className="md:hidden">
					<nav className="flex flex-col gap-4 px-4 py-2 bg-background border-b">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								onClick={() => setIsMenuOpen(false)}
								className={cn(
									item.href === currentPath ? "text-foreground font-medium" : "text-muted-foreground",
									"text-sm font-medium transition-colors hover:text-foreground"
								)}
							>
								{item.name}
							</Link>
						))}
					</nav>
				</div>
			)}

			<div className="h-full py-6 sm:px-6 lg:px-8">
				{child}
				<Toaster position="top-right" />
			</div>
		</div>
	)
}
