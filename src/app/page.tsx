import { GenerateComp } from "@/components/generate-comp";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="w-full h-full bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">
          RSA Encryption and Decryption
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="mb-4">
            RSA (Rivest-Shamir-Adleman) is a widely used public-key cryptosystem
            that enables secure data transmission. It relies on the
            computational difficulty of factoring large integers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Key Generation</h2>
          <p className="mb-4">
            RSA involves a public key, which is known to everyone, and a private
            key, which is kept secret. The keys are generated as follows:
          </p>
          <ol className="list-decimal list-inside mb-4">
            <li>
              Select two distinct large prime numbers <i>p</i> and <i>q</i>.
            </li>
            <li>
              Compute <i>n = p &times; q</i>. <i>n</i> is used as the modulus
              for both the public and private keys.
            </li>
            <li>
              Calculate the totient function{" "}
              <i>&phi;(n) = (p-1) &times; (q-1)</i>.
            </li>
            <li>
              Choose an integer <i>e</i> such that <i>1 &lt; e &lt; &phi;(n)</i>{" "}
              and <i>gcd(e, &phi;(n)) = 1</i>. <i>e</i> is the public exponent.
            </li>
            <li>
              Determine <i>d</i> as the modular multiplicative inverse of{" "}
              <i>e</i> modulo <i>&phi;(n)</i>. <i>d</i> is the private exponent.
            </li>
          </ol>
          <p className="mb-4">
            The public key is <i>(e, n)</i> and the private key is <i>(d, n)</i>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Encryption</h2>
          <p className="mb-4">
            To encrypt a message <i>m</i> (where <i>m</i> is an integer such
            that <i>0 &le; m &lt; n</i>), compute the ciphertext <i>c</i> using
            the public key <i>(e, n)</i>:
          </p>
          <p className="font-mono bg-gray-200 p-2 rounded">
            <i>
              c = m<sup>e</sup> mod n
            </i>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Decryption</h2>
          <p className="mb-4">
            To decrypt the ciphertext <i>c</i>, compute the original message{" "}
            <i>m</i> using the private key <i>(d, n)</i>:
          </p>
          <p className="font-mono bg-gray-200 p-2 rounded">
            <i>
              m = c<sup>d</sup> mod n
            </i>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Example</h2>
          <GenerateComp />
        </section>
      </div>
    </>
  );
}
