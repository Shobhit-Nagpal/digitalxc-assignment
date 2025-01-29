import { SecretSantaManager } from "@/core/managers/secret-santa-manager";
import { NextRequest, NextResponse } from "next/server";

const manager = SecretSantaManager.getInstance();

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
