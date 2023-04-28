import fs from "fs";
import { oneLine, } from 'common-tags';
import { ChatOpenAI } from 'langchain/chat_models';
import { LLMChain } from 'langchain/chains';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from "langchain/prompts";

export const getFilename = async (buildOutput: any) => {
  const template = "You are a very senior developer with more than 10 years experience in Typescript." +
    "Strip the input to ONLY lines with an error then find the filename where this error comes from: {buildOutput}" +
    "If you do, please reply with the path to the file ONLY, if not please reply with 'FileNotFound'"

  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    description: 'an explanation of what is recommended and what the error/issue was',
    filename: "ONLY the filename of the file where the user input error comes from",
  });
  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template,
    inputVariables: ["buildOutput"],
    partialVariables: { format_instructions: formatInstructions },
  })

  const chat = new ChatOpenAI({ temperature: 0 });
  const chain = new LLMChain({ llm: chat, prompt: prompt });
  const filename = await chain.call({ buildOutput });
  return parser.parse(filename.text);
}

export const suggestFix = async (buildOutput: any, errorFile: string) => {
  const codeContent = fs.readFileSync(`./${errorFile}`).toString();

  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    description: 'an explanation of what is recommended and what the error/issue was',
    source: "ONLY the fixed code response to the user's input",
  });
  const formatInstructions = parser.getFormatInstructions();

  const template = "You are a very senior developer with more than 10 years experience in Typescript." +
    "Given this code {codeContent} and this build output {buildOutput}, suggest a fix that would resolve the error " +
    "and respond with the fixed code content ONLY. \n{format_instructions}";

  const prompt = new PromptTemplate({
    template,
    inputVariables: ["codeContent", "buildOutput"],
    partialVariables: { format_instructions: formatInstructions },
  });

  const chat = new ChatOpenAI({ temperature: 0 });
  const chain = new LLMChain({ llm: chat, prompt: prompt });
  const codeFix = await chain.call({ codeContent, buildOutput });
  return parser.parse(codeFix.text);
}

export const suggestRuntimeFix = async (codeContent: string) => {
  const chat = new ChatOpenAI({ temperature: 0, openAIApiKey: process.env.OPENAI_API_KEY });

  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    description: 'an explanation of what is recommended and what the error/issue was',
    source: "ONLY the fixed code response to the user's input",
  });
  const formatInstructions = parser.getFormatInstructions();

  const template = "You are a very senior developer with more than 10 years experience in Typescript. " +
    "Given this code {codeContent}, find out whether it will cause a runtime error when ran, have logic errors, or have an unexpected result." +
    "If it does not cause a runtime error, do not make any changes, respond with RuntimeErrorNotFound." +
    "If it causes an unexpected result or an error, respond with the fixed code content ONLY. \n{format_instructions}"

  const prompt = new PromptTemplate({
    template,
    inputVariables: ["codeContent"],
    partialVariables: { format_instructions: formatInstructions },
  })

  const chain = new LLMChain({ prompt: prompt, llm: chat });
  const res = await chain.call({ codeContent });
  return parser.parse(res.text);
}