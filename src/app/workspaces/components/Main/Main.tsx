"use client"

import { ColorDot, Container } from "@/app/components"
import { Workspace } from "@prisma/client"
import { useState } from "react"
import { Modal } from "@/app/components"
import { stringToColour } from "@/common"
import Link from "next/link"

type TWorkspaceProps = {
	workspaces: Workspace[]
}

export const Main = (props: TWorkspaceProps) => {
	const [workspaces, setWorkspaces] = useState<Workspace[]>(props.workspaces)
	const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
	const [deleteWorkspaceModal, setDeleteWorkspaceModal] = useState<number | undefined>(undefined)
	const [newWorkspaceName, setNewWorkspaceName] = useState<string>("")

	const createWorkspace = async () => {
		if (newWorkspaceName.length === 0) {
			return
		}

		const response = await fetch(`/api/workspaces/create`, {
			body: JSON.stringify({ name: newWorkspaceName }),
			method: "POST",
			cache: "no-store",
		})

		const workspaces: Workspace[] = await response.json()
		if (workspaces) {
			setWorkspaces(workspaces)
		}
		setOpenCreateModal(false)
	}

	const deleteWorkspace = async () => {
		const response = await fetch(`/api/workspaces/delete`, {
			body: JSON.stringify({ id: deleteWorkspaceModal }),
			method: "DELETE",
			cache: "no-store",
		})

		const workspaces: Workspace[] = await response.json()
		if (workspaces) {
			setWorkspaces(workspaces)
		}
		setDeleteWorkspaceModal(undefined)
	}

	return (
		<>
			<Container sectionName="Workspaces">
				<div className="text-left">
					<h3 className="mt-2 text-md text-gray-900"></h3>
					<p className="mt-1 text-sm text-gray-500">
						Workspaces allows to group runs by project, user or any other setup of your choice.
					</p>
				</div>

				<div>
					<div className="sm:flex sm:items-center">
						<div className="sm:flex-auto"></div>
						<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
							<button
								type="button"
								className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								onClick={() => setOpenCreateModal(true)}
							>
								Add Workspace
							</button>
						</div>
					</div>
					<div className="mt-8 flow-root">
						<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
								<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
									<table className="min-w-full divide-y divide-gray-300">
										<thead className="bg-gray-50">
											<tr>
												<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Name
												</th>
												<th scope="col" className="py-3.5 text-center text-sm font-semibold text-gray-900 ">
													ID
												</th>

												<th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
													Color
												</th>
												<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
													<span className="sr-only">Delete</span>
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200 bg-white">
											{workspaces.map((workspace) => (
												<tr key={workspace.id}>
													<td className="whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
														<Link href={`/runs?workspaceId=${workspace.id}`}> {workspace.name}</Link>
													</td>

													<td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{workspace.id}</td>
													<td className="whitespace-nowrap py-4 text-center text-sm text-gray-500">
														<ColorDot color={stringToColour(workspace.name)} />
													</td>
													<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
														<a
															href="#"
															onClick={() => setDeleteWorkspaceModal(workspace.id)}
															className="text-red-600 hover:text-red-900"
														>
															Delete
														</a>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
			<Modal
				open={openCreateModal}
				setOpen={function (status: boolean): void {
					setOpenCreateModal(status)
				}}
			>
				<div>
					<div className="mt-3 text-center sm:mt-5">
						<div className="mt-2 text-left">
							<p className="text-dm">Enter new Workspace name</p>
						</div>
						<div className="sm:col-span-2">
							<div className="mt-4">
								<input
									type="text"
									name="company"
									id="company"
									className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									onChange={(e) => setNewWorkspaceName(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
					<button
						type="button"
						className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
						onClick={() => createWorkspace()}
					>
						Create
					</button>
					<button
						type="button"
						className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
						onClick={() => setOpenCreateModal(false)}
					>
						Cancel
					</button>
				</div>
			</Modal>

			<Modal
				open={!!deleteWorkspaceModal}
				setOpen={function (status: boolean): void {
					setDeleteWorkspaceModal(undefined)
				}}
			>
				<div>
					<div className="mt-3 text-center sm:mt-5">
						<div className="mt-2 text-left">
							<p className="text-dm">Permanently delete workspace?</p>
						</div>
					</div>
				</div>
				<div className="mt-5 ">
					<button
						type="button"
						className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
						onClick={() => deleteWorkspace()}
					>
						Delete Workspace
					</button>
				</div>
			</Modal>
		</>
	)
}
