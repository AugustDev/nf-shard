import { mongoClient } from "@services/index";
import { SearchBar, StatusTag, Tag } from "@components/index";

type Run = {
  id: string;
  project_name: string;
  workflow_name: string;
  tags: string[];
  description: string;
  started_at: string;
  run_time: string;
  status: string;
};

const runs: Run[] = [
  {
    id: "1",
    project_name: "Methylation Extraction",
    workflow_name: "marvelous_fermat",
    tags: ["Methylation"],
    description: "Member",
    started_at: "2020-01-07",
    run_time: "20min",
    status: "success",
  },
  {
    id: "2",
    project_name: "Feature Extraction",
    workflow_name: "hungry_lion",
    tags: ["Features"],
    description: "Member",
    started_at: "2020-01-07",
    run_time: "20min",
    status: "error",
  },
  {
    id: "3",
    project_name: "Downstream Analysis",
    workflow_name: "friendly_murdock",
    tags: ["Analsysis", "Features"],
    description: "Member",
    started_at: "2020-01-07",
    run_time: "20min",
    status: "pending",
  },
];

export default async function Page() {
  const props = await getData();
  return (
    <div>
      <SearchBar value="" />
      <div className="mt-8 flow-root bg-white px-8 rounded-md">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <tbody className="divide-y divide-gray-200 bg-white">
                {props.runs.map((run) => (
                  <tr key={run.id}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {run.project_name}
                          </div>
                          <div className="mt-1 text-gray-500">
                            {run.workflow_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{run.workflow_name}</div>
                      <div className="mt-1 text-gray-500">
                        {run.description}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <StatusTag name={run.status} type={run.status} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="font-medium text-gray-900">
                        {run.run_time}
                      </div>
                      <div className="mt-1 text-gray-500">{run.started_at}</div>
                    </td>
                    <td className="text-right">
                      {run.tags.map((tag) => (
                        <Tag key={tag} name={tag} />
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

type TRunsPageProps = {
  isLoading: boolean;
  runs: Run[];
};

const getData = async (): Promise<TRunsPageProps> => {
  try {
    const client = await mongoClient;

    const movies = await client.collection("test1").find({}).toArray();

    console.log(movies);
  } catch (e) {
    console.error(e);
  }

  return {
    isLoading: false,
    runs: runs,
  };
};
