//install firecrawl using npm i @mendable/firecrawl-js
//create file under src/lib/firecrawl.ts

import Firecrawl from "@mendable/firecrawl-js";

export const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY,
});
