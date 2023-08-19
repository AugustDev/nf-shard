"use client";

import { CheckCircleIcon } from "@heroicons/react/20/solid";

import { clsx } from "clsx";

type WorkflowDetailsProps = {
  run_name: string;
  workflow_name: string;
  status: string;
  className?: string;
};

export const WorkflowDetails = () => {
  const props: WorkflowDetailsProps = {
    run_name: "marvelous_fermat",
    workflow_name: "nf-core/methylation",
    status: "success",
    className: "mb-12",
  };

  return (
    <div
      className={clsx(
        "bg-white py-8 px-8 rounded-md shadow-sm ring-1 ring-gray-900/5",
        props.className
      )}
    >
      <div className="flex flex-row items-center">
        <CheckCircleIcon
          className="h-10 w-10 text-green-500 mr-4"
          aria-hidden="true"
        />
        <div className="flex flex-row items-end">
          <div className="font-medium text-2xl pr-4 text-black">
            {props.run_name}
          </div>
          <div className="font-medium text-xl text-gray-500">
            {props.workflow_name}
          </div>
        </div>
      </div>

      {/* <div className="overflow-hidden rounded-full bg-gray-200 mt-8">
        <div
          className="h-1.5 rounded-full bg-green-600"
          style={{ width: "100%" }}
        />
      </div> */}
    </div>
  );
};
