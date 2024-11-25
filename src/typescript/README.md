# How to build and deploy this application

## Ensure the environment variables are loaded

This repository loads environment variables in multiple ways.

To load environment variables while running test scripts, each `package.json`
file in the `sdk` folder specifies how to load these environment variables. Most
scripts run the `dotenv-cli` package as a wrapper, like so:

```shell
# In sdk/package.json:
"test": "dotenv -e ../ci.env -- pnpm jest",

# I run this command
pnpm run test

# Which loads the env variables in `../ci.env` and runs `jest`
```

Where `../ci.env` is the environment file located in the `typescript` parent
directory.

To avoid having to define environment variables in multiple places, we've
intentionally omitted environment variables from the `frontend` directory to
enforce that the project be built and run in a certain order.

## Copy the `example.env` file to a `.env` file

Most commands load `.env.local` first then `.env`, so copy the environment
example file to your own file.

```shell
cp example.env .env
```

## Run the `frontend` application

```shell
cd src/typescript
pnpm i

# to rebuild everything and run
pnpm run build
pnpm run start

# or, for hot reloads (does not rebuild)
pnpm run dev
```

Sometimes, `turbo` and `next` have build caches that persist and cause errors.
This can be avoided with a clever build process, however, you can also just
delete the `.next` and `.turbo` folders in each directory.

You can also run:

```shell
pnpm run full-clean
```

Note this remove's each project's `node_modules`, although it does not remove
the `pnpm-lock.yaml` file.

## Vercel deployment

To allow Vercel to clone the private submodule, you'll need to grant it access.

On GitHub:

1. Create a private personal fork of the charting library named
   `charting_library`.
1. Create a fine-grained personal access token:
   1. Select repository access for only your `charting_library` fork.
   1. Grant read-only access to `Repository permissions > Contents`.
   1. Grant read-only access to `Repository permissions > Metadata`.

On Vercel project settings:

1. General settings:
   1. `Build & Development Settings > Install Command`:
      `pnpm run vercel-install`
   1. `Root Directory`: `src/typescript/frontend`
1. Environment variables:
   1. All variables under `example.env`.
   1. `GITHUB_ACCESS_TOKEN`: the token you generated above.
   1. `TRADING_VIEW_REPO_OWNER`: your GitHub username.

This will allow Vercel to run the `frontend/vercel-install` script in order to
download the charting library from your private personal fork.
