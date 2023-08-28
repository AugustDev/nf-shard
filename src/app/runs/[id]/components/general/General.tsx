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
import { Workflow } from "@prisma/client";

import { fullDateTime } from "@common/index";
import { Container } from "@/app/components";

type GeneralProps = {
  workflow: Workflow;
};

export const General: React.FC<GeneralProps> = ({ workflow }: GeneralProps) => {
  return (
    <Container sectionName="General">
      <div className="flex w-full flex-none gap-x-4 border-gray-900/5">
        <dt className="flex-none">
          <UserCircleIcon
            className="h-6 w-5 text-gray-400"
            aria-hidden="true"
          />
        </dt>
        <dd className="text-sm font-medium leading-6 text-gray-900">
          {workflow.userName}
        </dd>
      </div>
      <div className="mt-4 flex w-full flex-none gap-x-4 ">
        <dt className="flex-none">
          <CalendarDaysIcon
            className="h-6 w-5 text-gray-400"
            aria-hidden="true"
          />
        </dt>
        <dd className="text-sm leading-6 text-gray-500">
          <time dateTime="2023-01-31">{fullDateTime(workflow.start)}</time>
        </dd>
      </div>
      <div className="mt-4 flex w-full flex-none gap-x-4">
        <dt className="flex-none">
          <FingerPrintIcon
            className="h-6 w-5 text-gray-400"
            aria-hidden="true"
          />
        </dt>
        <dd className="text-sm leading-6 text-gray-500">{workflow.runName}</dd>
      </div>
      <div className="mt-4 flex w-full flex-none gap-x-4">
        <dt className="flex-none">
          <FolderIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
        </dt>
        <dd className="text-sm leading-6 text-gray-500">{workflow.workDir}</dd>
      </div>
      <div className="mt-4 flex w-full flex-none gap-x-4">
        <dt className="flex-none">
          <CalendarDaysIcon
            className="h-6 w-5 text-gray-400"
            aria-hidden="true"
          />
        </dt>
        <dd className="text-sm leading-6 text-gray-500">
          {workflow.manifest.description}
        </dd>
      </div>
      <div className="mt-4 flex w-full flex-none gap-x-4">
        <dt className="flex-none">
          <CalendarDaysIcon
            className="h-6 w-5 text-gray-400"
            aria-hidden="true"
          />
        </dt>
        <dd className="text-sm leading-6 text-gray-500">
          {workflow.containerEngine}
        </dd>
      </div>
      <div className="mt-4 flex w-full flex-none gap-x-4">
        <dt className="flex-none">
          <CogIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
        </dt>
        <dd className="text-sm leading-6 text-gray-500">TBD</dd>
      </div>
      <div className="mt-4 flex w-full flex-none gap-x-4">
        <dt className="flex-none">
          <BuildingLibraryIcon
            className="h-6 w-5 text-gray-400"
            aria-hidden="true"
          />
        </dt>
        <dd className="text-sm leading-6 text-gray-500">
          {workflow.scriptName}
        </dd>
      </div>
      <div className="mt-4 flex w-full flex-none gap-x-4">
        <dt className="flex-none">
          <WrenchScrewdriverIcon
            className="h-6 w-5 text-gray-400"
            aria-hidden="true"
          />
        </dt>
        <dd className="text-sm leading-6 text-gray-500">
          {workflow.nextflow.version}
        </dd>
      </div>
      <div className="mt-4 flex w-full flex-none gap-x-4">
        <dt className="flex-none">
          <DocumentIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
        </dt>
        <dd className="text-sm leading-6 text-gray-500">{workflow.id}</dd>
      </div>
      <div className="mt-4 flex w-full flex-none gap-x-4">
        <dt className="flex-none">
          <TagIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
        </dt>
        {/* <dd className="text-sm leading-6 text-gray-500 pb-6">
              {props.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2"
                >
                  {tag}
                </span>
              ))}
            </dd> */}
      </div>
    </Container>
  );
};
