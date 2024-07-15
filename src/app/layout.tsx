import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { MainNavigation } from "./components"
import StyledComponentsRegistry from "../lib/AntdRegistry"
import { cn } from "@/lib/utils"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
})

export const metadata: Metadata = {
	title: "nf-tower - Monitor Nextlfow pipelines. Group runs into workspaces.",
	description: "Monitor Nextlfow pipelines",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="h-full">
			<body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
				<StyledComponentsRegistry>
					<MainNavigation child={children} />
				</StyledComponentsRegistry>
			</body>
		</html>
	)
}
