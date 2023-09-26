![build badge](https://github.com/AugustDev/nf-shard/actions/workflows/ci.yml/badge.svg)
![version badge](https://ghcr-badge.deta.dev/augustdev/nf-shard/latest_tag?color=%236d52f4&ignore=latest&label=version&trim=)
![size badge](https://ghcr-badge.deta.dev/augustdev/nf-shard/size?color=%23fa0092&tag=latest&label=image+size&trim=)

![nf-shard Logo](./assets/logo.png)

# nf-shard

nf-shard is an open source user interface for monitoring Nextflow runs, searching historical runs and analysing metrics. It was designed as drop-in replacement for community [nf-tower](https://github.com/seqeralabs/nf-tower), however it does not aim to replace Enterprise nf-tower.

[![Foo](./assets/play.png)](https://www.youtube.com/watch?v=Fzq9cqozwEU)

## Usage in Nextflow

Once nf-shard is running to integrate it into your Nextflow project you should add similar snippet to your `nextflow.config`. The exact form of this snippet will be displayed once you start nf-shard.

```nextflow
tower {
    enabled = true
    accessToken = "non-empty"
    endpoint = "http://localhost:3000/api"
}
```

## Run

Following instructions allows to run `nf-shard` locally. To run nf-shard you PostgreSQL database.

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

To run PostgreSQL for local development you can use

```
docker-compose --profile db up
```

Since connection to PostgreSQL now happens outside of docker, you should update your `.env` to specify `localhost`

```
POSTGRES_URI=postgresql://postgres:yourpassword@localhost:5432/postgres?schema=public
```

### Method 3 - Vercel

One click deployment using Vercel requires having PostgreSQL access. Video instructions below. In the video I use [Neon.tech](https://neon.tech/) free PostgreSQL version, but any provider works.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAugustDev%2Fnf-shard%2F&env=POSTGRES_URI&project-name=nf-shard&repository-name=nf-shard&demo-title=nf-shard&demo-description=Monitor%20Nextlfow%20pipelines.%20Group%20runs%20into%20workspaces&demo-url=https%3A%2F%2Fmain.d29s1tosoaghp.amplifyapp.com%2F&build-command=yarn%20generate%20%26%26%20yarn%20build%20%26%26%20npx%20prisma%20migrate%20deploy&output-directory=build)

[![Foo](./assets/vercel-deployment.png)](https://www.youtube.com/watch?v=luqc2vmKvKY)

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
