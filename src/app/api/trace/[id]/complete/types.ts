export type CompleteRunRequest = {
  workflow: Workflow
  metrics: Metric[]
  progress: Progress
  instant: number
}

export type Metric = {
  cpuUsage: Measurement
  process: string
  mem: Measurement
  memUsage: Measurement
  timeUsage?: number
  vmem: Measurement
  reads: Measurement
  cpu: Measurement
  time: Measurement
  writes: Measurement
}

export type Measurement = {
  mean: number
  min: number
  q1: number
  q2: number
  q3: number
  max: number
  minLabel: string
  maxLabel: string
  q1Label: string
  q2Label: string
  q3Label: string
}

export type Progress = {
  pending?: number
  ignored?: number
  loadCpus?: number
  loadMemory?: number
  processes?: any
  aborted?: number
  succeeded?: number
  peakMemory?: number
  peakCpus?: number
  failed?: number
  running?: number
  retries?: number
  peakRunning?: number
  cached?: number
  submitted?: number
  index?: number
  name?: string
  stored?: number
  terminated?: boolean
}

export type Workflow = {
  start: Date
  projectDir: string
  manifest: Manifest
  complete: Date
  profile: string
  homeDir: string
  workDir: string
  container: string
  commitId?: string
  errorMessage?: string
  repository?: string
  containerEngine: string
  scriptFile: string
  userName: string
  launchDir: string
  runName: string
  configFiles: string[]
  sessionId: string
  errorReport?: string
  workflowStats: Stats
  scriptId: string
  revision?: string
  exitStatus: number
  commandLine: string
  stubRun: boolean
  nextflow: Nextflow
  stats: Stats
  resume: boolean
  success: boolean
  projectName: string
  scriptName: string
  duration: number
  params: Params
  id: string
  configText: string
  operationId?: string
  logFile?: string
  outFile?: string
}

export type Manifest = {
  doi?: string
  nextflowVersion?: string
  defaultBranch: string
  version: string
  homePage?: string
  gitmodules?: string
  description: string
  recurseSubmodules: boolean
  name?: string
  mainScript: string
  author?: string
}

export type Nextflow = {
  version: string
  build: number
  timestamp: Date
  enable: Enable
}

export type Enable = {
  dsl: number
}

export type Params = {
  reads: string
  reference_dir: string
  reference_filename: string
  reference: string
  map: Map
  optical: Optical
  min: Min
  max: Max
  original: Original
  merge_context: boolean
  outdir: string
  methyl_kit: boolean
}

export type Map = {
  quality: number
}

export type Max = {
  var: Var
}

export type Var = {
  fraction: number
}

export type Min = {
  depth: number
}

export type Optical = {
  distance: number
}

export type Original = {
  bottom: string
  top: string
}

export type Stats = {
  succeededCount: number
  computeTimeFmt: string
  cachedCount: number
  processes: any
  changeTimestamp: number
  peakRunning: number
  succeedDuration: number
  cachedPct: number
  loadMemory: number
  succeedCountFmt: string
  failedPct: number
  ignoredCount: number
  submittedCount: number
  peakMemory: number
  succeedPct: number
  succeedCount: number
  runningCount: number
  pendingCount: number
  loadCpus: number
  cachedDuration: number
  abortedCount: number
  failedDuration: number
  failedCount: number
  loadMemoryFmt: string
  retriesCount: number
  cachedCountFmt: string
  progressLength: number
  peakMemoryFmt: string
  failedCountFmt: string
  ignoredCountFmt: string
  peakCpus: number
  ignoredPct: number
}
