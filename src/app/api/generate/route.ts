import { SecretSantaManager } from "@/core/managers/secret-santa-manager";
import { NextRequest, NextResponse } from "next/server";

const manager = SecretSantaManager.getInstance();

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    const prevData = data.map((row: string[]) =>
      row.length > 2 ? row.slice(2, row.length) : [],
    );

    manager.createPairings(data, prevData);

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
    console.error(err);
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
