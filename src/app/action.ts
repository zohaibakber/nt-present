"use server";

import { generatePrimeSync } from "crypto";

// Helper functions for encoding/decoding
function toHex(bigint: bigint): string {
  return bigint.toString(16);
}

function fromHex(hexString: string): bigint {
  // Remove any spaces and ensure the string only contains valid hexadecimal characters
  const sanitizedHexString = hexString.replace(/\s+/g, "").toLowerCase();
  if (!/^[0-9a-f]+$/.test(sanitizedHexString)) {
    throw new Error("Invalid hexadecimal string");
  }
  return BigInt(`0x${sanitizedHexString}`);
} // Define the return type for the generateRandomPrimes function

interface RSAKeyPair {
  p: string;
  q: string;
  n: string;
  phi: string;
  e: string;
  d: string;
}

export async function generateRandomPrimes(): Promise<RSAKeyPair> {
  const p = generatePrimeSync(1024, { bigint: true });
  const q = generatePrimeSync(1024, { bigint: true });

  const n = p * q;
  const phi = (p - 1n) * (q - 1n);

  let e = 65537n;
  while (gcd(e, phi) !== 1n) {
    e += 2n;
  }

  const d = modInverse(e, phi);

  return {
    p: toHex(p),
    q: toHex(q),
    n: toHex(n),
    phi: toHex(phi),
    e: toHex(e),
    d: toHex(d),
  };
}

function gcd(a: bigint, b: bigint): bigint {
  if (b === 0n) {
    return a;
  }
  return gcd(b, a % b);
}

function modInverse(a: bigint, m: bigint): bigint {
  let m0 = m;
  let y = 0n;
  let x = 1n;

  if (m === 1n) {
    return 0n;
  }

  while (a > 1n) {
    const q = a / m;
    let t = m;

    m = a % m;
    a = t;
    t = y;

    y = x - q * y;
    x = t;
  }

  if (x < 0n) {
    x += m0;
  }

  return x;
}

function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) result = (result * base) % modulus;
    exponent = exponent >> 1n;
    base = (base * base) % modulus;
  }
  return result;
}

export async function encrypt(
  message: string,
  e_hex: string,
  n_hex: string
): Promise<string> {
  const e = fromHex(e_hex);
  const n = fromHex(n_hex);

  let encrypted = "";
  for (let i = 0; i < message.length; i++) {
    const charCode = BigInt(message.charCodeAt(i));
    const encryptedCharCode = modPow(charCode, e, n);
    encrypted += encryptedCharCode.toString(16).padStart(4, "0");
  }

  return encrypted;
}

export async function decrypt(
  encrypted: string,
  d_hex: string,
  n_hex: string
): Promise<string> {
  const d = fromHex(d_hex);
  const n = fromHex(n_hex);

  console.log(`Decrypting with d: ${d}, n: ${n}`); // Diagnostic log

  let decrypted = "";
  for (let i = 0; i < encrypted.length; i += 4) {
    const encryptedCharCode = BigInt(`0x${encrypted.slice(i, i + 4)}`);
    const decryptedCharCode = modPow(encryptedCharCode, d, n);

    if (Number(decryptedCharCode) > 0xffff) {
      console.error(`Invalid character code: ${decryptedCharCode}`);
      continue; // Skip invalid character codes
    }
    decrypted += String.fromCharCode(Number(decryptedCharCode));
  }
  console.log(`Decrypted: ${decrypted}`); // Diagnostic log

  return decrypted;
}
