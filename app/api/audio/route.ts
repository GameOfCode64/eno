import { chackApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/chacksub";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("No Prompt Found", { status: 400 });
    }

    const freeTrial = await chackApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free Trial has expired", { status: 403 });
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );
    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(response);
  } catch (err) {
    console.log("Music Error", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
