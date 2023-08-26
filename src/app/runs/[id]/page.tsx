import { prisma } from "@services/postgres/prisma";
import { Tabs } from "@/app/components";
import {
  CodeText,
  AggregateStats,
  Attachments,
  General,
  Processes,
  Status,
  WorkflowDetails,
  DataViewer,
  Configuration,
} from "./components";
import { Progress, Task, Workflow } from "@prisma/client";
import { RunResponse } from "@/app/api/runs/[id]/types";

export default async function Page({ params }: { params: { id: string } }) {
  const { workflow, tasks, progress } = await getData(params.id);

  const tabs = [
    {
      name: "Command",
      content: <CodeText code={workflow?.commandLine || ""} />,
    },
    {
      name: "Parameters",
      content: <DataViewer data={workflow?.params || ""} />,
    },
    {
      name: "Configuration",
      content: (
        <Configuration
          files={workflow?.configFiles || []}
          configText={workflow?.configText || ""}
        />
      ),
    },
    { name: "Execution log", content: <CodeText code="echo hello" /> },
    { name: "Reports", content: <Attachments attachments={[]} /> },
  ];

  if (!workflow) {
    return <p>Missing workflow</p>;
  }

  return (
    <>
      <WorkflowDetails
        run_name={workflow?.manifest.description || ""}
        workflow_name={workflow?.runName || ""}
        status={""}
        className="mb-12"
      />
      <Tabs tabs={tabs} />

      {workflow && <Status progress={progress} className="pt-8" />}

      <div className="container mx-auto pt-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <General workflow={workflow} />
          </div>

          <div className="flex-1">
            <AggregateStats tasks={tasks} wallTime={workflow.duration} />
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-10">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            {<Processes processes={progress.processes} />}
          </div>

          <div className="flex-1"></div>
        </div>
      </div>
    </>
  );
}

const getData = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/runs/${id}`, {
      cache: "no-store",
    });
    const result: RunResponse = await response.json();

    return {
      isLoading: false,
      workflow: result.workflow,
      tasks: result.tasks,
      progress: result.progress,
    };
  } catch (e) {
    console.error(e);
  }

  return {
    isLoading: false,
    workflow: undefined,
  };
};
