import { SignJWT, jwtVerify } from "jose";

export const COOKIE = "ga_admin";
const key = () => new TextEncoder().encode(process.env.AUTH_SECRET || "dev-only-secret-change-me-in-netlify");

export async function sign(email: string) {
  return new SignJWT({ email }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("14d").sign(key());
}

export async function verify(token?: string) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key());
    return payload as { email: string };
  } catch {
    return null;
  }
}

/** Constant-time-ish compare against env credentials. */
export function checkCredentials(email: string, password: string) {
  const e = process.env.ADMIN_EMAIL || "";
  const p = process.env.ADMIN_PASSWORD || "";
  if (!e || !p) return false;
  const a = `${email.trim().toLowerCase()}\n${password}`;
  const b = `${e.trim().toLowerCase()}\n${p}`;
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}
