import { access, mkdir, readdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);
const sourceFolderPath = join(__dirname, "files");
const targetFolderPath = join(__dirname, "files_copy");

try {
  await access(sourceFolderPath);

  try {
    await access(targetFolderPath);

    throw new Error("FS operation failed: Target folder already exists");
  } catch (accessError) {

    if (accessError.code === "ENOENT") {
      try {
        await mkdir(targetFolderPath);

        const files = await readdir(sourceFolderPath);

        for (const file of files) {

          const sourceFile = join(sourceFolderPath, file);
          const targetFile = join(targetFolderPath, file);

          await copyFile(sourceFile, targetFile);
        }

        console.log("Folder copied successfully");

      } catch (createError) {
        
        console.error("Error copying folder:", createError.message);
      }
    } else {

      console.error("Error accessing target folder:", accessError.message);

    }
  }
} catch (error) {

  console.error(
    "FS operation failed: error accessing source folder:",
    error.message
  );
}
