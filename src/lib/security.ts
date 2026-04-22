// Lightweight obfuscation for local-only sensitive data.
// NOTE: This is NOT real cryptography — true secrets must live server-side.
// We use it to avoid storing card numbers in plaintext in localStorage.

const KEY = "em_v1_local_key";

function getKey(): string {
  if (typeof window === "undefined") return KEY;
  let k = sessionStorage.getItem(KEY);
  if (!k) {
    k = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    sessionStorage.setItem(KEY, k);
  }
  return k;
}

function xor(text: string, key: string): string {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    out += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return out;
}

export function obfuscate(plain: string): string {
  if (typeof window === "undefined") return plain;
  return btoa(unescape(encodeURIComponent(xor(plain, getKey()))));
}

export function deobfuscate(cipher: string): string {
  if (typeof window === "undefined") return cipher;
  try {
    return xor(decodeURIComponent(escape(atob(cipher))), getKey());
  } catch {
    return "";
  }
}

// Mask all but last 4 digits: "•••• •••• •••• 1234"
export function maskCardNumber(digits: string): string {
  const clean = digits.replace(/\D/g, "");
  const last4 = clean.slice(-4).padStart(4, "•");
  return `•••• •••• •••• ${last4}`;
}

export function detectBrand(digits: string): "visa" | "mastercard" | "amex" | "elo" | "other" {
  const n = digits.replace(/\D/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^(636368|438935|504175|451416|5067|4576|4011)/.test(n)) return "elo";
  return "other";
}

// Luhn check
export function luhnValid(digits: string): boolean {
  const n = digits.replace(/\D/g, "");
  if (n.length < 13 || n.length > 19) return false;
  let sum = 0;
  let alt = false;
  for (let i = n.length - 1; i >= 0; i--) {
    let d = parseInt(n[i], 10);
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
}
