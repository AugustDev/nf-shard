export type BeginRunRequest = {
  workflow: Workflow;
  processNames: string[];
  towerLaunch: boolean;
  instant: number;
};

export type Workflow = {
  start: Date;
  projectDir: string;
  manifest: Manifest;
  complete?: Date;
  profile: string;
  homeDir: string;
  workDir: string;
  container: string;
  commitId?: string;
  errorMessage?: string;
  repository?: string;
  containerEngine: string;
  scriptFile: string;
  userName: string;
  launchDir: string;
  runName: string;
  configFiles: string[];
  sessionId: string;
  errorReport?: string;
  workflowStats: WorkflowStats;
  scriptId: string;
  revision?: string;
  exitStatus: number;
  commandLine: string;
  stubRun: boolean;
  nextflow: Nextflow;
  resume: boolean;
  success: boolean;
  projectName: string;
  scriptName: string;
  duration?: number;
  params: any;
  id: string;
  configText: string;
  operationId?: string;
  logFile?: string;
  outFile?: string;
  tags?: string;
  status?: string;
};

export type Manifest = {
  doi?: string;
  nextflowVersion?: string;
  defaultBranch: string;
  version: string;
  homePage?: string;
  gitmodules?: string;
  description: string;
  recurseSubmodules: boolean;
  name?: string;
  mainScript: string;
  author?: string;
};

export type Nextflow = {
  version: string;
  build: number;
  timestamp: Date;
  enable: Enable;
};

export type Enable = {
  dsl: number;
};

export type WorkflowStats = {
  succeededCount: number;
  computeTimeFmt: string;
  cachedCount: number;
  processes: Process[];
  changeTimestamp: number;
  peakRunning: number;
  succeedDuration: number;
  cachedPct: number;
  loadMemory: number;
  succeedCountFmt: string;
  failedPct: number;
  ignoredCount: number;
  submittedCount: number;
  peakMemory: number;
  succeedPct: number;
  succeedCount: number;
  runningCount: number;
  pendingCount: number;
  loadCpus: number;
  cachedDuration: number;
  abortedCount: number;
  failedDuration: number;
  failedCount: number;
  loadMemoryFmt: string;
  retriesCount: number;
  cachedCountFmt: string;
  progressLength: number;
  peakMemoryFmt: string;
  failedCountFmt: string;
  ignoredCountFmt: string;
  peakCpus: number;
  ignoredPct: number;
};

export type Process = {
  index: number;
  pending: number;
  ignored: number;
  loadCpus: number;
  succeeded: number;
  running: number;
  retries: number;
  peakRunning: number;
  name: string;
  loadMemory: number;
  stored: number;
  terminated: boolean;
  aborted: number;
  failed: number;
  peakCpus: number;
  peakMemory: number;
  cached: number;
  submitted: number;
};
