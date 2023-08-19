import { Tabs } from "@/app/components";
import { CodeText } from "./components/bashcode";
import {
  AggregateStats,
  Attachments,
  General,
  Processes,
  Status,
  WorkflowDetails,
} from "./components";

export default function Page({ params }: { params: { id: string } }) {
  const tabs = [
    { name: "Command", content: <CodeText code="echo hello" /> },
    { name: "Parameters", content: <CodeText code="echo hello" /> },
    { name: "Configuration", content: <CodeText code="echo hello" /> },
    { name: "Execution log", content: <CodeText code="echo hello" /> },
    { name: "Reports", content: <Attachments attachments={[]} /> },
  ];

  const processes = [
    {
      name: "Input check",
      status: "complete",
      totalProcesses: 1,
      completedProcesses: 1,
      failedProcesses: 0,
    },
    {
      name: "Aligning",
      status: "current",
      totalProcesses: 2,
      completedProcesses: 1,
      failedProcesses: 0,
    },
    {
      name: "Deduplicating",
      status: "waiting",
      totalProcesses: 1,
      completedProcesses: 0,
      failedProcesses: 0,
    },
  ];

  return (
    <div>
      <WorkflowDetails />
      <Tabs tabs={tabs} />

      <Status />

      <div className="container mx-auto pt-10">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <General />
          </div>

          <div className="flex-1">
            <AggregateStats />
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-10">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <Processes jobs={processes} />
          </div>

          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
}
