import { upsertPipelineAction } from "../actions/UpsertPipeline"
import { CreatePipeline } from "../components/PipelineForm"

export default async function Page() {
	return <CreatePipeline submitPipeline={upsertPipelineAction} />
}

export const fetchCache = "force-no-store"
export const revalidate = 0
