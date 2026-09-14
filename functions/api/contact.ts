interface ContactEnvironment {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

interface PagesContext {
  request: Request;
  env: ContactEnvironment;
}

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  company?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: object, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[character] ?? character,
  );
}

function parsePayload(value: unknown): ContactPayload | null {
  if (!value || typeof value !== 'object') return null;
  const payload = value as Record<string, unknown>;
  const firstName = typeof payload['firstName'] === 'string' ? payload['firstName'].trim() : '';
  const lastName = typeof payload['lastName'] === 'string' ? payload['lastName'].trim() : '';
  const email = typeof payload['email'] === 'string' ? payload['email'].trim() : '';
  const message = typeof payload['message'] === 'string' ? payload['message'].trim() : '';
  const company = typeof payload['company'] === 'string' ? payload['company'].trim() : '';
  if (
    !firstName ||
    firstName.length > 100 ||
    lastName.length > 100 ||
    !EMAIL_PATTERN.test(email) ||
    email.length > 254 ||
    message.length < 20 ||
    message.length > 5000 ||
    company.length > 200
  )
    return null;
  return { firstName, lastName, email, message, company };
}

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json'))
    return json({ error: 'Unsupported content type.' }, 415);
  if (Number(request.headers.get('content-length') ?? 0) > 20_000)
    return json({ error: 'Request too large.' }, 413);

  let payload: ContactPayload | null = null;
  try {
    payload = parsePayload(await request.json());
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }
  if (!payload) return json({ error: 'Please review the form fields.' }, 400);
  if (payload.company) return json({ accepted: true });
  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM)
    return json({ error: 'Email delivery is not configured.' }, 503);

  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(' ');
  const resend = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: payload.email,
      subject: `Safe Travel Company — message from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${payload.email}\n\n${payload.message}`,
      html: `<h2>New Safe Travel Company enquiry</h2><p><strong>Name:</strong> ${escapeHtml(fullName)}<br><strong>Email:</strong> ${escapeHtml(payload.email)}</p><p>${escapeHtml(payload.message).replaceAll('\n', '<br>')}</p>`,
    }),
  });
  if (!resend.ok) return json({ error: 'Email delivery failed.' }, 502);
  return json({ accepted: true });
}

export function onRequestOptions(): Response {
  return new Response(null, { status: 204, headers: { Allow: 'POST, OPTIONS' } });
}
