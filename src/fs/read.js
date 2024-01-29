import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const read = async () => {
  const filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(filename);
  const filePath = join(__dirname, "files", "fileToRead.txt");

  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log(data);
  } catch (accessError) {
    console.error(
      "FS operation failed: Error access file:",
      accessError.message
    );
  }
};

await read();
