import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const rename = async () => {
  const filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(filename);
  const sourceFilePath = join(__dirname, "files", "wrongFilename.txt");
  const targetFilePath = join(__dirname, "files", "properFilename.md");

  try {
    await fs.access(sourceFilePath);

    try {
      await fs.access(targetFilePath);

      throw new Error(
        "FS operation failed: properFilename file already exists"
      );
    } catch (accessError) {
      if (accessError.code === "ENOENT") {
        try {
          await fs.rename(sourceFilePath, targetFilePath);
          console.log("File was renamed successfully");
        } catch (createError) {
          console.error("Error renaming", createError.message);
        }
      } else {
        console.error("Error accessing target folder:", accessError.message);
      }
    }
  } catch (error) {
    console.error(
      "FS operation failed: error accessing source file with wrong name:",
      error.message
    );
  }
};

await rename();
