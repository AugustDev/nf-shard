import { Fragment, useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { clsx } from "clsx"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { Modal } from "@/app/components"

type TOptionDropdownProps = {
	deleteWorkflow: () => void
}

export const OptionsDropdown = ({ deleteWorkflow }: TOptionDropdownProps) => {
	const [deleteWorkforceModal, setDeleteWorkspaceModal] = useState(false)

	const onDeleteConfirm = async () => {
		deleteWorkflow()
		setDeleteWorkspaceModal(false)
	}

	return (
		<>
			<Menu as="div" className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
				<div>
					<Menu.Button
						className="flex items-center hover:bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 p-2"
						onClick={(e) => e.stopPropagation()}
					>
						<EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
					</Menu.Button>
				</div>

				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="py-1">
							<Menu.Item>
								{({ active }) => (
									<a
										href="#"
										className={clsx(active ? "bg-gray-100 text-red-900" : "text-red-700", "block px-4 py-2 text-sm")}
										onClick={() => setDeleteWorkspaceModal(true)}
									>
										Delete
									</a>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
			<Modal open={deleteWorkforceModal} setOpen={setDeleteWorkspaceModal}>
				<div>
					<div className="text-center">
						<div className="mt-2 text-left">
							<p className="text-md">Permanently delete workflow?</p>
						</div>
					</div>
				</div>
				<div className="mt-5 ">
					<button
						type="button"
						className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
						onClick={onDeleteConfirm}
					>
						Delete
					</button>
				</div>
			</Modal>
		</>
	)
}
