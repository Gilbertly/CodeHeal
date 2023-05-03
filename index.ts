// import * as fs from 'fs';
// import * as core from '@actions/core';
// import { getFilename, suggestFix } from './lib/langchain'

// (async () => {
//   try {
//     const file = process.env.BUILD_OUTPUT_FILE || core.getInput('build-output-file')
//     const data = fs.readFileSync(file, 'utf8');

//     /** 1. find the filename where error comes from */
//     const filename = await getFilename(data);
//     /** 2. find a fix for the error filename */
//     if (filename !== 'FileNotFound') {
//       const codeFix = await suggestFix(data);
//       /** 3. commit change to file and open a PR from branch */
//       fs.writeFileSync(filename, codeFix);
//     }

//     core.info('Successfully completed!');
//   } catch (error: any) {
//     core.setFailed(error.message);
//   }
// })()
