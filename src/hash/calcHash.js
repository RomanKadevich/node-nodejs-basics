import { createReadStream } from "fs";
import { fileURLToPath } from "node:url";
import { createHash } from "crypto";
import { dirname, join } from "node:path";

const calculateHash = async () => {
  try {
    const filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(filename);
    const filePath = join(__dirname, "files", "fileToCalculateHashFor.txt");
    const fileStream = createReadStream(filePath);
    const hashAlgorithm = createHash("sha256");

    for await (const chunk of fileStream) {
      hashAlgorithm.update(chunk);
    }
    const hashResult = hashAlgorithm.digest("hex");
    
    console.log(hashResult);
  } catch (error) {
    throw error;
  }
};
await calculateHash();
