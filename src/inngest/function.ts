import { generateText } from "ai";
import { inngest } from "./client";
import { google } from "@ai-sdk/google";
import { firecrawl } from "@/lib/firecrawl";

//this is the first version
// export const demoGenerate = inngest.createFunction(
//   { id: "demo-generate" },
//   { event: "demo/generate" },
//   async ({ event, step }) => {
//     await step.run("generate-text", async () => {
//       return await generateText({
//         model: google("gemini-2.5-flash"),
//         prompt: "Write a vegetarian lasagna recipe for 4 people.",
//       });
//     });
//   }
// );

//this is a URL REGEX
//COPIED FROM GOOGLE
const URL_REGEX =
  /(https?:\/\/)[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?(\/[^\s]*)?/g;

//this is the second version
export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ event, step }) => {
    //extract prompt from event;
    //event.data type will have prompt field which will be a string

    const { prompt } = event.data as { prompt: string };

    //extracting urls from prompt will be a step
    //we are extracting the url from user prompt

    //first step is to get all the urls from users prompt
    const urls = await step.run("extract-urls", async () => {
      return [...prompt.matchAll(URL_REGEX)].map((m) => m[0]) ?? [];
    });
    //second step is to scrape content of the user URLS
    const scrappedContent = await step.run("scrape-urls", async () => {
      const URLS = urls.filter((url) => {
        return url !== null;
      });
      const results = await Promise.all(
        URLS.map(async (url) => {
          const result = await firecrawl.scrape(url, {
            formats: ["markdown"],
          });
          return result.markdown ?? null;
        })
      );
      return results.filter(Boolean).join("\n\n");
    });

    //Construct the final Query
    const finalPrompt = scrappedContent
      ? `Context:\n${scrappedContent}\n\nQuestion:${prompt}`
      : prompt;
    await step.run("generate-text", async () => {
      return await generateText({
        model: google("gemini-2.5-flash"),
        prompt: finalPrompt,
      });
    });
  }
);
