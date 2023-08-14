import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    // const userId = (await clerkClient.users.getUserList()).map(
    //   (user) => user.id
    // )[0];
    
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt are required", { status: 400 });
    }

    const isFreeTrial = await checkApiLimit();
    if (!isFreeTrial) {
      return new NextResponse("Free trial has expired.", { status: 403 });
    }

    // Model - Direct from site
    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt
        }
      }
    );

    await increaseApiLimit();

    return NextResponse.json(response);
  } catch (error) {
    console.log("[MUSIC_GENERATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
