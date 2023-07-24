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
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!configuration.apiKey) {
      return new NextResponse("Open Ai api Key Not Configer", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("No prompt Found", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("No Amount Found", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("No Resolution Found", { status: 400 });
    }

    const freeTrial = await chackApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free Trial has expired", { status: 403 });
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
    console.log("Image_error", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
