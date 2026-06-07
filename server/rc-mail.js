/**
 * Envoi email rapport RC 8D — Gmail (RC_BROADCAST_SMTP_PASS dans .env).
 */
const DEFAULT_FROM = process.env.RC_BROADCAST_FROM || 'ahmeeeedkortas@gmail.com';
const FROM_NAME = process.env.RC_BROADCAST_FROM_NAME || 'KORTAS.A — XPERT MECA QHSE';

function wrapHtmlBody(inner) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>Rapport 8D</title></head>
<body style="margin:0;padding:24px;font-family:Inter,Arial,sans-serif;background:#f8fafc;color:#0f2044">
  <div style="max-width:720px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px">
    <div style="border-bottom:3px solid #1e40af;padding-bottom:14px;margin-bottom:20px">
      <div style="font-size:20px;font-weight:800;color:#0f2044">XPERT MECA QHSE</div>
      <div style="font-size:11px;color:#64748b;margin-top:4px">Rapport de traitement 8D — Réclamation client</div>
    </div>
    ${inner}
    <div style="margin-top:28px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:11px;color:#64748b;line-height:1.6">
      <strong>${FROM_NAME}</strong><br>
      <a href="mailto:${DEFAULT_FROM}" style="color:#2563eb">${DEFAULT_FROM}</a>
    </div>
  </div>
</body>
</html>`;
}

export async function sendRcBroadcastMail({ to, subject, html, text }) {
  const pass = process.env.RC_BROADCAST_SMTP_PASS;
  if (!pass) {
    return { ok: false, reason: 'smtp_not_configured', from: DEFAULT_FROM };
  }

  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.default.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: DEFAULT_FROM, pass },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${DEFAULT_FROM}>`,
      to,
      subject: subject || 'Rapport 8D — XPERT MECA',
      text: text || '',
      html: wrapHtmlBody(html || text || ''),
    });

    return { ok: true, from: DEFAULT_FROM };
  } catch (err) {
    const raw = String(err?.message || err);
    let error = raw;
    if (/BadCredentials|535|Username and Password not accepted/i.test(raw)) {
      error =
        'Gmail a refusé la connexion. Créez un mot de passe d\'application sur https://myaccount.google.com/apppasswords (validation en 2 étapes requise) et mettez-le dans .env → RC_BROADCAST_SMTP_PASS';
    }
    return { ok: false, reason: 'send_failed', error, from: DEFAULT_FROM };
  }
}
