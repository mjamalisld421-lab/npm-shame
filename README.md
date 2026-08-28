# npm-shame

`npm-shame` measures a project's `node_modules` directory and prints a short, size-based message.

## Package manager notes

- **pnpm:** pnpm uses a link-heavy, content-addressed layout, so reported sizes can differ from a traditional npm `node_modules` tree. Dependency lifecycle scripts such as `postinstall` are limited by default unless explicitly allowed or approved under the relevant install-script policy.
- **Yarn Plug'n'Play:** Yarn PnP may not expose a traditional `node_modules` directory, so npm-shame's directory-based measurement may not apply. Depending on the Yarn configuration or policy, dependency `postinstall` scripts may also be disabled or blocked.
