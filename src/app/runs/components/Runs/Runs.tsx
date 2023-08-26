"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { StatusTag } from "@/app/components";
import { fullDateTime, safeDiffMinutes } from "@/common";
import { Workflow } from "@prisma/client";

import { clsx } from "clsx";

type RunsTableProps = {
  runs: Workflow[];
  className?: string;
};

export const RunsTable: React.FC<RunsTableProps> = ({
  runs,
  className,
}: RunsTableProps) => {
  const { push } = useRouter();

  const handleRowClick = (id: string) => {
    push(`/runs/${id}`);
  };
  return (
    <div className={className}>
      <table className="rounded-md text-left bg-white w-full">
        <tbody className="divide-y align-middle sm:px-6 lg:px-8">
          {runs.map((run) => (
            <tr
              onClick={() => handleRowClick(run.id)}
              key={run.id}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                <div className="text-gray-900">{run.manifest.description}</div>
              </td>
              <td className="whitespace-nowrap py-5 px-3 text-sm sm:pl-0">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {run.runName}
                    </div>
                    <div className="mt-1 text-gray-500">{run.projectName}</div>
                  </div>
                </div>
              </td>

              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-right">
                <div className="font-medium text-gray-900">
                  {fullDateTime(run.start)}
                </div>
                <div className="mt-1 text-gray-500">
                  {safeDiffMinutes(run.start, run.complete)}
                </div>
              </td>
              {/* <td className="text-right">
                  {["Hi", "X"].map((tag) => (
                    <Tag key={tag} name={tag} />
                  ))}
                </td> */}
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-right">
                <StatusTag name="completed" type="completed" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
