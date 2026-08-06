// Recibe el formulario completo de validación de Trayecto.
//
// Si LEADS_WEBHOOK_URL está configurada en Vercel, la respuesta
// se reenvía como JSON. También queda registrada en los logs.

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      {
        ok: false,
        error: "invalid_json",
      },
      {
        status: 400,
      }
    );
  }

  const requiredFields = [
    "name",
    "age",
    "programUnderstanding",
    "paymentCapacity",
    "priceBarrier",
    "baseContribution",
    "preferredAccess",
    "paymentCommitment",
    "optionalSpecialization",
    "individualMentoring",
    "successFee",
    "successFeeBarrier",
    "unclearSection",
  ];

  const missingFields = requiredFields.filter(
    (field) => !payload?.[field]
  );

  if (
    !Array.isArray(payload?.valueForPayment) ||
    payload.valueForPayment.length < 3
  ) {
    missingFields.push("valueForPayment");
  }

  if (
    !Array.isArray(payload?.trustElements) ||
    payload.trustElements.length < 5
  ) {
    missingFields.push("trustElements");
  }

  if (!payload?.privacyConsent) {
    missingFields.push("privacyConsent");
  }

  if (missingFields.length > 0) {
    return Response.json(
      {
        ok: false,
        error: "missing_fields",
        fields: [...new Set(missingFields)],
      },
      {
        status: 400,
      }
    );
  }

  console.log(
    "[trayecto:validation]",
    JSON.stringify(payload)
  );

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(
          "[trayecto:validation] Webhook status:",
          response.status
        );
      }
    } catch (error) {
      console.error(
        "[trayecto:validation] Webhook error:",
        error
      );
    }
  } else {
    console.warn(
      "[trayecto:validation] LEADS_WEBHOOK_URL no está configurada."
    );
  }

  return Response.json(
    {
      ok: true,
    },
    {
      status: 201,
    }
  );
}
