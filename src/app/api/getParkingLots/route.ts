import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = await axios.get("http://211.252.37.224/rest/parking", {
    params: {
      pageSize: 99999,
    },
  });

  const data = response.data;

  return NextResponse.json(data);
}
