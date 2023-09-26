import { GetSettings } from "@/services/prisma"
import { Main } from "./components/Main"
import { AppSettings } from "@prisma/client"
import { Container } from "../components"

export default async function Page() {
	const settings = await getData()

	if (!settings) {
		return (
			<Container sectionName="Something went wrong">
				<p>Could not obtain app settings</p>
			</Container>
		)
	}

	return <Main settings={settings} />
}

const getData = async (): Promise<AppSettings | undefined> => {
	try {
		const appSettings = await GetSettings()
		return appSettings
	} catch (e) {
		console.error(e)
	}
}
