export type BeginRun = {
  workflow: Workflow;
  processNames: string[];
  towerLaunch: boolean;
  instant: number;
};

export type Workflow = {
  start: Date;
  projectDir: string;
  manifest: Manifest;
  complete: null;
  profile: string;
  homeDir: string;
  workDir: string;
  container: string;
  commitId: null;
  errorMessage: null;
  repository: null;
  containerEngine: string;
  scriptFile: string;
  userName: string;
  launchDir: string;
  runName: string;
  configFiles: string[];
  sessionId: string;
  errorReport: null;
  workflowStats: WorkflowStats;
  scriptId: string;
  revision: null;
  exitStatus: null;
  commandLine: string;
  stubRun: boolean;
  nextflow: Nextflow;
  resume: boolean;
  success: boolean;
  projectName: string;
  scriptName: string;
  duration: null;
  params: Params;
  id: string;
  configText: string;
  operationId: null;
  logFile: null;
  outFile: null;
};

export type Manifest = {
  doi: null;
  nextflowVersion: null;
  defaultBranch: string;
  version: string;
  homePage: null;
  gitmodules: null;
  description: string;
  recurseSubmodules: boolean;
  name: null;
  mainScript: string;
  author: null;
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

export type Params = {
  reads: string;
  reference_dir: string;
  reference_filename: string;
  reference: string;
  map: Map;
  optical: Optical;
  min: Min;
  max: Max;
  original: Original;
  merge_context: boolean;
  outdir: string;
  methyl_kit: boolean;
};

export type Map = {
  quality: number;
};

export type Max = {
  var: Var;
};

export type Var = {
  fraction: number;
};

export type Min = {
  depth: number;
};

export type Optical = {
  distance: number;
};

export type Original = {
  bottom: string;
  top: string;
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
