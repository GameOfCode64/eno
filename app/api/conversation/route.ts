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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!configuration.apiKey) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }
    if (!messages) {
      return NextResponse.json({ error: "No messages found" }, { status: 400 });
    }

    const freeTrial = await chackApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return NextResponse.json({ error: "Free trial has expired" }, { status: 403 });
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
    console.error("Conversations_error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
