import { SecretSantaManager } from "@/core/managers/secret-santa-manager";
import { NextRequest, NextResponse } from "next/server";

const manager = SecretSantaManager.getInstance();

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    const currentData = data.slice(0, 2);
    const prevYearData = data.slice(2, data.length);

    manager.createPairings(currentData, prevYearData);

    const result = manager.getResult();

    return NextResponse.json(
      {
        message: "Generated secret santa",
        data: result,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    console.error(err)
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
