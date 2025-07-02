import data from "@public/mock/dashboard.json";
import { NextResponse } from "next/server";

export async function GET() {
  await new Promise(r => setTimeout(r, 600));
  return NextResponse.json(data);
}
