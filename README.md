# Overview

> Let thy code heal.

Github Action that tries to heal your code on build errors by opening a PR with potential code fixes.

## How it works
- If build error,
  - Output files with error and a fix suggeston,
  - Checkout branch-name with suffix `{branchName}-fix`,
  - Open PR to `{branchName}` with description,
  - Tag `{branchName}` author for approval.
  - Success ✨
- Else, proceed.

## Setup
### Usage

```yml
- name: Run CodeHeal Github Action
  if: failure()
  uses: gilbertly/codeheal@v1
  with:
    build-output-file: build_output_${{ github.run_id }}.txt  # (required) build output file
    openai-key: ${{ secrets.OPENAI_API_KEY }}                 # (required) perms: fetch code-fix suggestions
    github-key: ${{ secrets.GITHUB_TOKEN }}                   # (required) perms: open pr with code fixes
```

### Development: Running Locally
Configure Nectos by following the installation instructions from the official documentation here. Once configured, follow-through the commands below to run Github actions locally from the examples folder:

```sh
# choose an example to run from ./examples
$ cd ./examples/nodejs

# list available github actions
$ act -l

# dry-run local github actions
$ act -n

# run github actions locally in verbose
$ act -v --env-file .env
```


## Todo: Improvements
- [] Add Nectos to run github actions locally (check on running openai with node16)
- [] Refactor to wrap around the run function with input for build command
- [] Add regression charts to opened PRs.
- [] Add rate upstash limiting & exponential backoff.
- [] Add metadata management in ddb/supabase (user, file, error count)
- [] Add simple nextjs UI with Github supabase auth.
- [] Add integrations: slack, email, sentry
- [] Add AI commits when opening PR
- [] Add middy middleware for runtime errors


## Known Limitations
- 1. Nodejs support for v18+
- 2. Uncertain security concerns; data protection.