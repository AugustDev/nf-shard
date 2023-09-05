import { Container } from "../components/Container"
import { CodeText } from "../runs/[id]/components/BashCode"

export default function Page() {
	return (
		<Container sectionName="Get Started">
			<div className="text-left">
				<h3 className="mt-2 text-md text-gray-900"></h3>
				<p className="mt-1 text-sm text-gray-500">
					To get started with nf-shard add following code in your Nextflow config. After that you can run your Nextflow
					pipeline to see the results in the dashboard.
				</p>
				<CodeText
					className="mt-8"
					code={`tower {
    enabled = true
    accessToken = "x"
    endpoint = "${process.env.NEXT_PUBLIC_WATCH_BASE_URI}/api"
}`}
				/>
			</div>
		</Container>
	)
}
