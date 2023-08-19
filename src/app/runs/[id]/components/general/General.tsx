import {
  CalendarDaysIcon,
  UserCircleIcon,
  DocumentIcon,
  TagIcon,
  CogIcon,
  FingerPrintIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";
import { BuildingLibraryIcon, FolderIcon } from "@heroicons/react/24/outline";

type GeneralProps = {
  id: string;
  run_name: string;
  started_at: string;
  source_commit?: string;
  user_name?: string;
  work_dir?: string;
  optimisation_profile?: string;
  docker?: string;
  executor?: string;
  compute_environment?: string;
  nextflow_version?: string;
  tags: string[];
};

export const General: React.FC = () => {
  const props: GeneralProps = {
    id: "IyDKLhakw99Ou",
    run_name: "focused_linnaeus",
    started_at: "January 31, 2023",
    source_commit: "f4b7c2c",
    user_name: "Ravi Solanki",
    work_dir: "s3://nf-tower-bucket/scratch/IyDKLhakw99O",
    optimisation_profile: "standard",
    docker: "nfcore/nextflow:21.04.1",
    executor: "awsbatch",
    compute_environment: "AWS_Batch_Ireland_FusionV2_NVMe",
    nextflow_version: "21.04.1",
    tags: ["feature-extraction", "methylation"],
  };
  return (
    <div className="lg:col-start-3 lg:row-end-1">
      <div className="rounded-md bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt className="text-md font-semibold leading-6 text-gray-900">
              General
            </dt>
          </div>
          <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
            <dt className="flex-none">
              <UserCircleIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm font-medium leading-6 text-gray-900">
              {props.user_name}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <CalendarDaysIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              <time dateTime="2023-01-31">{props.started_at}</time>
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <FingerPrintIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              {props.run_name}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <FolderIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              {props.work_dir}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <CalendarDaysIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              {props.optimisation_profile}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <CalendarDaysIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">{props.docker}</dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <CogIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              {props.executor}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <BuildingLibraryIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              {props.compute_environment}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <WrenchScrewdriverIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              {props.nextflow_version}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <DocumentIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">{props.id}</dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <TagIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="text-sm leading-6 text-gray-500 pb-6">
              {props.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2"
                >
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
