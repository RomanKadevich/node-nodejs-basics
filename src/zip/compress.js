import { createReadStream, createWriteStream } from "fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import zlib from "node:zlib";

const compress = async () => {
  const filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(filename);
  const fileToReadPath = join(__dirname, "files", "fileToCompress.txt");
  const compressFilePath = join(__dirname, "files", "archive.gz");
  const readStream = createReadStream(fileToReadPath);
  const writeStream = createWriteStream(compressFilePath);

  const errorHandler = (error) => {
    console.error(`Error reading file: ${error.message}`);
  };
  readStream
    .pipe(zlib.createGzip())
    .pipe(writeStream)
    .on("error", errorHandler);
};

await compress();
