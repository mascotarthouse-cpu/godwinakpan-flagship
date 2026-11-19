// Scheduled function: refreshes the Medium cache every 6 hours.
export default async () => {
  const base = process.env.URL;
  const secret = process.env.CRON_SECRET;
  if (!base || !secret) return new Response("missing URL or CRON_SECRET", { status: 200 });
  const res = await fetch(`${base}/api/medium/sync`, { method: "POST", headers: { "x-cron-secret": secret } });
  return new Response(await res.text(), { status: 200 });
};
