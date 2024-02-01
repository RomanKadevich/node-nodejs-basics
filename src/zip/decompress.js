import { createReadStream, createWriteStream } from "fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import zlib from "node:zlib";

const decompress = async () => {
  const filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(filename);
  const fileToReadPath = join(__dirname, "files", "archive.gz");
  const compressFilePath = join(__dirname, "files", "decompress.js");
  const readStream = createReadStream(fileToReadPath);
  const writeStream = createWriteStream(compressFilePath);

  const errorHandler = (error) => {
    console.error(`Error reading file: ${error.message}`);
  };
  readStream
    .pipe(zlib.createGunzip())
    .pipe(writeStream)
    .on("error", errorHandler);
};

await decompress();
