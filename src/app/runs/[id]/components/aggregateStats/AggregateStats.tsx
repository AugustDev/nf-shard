import { clsx } from "clsx";

type AggregateStatsProps = {
  wall_time: string;
  cpu_time: string;
  total_memory: string;
  storage_read: string;
  storage_write: string;
  estimated_cost_usd: string;
  className?: string;
};

export const AggregateStats: React.FC = () => {
  const props: AggregateStatsProps = {
    wall_time: "16m 50s",
    cpu_time: "1.4",
    total_memory: "29.09",
    storage_read: "32.28",
    storage_write: "21.55",
    estimated_cost_usd: "0.051",
  };
  return (
    <div>
      <dl
        className={clsx(
          props.className,
          "grid grid-cols-1 gap-5 sm:grid-cols-3"
        )}
      >
        <div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Wall Time
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {props.wall_time}
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            CPU time
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {props.cpu_time} h
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Memory
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {props.total_memory} GB
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Storage Read
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {props.storage_read} GB
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Storage Write
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {props.storage_write} GB
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Estimated Cost
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            $ {props.estimated_cost_usd}
          </dd>
        </div>
      </dl>
    </div>
  );
};
