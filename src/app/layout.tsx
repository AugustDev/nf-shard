import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { MainNavigation } from "./components"
import StyledComponentsRegistry from "../lib/AntdRegistry"
// import "@/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "nf-tower - Monitor Nextlfow pipelines. Group runs into workspaces.",
	description: "Monitor Nextlfow pipelines",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="h-full bg-gray-100">
			<body className={inter.className}>
				<StyledComponentsRegistry>
					<MainNavigation child={children} />
				</StyledComponentsRegistry>
			</body>
		</html>
	)
}
