import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const pixelId = "1342692514298959";
  const token = process.env.META_API_TOKEN; // Coloque no .env !!

  const response = await fetch(
    `https://graph.facebook.com/v17.0/${pixelId}/events?access_token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            event_name: body.event, 
            event_time: Math.floor(Date.now() / 1000),
            action_source: "www.conectaaii.com.br",
            event_source_url: body.url,
            user_data: {
              client_ip_address: req.headers.get("x-forwarded-for"),
              client_user_agent: req.headers.get("user-agent"),
            },
          },
        ],
      }),
    }
  );

  const result = await response.json();
  return NextResponse.json(result);
}
