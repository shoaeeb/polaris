//localhost:3000/api/demo/blocking
import { inngest } from "@/inngest/client";

//this function is create to run the AI response in the background
export async function POST() {
  await inngest.send({
    name: "demo/generate",
    data: {},
  });
  return Response.json({ status: "Started" });
}
