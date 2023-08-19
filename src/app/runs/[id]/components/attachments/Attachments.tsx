import { PaperClipIcon } from "@heroicons/react/20/solid";

type Attachment = {
  name: string;
  kind: string;
  size: string;
  path?: string;
  link: string;
};

type AttachmentProps = {
  attachments: Attachment[];
};

export const Attachments: React.FC<AttachmentProps> = ({ attachments }) => {
  return (
    <div className="px-4 py-6 sm:grid sm:gap-4 sm:px-0">
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        <ul
          role="list"
          className="divide-y divide-gray-100 rounded-md border border-gray-200"
        >
          <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
            <div className="flex w-0 flex-1 items-center">
              <PaperClipIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <p className="font-medium">PDF</p>
                <span className="text-gray-200" aria-hidden="true">
                  |
                </span>
                <span className="truncate font-medium">
                  resume_back_end_developer.pdf
                </span>
                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
              </div>
            </div>
            <div className="ml-4 flex flex-shrink-0 space-x-4">
              <button
                type="button"
                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
              >
                Download
              </button>
              <span className="text-gray-200" aria-hidden="true">
                |
              </span>
              <button
                type="button"
                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
              >
                Preview
              </button>
            </div>
          </li>
          <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
            <div className="flex w-0 flex-1 items-center">
              <PaperClipIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />

              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <p className="font-medium">PDF</p>
                <span className="text-gray-200" aria-hidden="true">
                  |
                </span>
                <span className="truncate font-medium">
                  coverletter_back_end_developer.pdf
                </span>
                <span className="flex-shrink-0 text-gray-400">4.5mb</span>
              </div>
            </div>
            <div className="ml-4 flex flex-shrink-0 space-x-4">
              <button
                type="button"
                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
              >
                Download
              </button>
              <span className="text-gray-200" aria-hidden="true">
                |
              </span>
              <button
                type="button"
                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
              >
                Preview
              </button>
            </div>
          </li>
        </ul>
      </dd>
    </div>
  );
};
