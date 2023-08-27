import { clsx } from "clsx";
import { ProgressIndicator } from "../progressIndicator/ProgressIndicator";

type LoadProps = {
  cores: number;
  coresTotal: number;
  tasks: number;
  tasksTotal: number;
  className?: string;
};

export const Load: React.FC<LoadProps> = (props: LoadProps) => {
  return (
    <div
      className={clsx(
        "bg-white py-6 rounded-md shadow-sm ring-1 ring-gray-900/5",
        props.className
      )}
    >
      <div className="flex-auto">
        <dt className="text-md font-semibold leading-6 mb-6 mx-6 text-gray-900">
          Load
        </dt>
      </div>
      <div className="flex flex-col border-t border-gray-900/5 pt-6">
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
                percent={(props.cores / props.coresTotal) * 100}
                text={`${props.cores}/${props.coresTotal}`}
              />
              <h1 className="text-m mb-4">Tasks</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
