import { createReadStream } from "fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Transform } from "stream";

class Reverse extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk, encoding, callback) {
    const reversedChunk = chunk.toString().split("").reverse().join("");
    this.push(reversedChunk);
    process.stdout.write(reversedChunk);
    callback();
  }
}

const transform = async () => {
  const filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(filename);
  const fileToReadPath = join(__dirname, "files", "fileToRead.txt");
  const readStream = createReadStream(fileToReadPath);
  const reverseTransform = new Reverse();

  const errorHandler = (error) => {
    console.error(`Error reading file: ${error.message}`);
  };

  readStream.pipe(reverseTransform).on("error", errorHandler);
};

await transform();
