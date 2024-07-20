"use client"

import { Client, Provider, cacheExchange, fetchExchange, subscriptionExchange } from "urql"

import { SubscriptionClient } from "subscriptions-transport-ws"

const wsClient = new SubscriptionClient("ws://localhost:4001/query", {
	reconnect: true,
})

export const client = new Client({
	url: "https://server.cfdx.subj.org/query",
	exchanges: [
		// cacheExchange,
		fetchExchange,

		subscriptionExchange({
			forwardSubscription: (request) => wsClient.request(request),
		}),
	],
})

export function UrqlWrapper({ children }: React.PropsWithChildren) {
	return <Provider value={client}>{children}</Provider>
}
