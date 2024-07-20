import { DocumentNode } from "graphql"
import { OperationContext, OperationResult, useMutation, UseMutationState } from "urql"

type CustomContext = {
	url?: string
	token?: string
}

export function useMutationWithContext<Data = any, Variables extends object = {}>(
	query: DocumentNode | string
): [
	UseMutationState<Data, Variables>,
	(variables: Variables, customContext?: CustomContext) => Promise<OperationResult<Data, Variables>>,
] {
	const [mutationResult, mutate] = useMutation<Data, Variables>(query)

	const customMutate = async (
		variables: Variables,
		customContext?: CustomContext
	): Promise<OperationResult<Data, Variables>> => {
		let context: Partial<OperationContext> = {}

		if (customContext?.url) {
			context.url = customContext.url
		}

		if (customContext?.token) {
			context.fetchOptions = (prevOptions: RequestInit = {}) => {
				const headers = new Headers(prevOptions.headers)
				headers.set("Authorization", `Bearer ${customContext.token}`)

				return {
					...prevOptions,
					headers,
				}
			}
		}

		return mutate(variables, context)
	}

	return [mutationResult, customMutate]
}
