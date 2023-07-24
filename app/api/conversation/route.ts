import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";
import { increaseApiLimit, chackApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/chacksub";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!configuration.apiKey) {
      return new NextResponse("Open Ai api Key Not Configer", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("No Massage Found", { status: 400 });
    }
    const freeTrial = await chackApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free Trial has expired", { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(response.data.choices[0].message);
  } catch (err) {
    console.log("Conversations_error", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
