import { writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const create = async () => {
  const filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(filename);
  const targetPath = join(__dirname, 'files', 'fresh.txt');

  try {
    await access(targetPath);

    throw new Error('FS operation failed: File already exists');
  } catch (err) {
   
    if (err.code === 'ENOENT') {
      try {
        await writeFile(targetPath, 'I am fresh and young');
        console.log('File created successfully:', targetPath);
      } catch (createErr) {
        console.error('Error writing file:', createErr.message);
      }
    }else{
        console.log(err)
    }
  }
};

await create();
