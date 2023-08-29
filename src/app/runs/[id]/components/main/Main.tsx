"use client";

import { RunResponse } from "@/app/api/runs/[id]/types";
import { Progress, Task, Workflow } from "@prisma/client";
import {
  AggregateStats,
  Attachments,
  CodeText,
  Configuration,
  DataViewer,
  General,
  MetricsOverview,
  Processes,
  Status,
  TaskDetails,
  TasksTable,
  Utilisation,
  WorkflowDetails,
} from "../";
import { Tabs } from "@/app/components/tabs/Tabs";
import { useEffect, useRef, useState } from "react";
import { SlideOver } from "@/app/components";
import { toast } from "react-hot-toast";

type PageProps = {
  workflow: Workflow;
  tasks: Task[];
  progress: Progress;
};

export const MainRun = (props: PageProps) => {
  const [workflow, setWorkflow] = useState<Workflow>(props.workflow);
  const [tasks, setTasks] = useState<Task[]>(props.tasks);
  const [progress, setProgress] = useState<Progress>(props.progress);
  const tasksRef = useRef<Task[]>();
  const shouldPoll = useRef<boolean>(true);
  const [selectedTask, setselectedTask] = useState<Task | undefined>();

  const fetchData = async () => {
    if (workflow.complete) {
      shouldPoll.current = false;
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/runs/${workflow.id}`,
      {
        cache: "no-store",
      }
    );
    const result: RunResponse = await response.json();

    console.log(tasks);
    // handleCompletedTasks(tasks, result.tasks);

    setWorkflow(result.workflow);
    setTasks(result.tasks);
    setProgress(result.progress);

    if (result.workflow.complete) {
      shouldPoll.current = false;
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (shouldPoll.current) {
        fetchData();
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const previousTasks = tasksRef.current;
    if (previousTasks) {
      tasks.forEach((currentTask) => {
        const prevTask = previousTasks.find((t) => t.id === currentTask.id);

        if (!prevTask) {
          return;
        }

        if (
          prevTask.data.status === "RUNNING" &&
          currentTask.data.status === "COMPLETED"
        ) {
          toast.success(<span>{currentTask.data.name} completed.</span>, {
            duration: 6000,
          });
        }
      });
    }

    tasksRef.current = tasks;
  }, [tasks]);

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
  return (
    <>
      <SlideOver
        open={!!selectedTask}
        setOpen={function (status: Boolean): void {
          setselectedTask(undefined);
        }}
      >
        <div>{selectedTask && <TaskDetails task={selectedTask} />}</div>
      </SlideOver>

      <WorkflowDetails
        run_name={workflow?.manifest.description || ""}
        workflow_name={workflow?.runName || ""}
        className="mb-12"
        isLoading={!workflow.complete}
      />
      <Tabs tabs={tabs} className="py-5 px-5" panelClassName="max-h-96" />
      {workflow && <Status progress={progress} className="pt-8" />}
      <div className="container mx-auto pt-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <General workflow={workflow} />
          </div>

          <div className="flex-1">
            <AggregateStats
              tasks={tasks}
              wallTime={workflow.duration}
              starts={workflow.start}
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            {<Processes processes={progress.processes} />}
          </div>

          <div className="flex-1">
            <Utilisation
              tasks={tasks}
              peakCpus={workflow.stats.peakCpus}
              loadCpus={workflow.stats.loadCpus}
            />
          </div>
        </div>
      </div>
      {tasks.length > 0 && (
        <TasksTable
          tasks={tasks}
          className="mt-8"
          onTaskClick={setselectedTask}
        />
      )}

      <MetricsOverview className="mt-8 h-full" metrics={workflow.metrics} />
    </>
  );
};
