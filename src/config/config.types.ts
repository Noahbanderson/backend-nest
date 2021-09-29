export type NodeEnv = 'prod' | 'dev' | 'test'

export type Process = 'api' | 'worker' | 'repl'

export type EnvConfig = {
	NODE_ENV: NodeEnv
	PROCESS: Process
	PORT: string
	PG_HOST: string
	PG_USERNAME: string
	PG_PASSWORD: string
	PG_DATABASE: string
	REDIS_HOST: string
	// [key: string]: string;
}

export type ConfigOptions = {
	folder: string
}
