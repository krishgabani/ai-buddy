import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// OPEN-AI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    // const userId = (await clerkClient.users.getUserList()).map(
    //   (user) => user.id
    // )[0];

    const body = await req.json();

    const { prompt, amount = "1", resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!prompt) {
      return new NextResponse("Promt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const isFreeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!isPro && !isFreeTrial) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount),
      size: resolution,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[IMAGE_GENERATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
