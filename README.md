![nf-shard Logo](./assets/logo.png)

# nf-shard

nf-shard is an open source user interface for monitoring Nextflow runs, searching historical runs and analysing metrics. It was designed as drop-in replacement for community [nf-tower](https://github.com/seqeralabs/nf-tower), however it does not aim to replace Enterprise nf-tower.

[![Foo](./assets/play.png)](https://www.youtube.com/watch?v=Fzq9cqozwEU)

## Usage

Following instructions allows to run `nf-shard` locally.

### Method 1 - docker-compose

docker-compose will spin up PostgreSQL database and the server.

```bash
git clone git@github.com:AugustDev/nf-shard.git
cd nf-shard
docker-compose --profile all up
```

If you have PostgreSQL running externally then you only need to launch the server. In this case update your `.env` with `POSTGRES_URI` and run

```bash
git clone git@github.com:AugustDev/nf-shard.git
cd nf-shard
docker-compose --profile server up
```

Add tower server details in your Nextflow config.

```nextflow
tower {
    enabled = true
    accessToken = "non-empty"
    endpoint = "http://localhost:3000/api"
}
```

Done! If you navigate to `http://localhost:3000` and run Nextflow workflow you should be able to see progress in the UI.

Note - `accessToken` can by any non-empty string.

### Method 2 - yarn

If you already have running PostgreSQL database, you can run build the project using yarn package manager. To specify your database login edit `.env`. If you are developer you would prefer using this approach.

```
yarn
yarn migrate
yarn build
yarn run
```

Not that `yarn migrate` requires connection to databse, so you should update `.env` file.

### Method 3 - Vercel

One click deployment using Vercel requires having PostgreSQL running.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAugustDev%2Fnf-shard%2F&env=POSTGRES_URI&project-name=nf-shard&repository-name=nf-shard&demo-title=nf-shard&demo-description=Monitor%20Nextlfow%20pipelines.%20Group%20runs%20into%20workspaces&demo-url=https%3A%2F%2Fmain.d29s1tosoaghp.amplifyapp.com%2F&build-command=yarn%20generate%20%26%26%20yarn%20build&output-directory=build)

## Stack

- NextJS/React/Typescript
- PostgreSQL
- Prisma ORM

I was picking the a stack with large communities to maximise open source contribution from the Nextflow community.

## Features

- Indexed search by workflow ID, run name, user name, tag, projeect name, before date, after date.
- Search supports multiple `AND` conditions.
- Ability to attach multiple tags for each workflow. Tags are visible in the UI and can be used in search.
- Workspaces
- List of historical runs
- Run details
- `nf-tower` plugin compatible API.

## Roadmap

- Authentication
- Dedicated plugin
- Upload/view execution logs
- Download reports
- [tRPC](https://trpc.io/) client/server communication

## Development

Useful during development

```
docker buildx build --platform linux/amd64 -t nf-shard:semver . --load
docker run -it nf-shard:semver /bin/sh
```
