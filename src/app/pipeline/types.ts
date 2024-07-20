export type TComputeEnvOverride = {
	name: string
	content: string
}

export type TKVArg = {
	id: string
	key: string
	value: string
	required: boolean
	flag: boolean
}

const batchDefaultConfigOverride = ``

const floatDefaultConfigOverride = `process {
    executor = 'float'
    errorStrategy = 'retry'
    extra = '--dataVolume [opts=" --cache-dir /mnt/jfs_cache "]jfs://\${jfs_private_ip}:6868/1:/mnt/jfs --dataVolume [size=120]:/mnt/jfs_cache --vmPolicy [retryLimit=10,retryInterval=300s] --migratePolicy [disable=true] --dumpMode incremental --snapLocation [mode=rw]s3://cfdx-juicefs-snapshots --dataVolume [endpoint=s3.us-east-1.amazonaws.com,mode=r]s3://cfdx-experiments/:/cfdx-experiments --dataVolume [endpoint=s3.us-east-1.amazonaws.com,mode=r]s3://cfdx-research-data/:/cfdx-research-data --dataVolume [endpoint=s3.us-east-1.amazonaws.com,mode=r]s3://cfdx-raw-data/:/cfdx-raw-data'
}
`

export const computeEnvOverrides: TComputeEnvOverride[] = [
	{ name: "awsbatch", content: batchDefaultConfigOverride },
	{ name: "google-batch", content: batchDefaultConfigOverride },
	{ name: "float", content: floatDefaultConfigOverride },
]
