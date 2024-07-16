import { createPipeline } from "./actions/CreatePipeline"
import { CreatePipeline } from "./components/CreatePipeline"

export default async function Page() {
	return <CreatePipeline createPipeline={createPipeline} />
}

export const fetchCache = "force-no-store"
export const revalidate = 0
