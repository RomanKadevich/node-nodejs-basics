import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const remove = async () => {
  const filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(filename);
  const sourceFilePath = join(__dirname, "files", "fileToRemove.txt");

  try {
    await fs.access(sourceFilePath);
    await fs.unlink(sourceFilePath);
    console.log("File was removed successfully");
  } catch (accessError) {
    console.error(
      "FS operation failed: Error deleting file:",
      accessError.message
    );
  }
};
await remove();
