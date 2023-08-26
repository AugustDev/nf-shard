import { Progress, Task, Workflow } from "@prisma/client";

export type RunResponse = {
  workflow: Workflow;
  tasks: Task[];
  progress: Progress;
};
