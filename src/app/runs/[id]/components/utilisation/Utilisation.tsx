import { clsx } from "clsx";
import { ProgressIndicator } from "../progressIndicator/ProgressIndicator";
import { Task } from "@prisma/client";
import { useMemo } from "react";

type UtilisationProps = {
  tasks: Task[];
  cores: number;
  coresTotal: number;
  className?: string;
};

export const Utilisation: React.FC<UtilisationProps> = (
  props: UtilisationProps
) => {
  const memoryPercentage = useMemo(() => {
    let memoryReq = 0;
    let memoryRss = 0;

    for (const task of props.tasks) {
      if (!task.data.memory || !task.data.peakRss) {
        continue;
      }
      memoryRss += task.data.peakRss;
      memoryReq += task.data.memory;
    }
    return (memoryRss / memoryReq) * 100;
  }, [props.tasks]);

  const cpuPercentage = useMemo(() => {
    let cpuTime = 0;
    let cpuLoad = 0;

    for (const task of props.tasks) {
      if (!task.data.cpus || !task.data?.realtime || !task.data.pcpu) {
        continue;
      }
      cpuTime += task.data.cpus * (task.data?.realtime ?? 0);
      cpuLoad += (task.data.pcpu / 100) * (task.data?.realtime ?? 0);
    }

    return (cpuLoad / cpuTime) * 100;
  }, [props.tasks]);

  const completedTasks = useMemo(() => {
    let completed = 0;

    for (const task of props.tasks) {
      if (task.data.status === "COMPLETED") {
        completed++;
      }
    }

    return completed;
  }, [props.tasks]);

  return (
    <div
      className={clsx(
        "bg-white py-6 rounded-md shadow-sm ring-1 ring-gray-900/5",
        props.className
      )}
    >
      <div className="flex-auto">
        <dt className="text-md font-semibold leading-6 mb-6 mx-6 text-gray-900">
          Utilisation and Load
        </dt>
      </div>
      <div className="flex flex-col border-t border-gray-900/5 pt-6 pb-10">
        <div className="flex">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ProgressIndicator percent={memoryPercentage} />
              <h1 className="text-m mb-4">Memory efficiency</h1>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ProgressIndicator percent={cpuPercentage} />
              <h1 className="text-m mb-4">CPU efficiency</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-t border-gray-900/5 pt-10">
        <div className="flex">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ProgressIndicator
                percent={(props.cores / props.coresTotal) * 100}
                text={`${props.cores}/${props.coresTotal}`}
              />
              <h1 className="text-m mb-4">Cores</h1>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ProgressIndicator
                percent={(completedTasks / props.tasks.length) * 100}
                text={`${completedTasks}/${props.tasks.length}`}
              />
              <h1 className="text-m mb-4">Tasks</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
