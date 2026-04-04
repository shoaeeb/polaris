//demo error file to simulate error on the frontend
//frontend code is writen on demo page.tsx
//background inngest error is written
//on function inngest file

import { inngest } from "@/inngest/client";

export async function POST() {
  await inngest.send({ name: "demo/error", data: {} });
  return Response.json({
    status: "Started",
  });
}
