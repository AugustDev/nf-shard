import { Process } from "@/app/api/trace/[id]/begin/types";
import { clsx } from "clsx";

type ProcessesProps = {
  processes: Process[];
  className?: string;
};

type ProgressBarProps = {
  completed: number;
  failed: number;
  total: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  completed,
  failed,
  total,
}: ProgressBarProps) => {
  const completedPercent = (completed / total) * 100;
  const failedPercent = (failed / total) * 100;
  const remainingPercent = 100 - completedPercent - failedPercent;
  return (
    <div className="pt-1">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-sm bg-gray-200">
        <div
          style={{ width: completedPercent + "%" }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
        ></div>
        <div
          style={{ width: failedPercent + "%" }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
        ></div>
        <div
          style={{ width: remainingPercent + "%" }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-200"
        ></div>
      </div>
    </div>
  );
};

export const Processes: React.FC<ProcessesProps> = ({
  processes,
  className,
}: ProcessesProps) => {
  return (
    <div
      className={clsx(
        "bg-white py-6 rounded-md shadow-sm ring-1 ring-gray-900/5",
        className
      )}
    >
      <div className="flex-auto">
        <dt className="text-md font-semibold leading-6 mb-6 mx-6 text-gray-900">
          Processes
        </dt>
      </div>
      <div className="flex flex-col border-t border-gray-900/5 pt-6">
        {processes.map((progress) => {
          const total =
            progress.succeeded +
            progress.failed +
            progress.running +
            progress.pending +
            progress.aborted +
            progress.cached +
            progress.ignored;
          return (
            <div key={progress.index} className="mx-6">
              <a href="#">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {progress.name}
                    </span>
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {progress.succeeded + progress.failed} / {total}
                    </span>
                  </div>
                  <ProgressBar
                    completed={progress.succeeded}
                    failed={progress.failed}
                    total={total}
                  />
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
