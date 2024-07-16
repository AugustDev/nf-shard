import { Main } from "@/app/launch/components/Main"

export default async function Page() {
	return <Main />
}

export const fetchCache = "force-no-store"
export const revalidate = 0
