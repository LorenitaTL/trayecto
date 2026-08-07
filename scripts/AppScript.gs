function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Fecha", "Enviado (cliente)", "Landing",
      "Nombre", "Edad", "Comprensión del programa",
      "¿Podría aportar?", "¿Aportación es barrera?", "Aportación máxima",
      "Modalidad de acceso preferida", "Qué debe incluir (valor)",
      "Compromiso de reserva", "Pagaría ruta especializada",
      "Pagaría mentoría individual", "Pagaría fee de éxito ($499)",
      "Fee de éxito es barrera", "Qué no quedó claro",
      "Elementos de confianza", "Otro elemento de confianza",
      "Sugerencia de cambio", "Consentimiento de privacidad"
    ]);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.submittedAt || "",
    data.source || "",
    data.name || "",
    data.age || "",
    data.programUnderstanding || "",
    data.paymentCapacity || "",
    data.priceBarrier || "",
    data.baseContribution || "",
    data.preferredAccess || "",
    (data.valueForPayment || []).join(", "),
    data.paymentCommitment || "",
    data.optionalSpecialization || "",
    data.individualMentoring || "",
    data.successFee || "",
    data.successFeeBarrier || "",
    data.unclearSection || "",
    (data.trustElements || []).join(", "),
    data.trustElementsOther || "",
    data.suggestedChange || "",
    data.privacyConsent ? "Sí" : "No"
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
