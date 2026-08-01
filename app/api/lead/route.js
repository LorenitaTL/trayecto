// Receives a signup ("boleto") submission from the landing page.
//
// For this first version we don't wire up a database — the goal of the
// exercise is to *validate demand*, not to build the platform. Instead:
//
//   1. If LEADS_WEBHOOK_URL is set (Vercel → Settings → Environment
//      Variables), every submission is forwarded there as JSON. This can
//      point at a Google Apps Script Web App tied to a Sheet, a Formspree
//      endpoint, a Zapier/Make webhook, etc. — anything that accepts a
//      POST with a JSON body.
//   2. Every submission is also written to the function logs
//      (console.log), which you can read from the Vercel dashboard
//      (Project → Logs) as a fallback source of evidence for the report.
//
// See README.md for step-by-step instructions to connect a Google Sheet.

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!payload?.name || !payload?.contact || !payload?.intent) {
    return Response.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  // Always log — visible in Vercel function logs.
  console.log("[trayecto:lead]", JSON.stringify(payload));

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("[trayecto:lead] webhook responded with", res.status);
        // We still tell the user their reservation went through, since it
        // was logged above — but we surface the failure server-side.
      }
    } catch (err) {
      console.error("[trayecto:lead] webhook forwarding failed", err);
    }
  } else {
    console.warn(
      "[trayecto:lead] LEADS_WEBHOOK_URL is not set — this submission only exists in the function logs."
    );
  }

  return Response.json({ ok: true });
}
