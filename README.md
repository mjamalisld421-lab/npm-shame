# npm-shame

`npm-shame` measures a project's `node_modules` directory and prints a short, size-based message in a colored terminal box.

## What it does

During installation, npm-shame recursively measures the consuming project's `node_modules` directory, selects a message for its size, and prints the result. It can also be run directly.

## Install

The package has not been published yet. After a future npm release, the expected installation command will be:

```sh
npm install npm-shame
```

For current local development, install this repository by its filesystem path:

```sh
npm install /path/to/npm-shame
```

## Usage

The message runs automatically through npm's `postinstall` lifecycle when install scripts are enabled. To run an installed local copy manually:

```sh
node node_modules/npm-shame/index.js
```

## Disable postinstall output

Set `NPM_SHAME_DISABLE=1` while installing. The disabled path is silent and exits successfully.

PowerShell:

```powershell
$env:NPM_SHAME_DISABLE="1"
npm install npm-shame
Remove-Item Env:NPM_SHAME_DISABLE
```

## How size measurement works

The package recursively reads filesystem metadata, resolves links to canonical paths, and records visited paths so linked workspace content is not traversed twice and link cycles terminate safely. It does not execute files found during measurement.

## Package manager notes

- **pnpm:** pnpm uses a link-heavy, content-addressed layout, so reported sizes can differ from a traditional npm `node_modules` tree. Dependency lifecycle scripts such as `postinstall` are limited by default unless explicitly allowed or approved under the relevant install-script policy.
- **Yarn Plug'n'Play:** Yarn PnP may not expose a traditional `node_modules` directory, so npm-shame's directory-based measurement may not apply. Depending on the Yarn configuration or policy, dependency `postinstall` scripts may also be disabled or blocked.

## Security and lifecycle scripts

npm lifecycle scripts can execute package code automatically during installation. Users and environments can disable or restrict install scripts according to their security policy; npm-shame also provides the `NPM_SHAME_DISABLE` opt-out described above.
