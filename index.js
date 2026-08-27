const fs = require("node:fs");
const path = require("node:path");
const boxen = require("boxen");
const chalk = require("chalk");

const MEGABYTE = 1024 * 1024;

const SIZE_LIMITS = [
  { limitBytes: 10 * MEGABYTE, message: "Barely any baggage. npm approves." },
  {
    limitBytes: 100 * MEGABYTE,
    message: "A modest dependency backpack. Still portable.",
  },
  {
    limitBytes: 500 * MEGABYTE,
    message: "That dependency suitcase is getting heavy.",
  },
];

const LARGEST_SIZE_MESSAGE =
  "Your node_modules folder has developed its own gravitational pull.";

function calculateDirectorySize(directoryPath) {
  let totalBytes = 0;
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isSymbolicLink()) {
      continue;
    }

    if (entry.isDirectory()) {
      totalBytes += calculateDirectorySize(entryPath);
    } else if (entry.isFile()) {
      totalBytes += fs.statSync(entryPath).size;
    }
  }

  return totalBytes;
}

function getShameMessageForSize(totalBytes) {
  const matchingLimit = SIZE_LIMITS.find(
    ({ limitBytes }) => totalBytes < limitBytes,
  );

  return matchingLimit ? matchingLimit.message : LARGEST_SIZE_MESSAGE;
}

function main() {
  const nodeModulesPath = path.join(process.cwd(), "node_modules");

  try {
    const totalBytes = calculateDirectorySize(nodeModulesPath);
    const message = getShameMessageForSize(totalBytes);

    console.log(`node_modules size: ${totalBytes} bytes`);
    console.log(boxen(chalk.yellow(message), { borderStyle: "round" }));
  } catch (error) {
    if (error && error.code === "ENOENT") {
      console.error(`No node_modules folder found in ${process.cwd()}.`);
    } else {
      console.error(`Could not measure node_modules: ${error.message}`);
    }
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { calculateDirectorySize, getShameMessageForSize };
