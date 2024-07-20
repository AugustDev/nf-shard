import { type CodegenConfig } from "@graphql-codegen/cli"
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset"

const config: CodegenConfig = {
	schema: "/Users/wpc/Projects/cfdx/nf-shard-orchestrator/graph/schema.graphqls",
	documents: ["src/**/*.graphql"],
	ignoreNoDocuments: true,
	overwrite: true,
	generates: {
		"./src/generated/graphql/": {
			preset: "client",
			plugins: [],
			presetConfig: {
				persistedDocuments: true,
				fragmentMasking: false,
			},
			documentTransforms: [addTypenameSelectionDocumentTransform],
		},
	},
	hooks: { afterAllFileWrite: ["prettier --write"] },
}

export default config
