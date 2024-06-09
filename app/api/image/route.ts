import { chackApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/chacksub";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!configuration.apiKey) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }
    if (!prompt) {
      return NextResponse.json({ error: "No prompt found" }, { status: 400 });
    }
    if (!amount) {
      return NextResponse.json({ error: "No amount found" }, { status: 400 });
    }
    if (!resolution) {
      return NextResponse.json({ error: "No resolution found" }, { status: 400 });
    }

    const freeTrial = await chackApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return NextResponse.json({ error: "Free trial has expired" }, { status: 403 });
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.data);
  } catch (err) {
    console.error("Image_error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
