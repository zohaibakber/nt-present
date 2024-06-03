"use client";

import { encrypt } from "@/app/action";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

export function EncryptCom() {
  const [res, setRes] = useState<string | undefined>();
  const [publicKey, setPublicKey] = useState("");
  const [message, setMessage] = useState("");

  async function encryptMessage() {
    const cleanedPublicKey = publicKey.replace(/[()]/g, "");
    const [n, e] = cleanedPublicKey.split(",").map((num) => BigInt(num.trim()));
    const encryptedMessage = await encrypt(message, e, n);
    setRes(encryptedMessage);
  }
  return (
    <div className="w-full h-fit bg-primary-foreground rounded-lg border p-4">
      <div className="p-2 pb-4 flex justify-end">
        <Button onClick={() => encryptMessage()}>Encrypt</Button>
      </div>
      <div className="space-y-4">
        <form className="space-y-4">
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
