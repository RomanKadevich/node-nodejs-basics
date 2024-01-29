import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const list = async () => {
  const filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(filename);
  const folderPath = join(__dirname, "files");

  try {
    const files = await fs.readdir(folderPath);
    files.forEach((file) => console.log(file));
  } catch (accessError) {
    console.error(
      "FS operation failed: Error access folder:",
      accessError.message
    );
  }
};

await list();
