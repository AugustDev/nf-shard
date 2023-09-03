export type ProgressRequest = {
  tasks: Task[]
  progress: Progress
  instant?: number
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

export type Task = {
  taskId: number
  status?: string
  hash?: string
  name?: string
  exit?: number
  submit?: Date
  start?: Date
  process?: string
  tag?: string
  module?: any[]
  container?: string
  attempt?: number
  script?: string
  scratch?: string
  workdir?: string
  queue?: string
  cpus?: number
  memory?: number
  disk?: string
  time?: number
  env?: string
  errorAction?: string
  complete?: Date
  duration?: number
  realtime?: number
  pcpu?: number
  rchar?: number
  wchar?: number
  syscr?: number
  syscw?: number
  readBytes?: number
  writeBytes?: number
  pmem?: number
  vmem?: number
  rss?: number
  peakVmem?: number
  peakRss?: number
  volCtxt?: number
  invCtxt?: number
  nativeId?: string
  executor?: string
  cloudZone?: string
  machineType?: string
  priceModel?: string
}
