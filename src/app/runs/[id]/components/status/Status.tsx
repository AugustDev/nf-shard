import { clsx } from "clsx";

type StatusProps = {
  pending: number;
  submitted: number;
  running: number;
  cached: number;
  succeeded: number;
  failed: number;
  className?: string;
};

export const Status: React.FC = () => {
  const props: StatusProps = {
    pending: 2,
    submitted: 2,
    running: 5,
    cached: 0,
    succeeded: 12,
    failed: 3,
    className: "pt-10",
  };

  return (
    <div>
      <dl
        className={clsx(
          props.className,
          "grid grid-cols-1 gap-5 sm:grid-cols-6"
        )}
      >
        <div className="overflow-hidden rounded-md bg-indigo-500 px-4 py-5 shadow sm:p-6 text-white">
          <dt className="truncate text-sm font-medium text-white">Pending</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
            {props.pending}
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-amber-500 px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-white">Submitted</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
            {props.submitted}
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-sky-500 px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-white">Running</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
            {props.running}
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-slate-500 px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-white">Cached</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
            {props.cached}
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-green-500 px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-white">Succeeded</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
            {props.succeeded}
          </dd>
        </div>
        <div className="overflow-hidden rounded-md bg-red-500 px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-white">Failed</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
            {props.failed}
          </dd>
        </div>
      </dl>
    </div>
  );
};
