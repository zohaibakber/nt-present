"use server";

import { generatePrimeSync } from "crypto";

export async function generateRandomPrimes() {
  const p = generatePrimeSync(512, { bigint: true });
  const q = generatePrimeSync(512, { bigint: true });

  const n = BigInt(p) * BigInt(q);
  const phi = (BigInt(p) - 1n) * (BigInt(q) - 1n);

  let e = 65537n;
  while (gcd(e, phi) != 1n) {
    e += 2n;
  }

  const d = modInverse(e, phi);

  return {
    p: p,
    q: q,
    n: n,
    phi: phi,
    e: e,
    d: d,
  };
}

function gcd(a: bigint, b: bigint): bigint {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

function modInverse(a: bigint, m: bigint) {
  let m0 = m;
  let y = 0n;
  let x = 1n;

  if (m == 1n) {
    return 0n;
  }

  while (a > 1n) {
    let q = a / m;
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

function modPow(base: bigint, exponent: bigint, modulus: bigint) {
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

export async function encrypt(message: string, e: bigint, n: bigint) {
  let encrypted = "";
  for (let i = 0; i < message.length; i++) {
    let charCode = BigInt(message.charCodeAt(i));
    let encryptedCharCode = modPow(charCode, e, n);
    encrypted += encryptedCharCode.toString().padStart(3, "0");
  }

  return encrypted;
}

export async function decrypt(encrypted: string, d: bigint, n: bigint) {
  console.log({
    encrypted,
    d,
    n,
  });
  let decrypted = "";
  for (let i = 0; i < encrypted.length; i += 3) {
    let encryptedCharCode = BigInt(encrypted.slice(i, i + 3));
    let decryptedCharCode = modPow(encryptedCharCode, d, n);
    console.log(decryptedCharCode);
    console.log(typeof decryptedCharCode);
    decrypted += String.fromCharCode(Number(decryptedCharCode));
  }
  console.log(decrypted);
  return decrypted;
}
