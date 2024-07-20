/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string }
	String: { input: string; output: string }
	Boolean: { input: boolean; output: boolean }
	Int: { input: number; output: number }
	Float: { input: number; output: number }
}

export type Executor = {
	computeOverride: Scalars["String"]["input"]
	name: Scalars["String"]["input"]
}

export type Log = {
	__typename?: "Log"
	message: Scalars["String"]["output"]
	timestamp: Scalars["String"]["output"]
}

export type Mutation = {
	__typename?: "Mutation"
	runJob: RunJobResponse
	terminateJob: Scalars["Boolean"]["output"]
}

export type MutationRunJobArgs = {
	input: RunJobCommand
}

export type MutationTerminateJobArgs = {
	input: TerminateJobCommand
}

export type Parameter = {
	isFlag: Scalars["Boolean"]["input"]
	key: Scalars["String"]["input"]
	value: Scalars["String"]["input"]
}

export type Query = {
	__typename?: "Query"
	checkStatus: Scalars["Boolean"]["output"]
	healthCheck: Scalars["Boolean"]["output"]
}

export type RunJobCommand = {
	executor: Executor
	parameters: Array<Parameter>
	pipelineUrl: Scalars["String"]["input"]
	runName: Scalars["String"]["input"]
}

export type RunJobResponse = {
	__typename?: "RunJobResponse"
	executor: Scalars["String"]["output"]
	processKey: Scalars["String"]["output"]
	runName: Scalars["String"]["output"]
	status: Scalars["Boolean"]["output"]
}

export type Subscription = {
	__typename?: "Subscription"
	streamLogs: Log
}

export type SubscriptionStreamLogsArgs = {
	runName: Scalars["String"]["input"]
}

export type TerminateJobCommand = {
	executor: Scalars["String"]["input"]
	processKey: Scalars["String"]["input"]
}

export type RunJobMutationVariables = Exact<{
	command: RunJobCommand
}>

export type RunJobMutation = {
	__typename: "Mutation"
	runJob: { __typename: "RunJobResponse"; status: boolean; processKey: string; executor: string; runName: string }
}

export type TerminateJobMutationVariables = Exact<{
	command: TerminateJobCommand
}>

export type TerminateJobMutation = { __typename: "Mutation"; terminateJob: boolean }

export type HealthQueryVariables = Exact<{ [key: string]: never }>

export type HealthQuery = { __typename: "Query"; healthCheck: boolean }

export type StatusCheckQueryVariables = Exact<{ [key: string]: never }>

export type StatusCheckQuery = { __typename: "Query"; checkStatus: boolean }

export type StreamLogsSubscriptionVariables = Exact<{
	runName: Scalars["String"]["input"]
}>

export type StreamLogsSubscription = {
	__typename?: "Subscription"
	streamLogs: { __typename: "Log"; message: string; timestamp: string }
}

export const RunJobDocument = {
	__meta__: { hash: "530ffa54a7abf6340303b02a1595195360d7c8d1" },
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "RunJob" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "command" } },
					type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "RunJobCommand" } } },
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "__typename" } },
					{
						kind: "Field",
						name: { kind: "Name", value: "runJob" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "input" },
								value: { kind: "Variable", name: { kind: "Name", value: "command" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "__typename" } },
								{ kind: "Field", name: { kind: "Name", value: "status" } },
								{ kind: "Field", name: { kind: "Name", value: "processKey" } },
								{ kind: "Field", name: { kind: "Name", value: "executor" } },
								{ kind: "Field", name: { kind: "Name", value: "runName" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<RunJobMutation, RunJobMutationVariables>
export const TerminateJobDocument = {
	__meta__: { hash: "c079354d332830cbd3e3423be21b5287dfbfa506" },
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "TerminateJob" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "command" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "TerminateJobCommand" } },
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "__typename" } },
					{
						kind: "Field",
						name: { kind: "Name", value: "terminateJob" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "input" },
								value: { kind: "Variable", name: { kind: "Name", value: "command" } },
							},
						],
					},
				],
			},
		},
	],
} as unknown as DocumentNode<TerminateJobMutation, TerminateJobMutationVariables>
export const HealthDocument = {
	__meta__: { hash: "0ce029cdb22e1c818c94d4b9e492821d8325c141" },
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "Health" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "__typename" } },
					{ kind: "Field", name: { kind: "Name", value: "healthCheck" } },
				],
			},
		},
	],
} as unknown as DocumentNode<HealthQuery, HealthQueryVariables>
export const StatusCheckDocument = {
	__meta__: { hash: "ae3a7643b1de8baff664c20a01ca88d924fb752c" },
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "StatusCheck" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "__typename" } },
					{ kind: "Field", name: { kind: "Name", value: "checkStatus" } },
				],
			},
		},
	],
} as unknown as DocumentNode<StatusCheckQuery, StatusCheckQueryVariables>
export const StreamLogsDocument = {
	__meta__: { hash: "fa259b288d825a01bed0817a3b8d85d76c2faf62" },
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "StreamLogs" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "runName" } },
					type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "streamLogs" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "runName" },
								value: { kind: "Variable", name: { kind: "Name", value: "runName" } },
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "__typename" } },
								{ kind: "Field", name: { kind: "Name", value: "message" } },
								{ kind: "Field", name: { kind: "Name", value: "timestamp" } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<StreamLogsSubscription, StreamLogsSubscriptionVariables>
