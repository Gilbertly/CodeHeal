import * as fs from 'fs';
import * as core from '@actions/core';
import { getFilename, suggestFix } from '../lib/langchain'

(async () => {
  try {
    const outputFile = process.env.BUILD_OUTPUT_FILE || './example/build_output.txt'
    const buildOutput = fs.readFileSync(outputFile).toString();

    const errorFiles = await getFilename(buildOutput);
    core.info(`Files found: ${errorFiles}`);

    if (!errorFiles.includes('FileNotFound')) {
      const outputMetadata: any = [];
      for (let filepath of errorFiles) {
        const fixedCode = await suggestFix(buildOutput, filepath);
        const metadata = {
          source: filepath,
          description: fixedCode.description
        };
        core.info(JSON.stringify(metadata));

        fs.writeFileSync(filepath, fixedCode.source);
        console.log(`Successfully fixed '${filepath}'`);
        outputMetadata.push(metadata)
      }
      core.setOutput('output', outputMetadata);
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
})()