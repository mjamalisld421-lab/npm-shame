# npm-shame

`npm-shame` measures a project's `node_modules` directory and prints a short, size-based message.

## Package manager notes

- **pnpm:** pnpm uses a link-heavy, content-addressed dependency layout, so filesystem traversal and reported sizes can differ from a traditional npm `node_modules` tree. npm-shame follows links but counts each canonical filesystem path once.
- **Yarn Plug'n'Play:** Yarn PnP may not create a traditional `node_modules` directory, so npm-shame's directory-based measurement may not apply.
- **Install scripts:** npm-shame runs through `postinstall`. Package managers, environments, or project policies may disable lifecycle scripts or require explicit approval, in which case the message may not run automatically.
