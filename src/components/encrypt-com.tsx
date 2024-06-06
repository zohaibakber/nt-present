"use client";

import { encrypt } from "@/app/action";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

export function EncryptCom() {
  const [res, setRes] = useState<string | undefined>();
  const [publicKey, setPublicKey] = useState("");
  const [exponent, setExponent] = useState("");
  const [message, setMessage] = useState("");

  async function encryptMessage() {
    try {
      const encryptedMessage = await encrypt(message, publicKey, exponent);
      console.log(encryptedMessage);
      setRes(encryptedMessage);
    } catch (error) {
      console.error("Error encrypting message:", error);
      setRes("Error encrypting message.");
    }
  }
  return (
    <div className="w-full h-fit bg-primary-foreground rounded-lg border p-4">
      <div className="p-2 pb-4 flex justify-end">
        <Button onClick={() => encryptMessage()}>Encrypt</Button>
      </div>
      <div className="space-y-4">
        <form className="space-y-4">
          <Input
            placeholder="Exponent"
            value={exponent}
            onChange={(e) => setExponent(e.target.value)}
          />
          <Input
            placeholder="Public Key"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <Textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <div>
          {res && (
            <div className="p-2">
              <div className="text-lg font-bold">Encrypted Message</div>
              <div className="p-2">{res.toString()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
