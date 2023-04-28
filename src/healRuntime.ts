import * as fs from 'fs';
import { suggestRuntimeFix } from '../lib/langchain'

(async () => {
  const filepath = './examples/error-run-time.ts';
  const response = await suggestRuntimeFix(filepath);
  console.log(`Explanation: '${response.description}'`);

  if (!response.description.includes('RuntimeErrorNotFound')) {
    // const filepath = './examples/error-run-time-fix.ts';
    const codeContent = fs.readFileSync(filepath).toString();
    fs.writeFileSync(codeContent, response.source);
    console.log(`Successfully fixed runtime error in path: '${filepath}'`);
  } else {
    console.log(`RuntimeErrorNotFound: Skipping file '${filepath}'`);
  }
})();
