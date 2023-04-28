import * as fs from 'fs';
import * as core from '@actions/core';
import { getFilename, suggestFix } from '../lib/langchain'

(async () => {
  try {
    const outputFile = process.env.BUILD_OUTPUT_FILE || './build_output.txt'
    const buildOutput = fs.readFileSync(outputFile).toString();

    const errorFile = await getFilename(buildOutput);
    core.info(`File found: ${errorFile.filename}`);

    if (!errorFile.description.includes('FileNotFound')) {
      const fixedCode = await suggestFix(buildOutput, errorFile.filename);
      core.info(`Description: ${fixedCode.description}`);
      fs.writeFileSync(errorFile.filename, fixedCode.source);
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
})()