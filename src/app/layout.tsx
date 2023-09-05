import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { MainNavigation } from "./components"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "nf-tower - monitor Nextlfow pipelines",
	description: "Monitor Nextlfow pipelines",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="h-full bg-gray-100">
			<body className={inter.className}>
				<MainNavigation child={children} />
			</body>
		</html>
	)
}
