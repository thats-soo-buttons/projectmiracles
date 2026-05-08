export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    // Get webhook URL from environment variable
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return Response.json(
        { error: "Discord webhook not configured" },
        { status: 500 }
      );
    }

    // Send to Discord
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: name,
            description: message,
            color: 0x22c55e, // green accent color
            timestamp: new Date().toISOString(),
            footer: {
              text: "projectmiracles.org bulletin board",
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Discord webhook failed:", response.statusText);
      return Response.json(
        { error: "Failed to post to Discord" },
        { status: response.status }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Discord API error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
