import { createReadStream, createWriteStream } from "fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const write = async () => {
  const filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(filename);
  const fileToReadPath = join(__dirname, "files", "fileToRead.txt");
  const fileToWritePath = join(__dirname, "files", "fileToWrite.txt");
  const readStream = createReadStream(fileToReadPath);
  const writeStream = createWriteStream(fileToWritePath);

  const errorHandler = (error) => {
    console.error(`Error reading file: ${error.message}`);
  };
  readStream.pipe(writeStream).on("error", errorHandler);
};

await write();
