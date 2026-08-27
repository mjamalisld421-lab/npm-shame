const fs = require("node:fs");
const path = require("node:path");

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

function main() {
  const nodeModulesPath = path.join(process.cwd(), "node_modules");

  try {
    const totalBytes = calculateDirectorySize(nodeModulesPath);
    console.log(`node_modules size: ${totalBytes} bytes`);
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

module.exports = { calculateDirectorySize };
