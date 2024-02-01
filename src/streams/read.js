import { createReadStream } from "fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const read = async () => {
  const filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(filename);
  const filePath = join(__dirname, "files", "fileToRead.txt");
  const readStream = createReadStream(filePath);
  const dataHandler = (chunk) => {
    process.stdout.write(chunk);
  }
  const errorHandler = (error) => {
    console.error(`Error reading file: ${error.message}`);
  }
  readStream.on('data',dataHandler );
  readStream.on('error',errorHandler) 
};

await read();
