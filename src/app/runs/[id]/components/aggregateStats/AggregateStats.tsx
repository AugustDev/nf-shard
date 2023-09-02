"use client";

import { clsx } from "clsx";
import { Task } from "@prisma/client";
import { useMemo } from "react";
import { formatDuration } from "@common/utils/index";
import moment from "moment";
const bytes = require("bytes");

type AggregateStatsProps = {
  tasks: Task[];
  wallTime: number;
  starts?: Date | null;
  className?: string;
};

type Stats = {
  cpuTime: number;
  totalMemory: number;
  storageRead: number;
  storageWrite: number;
  estimatedCostUsd: number;
};

export const AggregateStats: React.FC<AggregateStatsProps> = ({
  tasks,
  wallTime,
  starts,
  className,
}: AggregateStatsProps) => {
  const aggregates = useMemo(() => {
    let aggr: Stats = {
      cpuTime: 0,
      totalMemory: 0,
      storageRead: 0,
      storageWrite: 0,
      estimatedCostUsd: 0,
    };

    for (const task of tasks) {
      aggr.cpuTime +=
        (task?.data.cpus * (task?.data?.realtime ?? 0)) / (3600 * 1000);
      aggr.totalMemory += task?.data.rss ?? 0;
      aggr.storageRead += task?.data.readBytes ?? 0;
      aggr.storageWrite += task?.data.writeBytes ?? 0;
    }

    return aggr;
  }, [tasks]);

  const averageCostPerCpuHour = 0.1;
  const costEstimate = aggregates.cpuTime * averageCostPerCpuHour;
  const wallTimeDerived = useMemo(() => {
    if (wallTime) {
      return wallTime;
    }

    if (starts) {
      return moment(starts).diff(moment(), "minutes");
    }

    return 0;
  }, [wallTime, starts]);

  return (
    <div>
      <dl className={clsx(className, "grid grid-cols-1 gap-5 sm:grid-cols-3")}>
        <div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Wall Time
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {formatDuration(wallTime)}
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            CPU time
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {aggregates.cpuTime.toFixed(2)} h
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Memory
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {bytes(aggregates.totalMemory, { unitSeparator: " " })}
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Storage Read
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {bytes(aggregates.storageRead, { unitSeparator: " " })}
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Storage Write
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {bytes(aggregates.storageWrite, { unitSeparator: " " })}
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Estimated Cost
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            $ {costEstimate.toFixed(3)}
          </dd>
        </div>
      </dl>
    </div>
  );
};
