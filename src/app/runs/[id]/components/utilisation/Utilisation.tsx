import { clsx } from "clsx";
import { ProgressIndicator } from "../progressIndicator/ProgressIndicator";
import { Task } from "@prisma/client";
import { useMemo } from "react";
import { Container } from "@/app/components";

type UtilisationProps = {
  tasks: Task[];
  peakCpus: number;
  loadCpus: number;
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

    if (memoryReq == 0) {
      return 0;
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

    if (cpuTime == 0) {
      return 0;
    }

    return (cpuLoad / cpuTime) * 100;
  }, [props.tasks]);

  const completedTaskCount = props.tasks.filter(
    (task) => task.data.status === "COMPLETED"
  ).length;

  const tasksPercent = useMemo(() => {
    if (props.tasks.length === 0) {
      return 0;
    }

    return (completedTaskCount / props.tasks.length) * 100;
  }, [props.tasks, completedTaskCount]);

  return (
    <Container sectionName="Utilisation & Load" className={props.className}>
      <div className="flex flex-col  pb-10">
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
                percent={
                  props.peakCpus === 0
                    ? 0
                    : (props.loadCpus / props.peakCpus) * 100
                }
                text={`${props.loadCpus}/${props.peakCpus}`}
              />
              <h1 className="text-m mb-4">Cores</h1>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ProgressIndicator
                percent={tasksPercent}
                text={`${completedTaskCount}/${props.tasks.length}`}
              />
              <h1 className="text-m mb-4">Tasks</h1>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
