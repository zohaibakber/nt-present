"use client";

import { decrypt } from "@/app/action";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export function DecryptComp() {
  const [res, setRes] = useState<string | undefined>();
  const [privateKey, setPrivateKey] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");

  async function decryptMessage() {
    const cleanedPrivateKey = privateKey.replace(/[()]/g, "");
    const [n, d] = cleanedPrivateKey
      .split(",")
      .map((num) => BigInt(num.trim()));
    console.log({
      n,
      d,
    });
    const decryptedMessage = await decrypt(encryptedMessage, d, n);
    console.log(decryptedMessage);
    setRes(decryptedMessage);
  }

  return (
    <div className="w-full h-fit bg-primary-foreground rounded-lg border p-4">
      <div className="p-2 pb-4 flex justify-end">
        <Button onClick={() => decryptMessage()}>Decrypt</Button>
      </div>
      <div className="space-y-4">
        <form className="space-y-4">
          <Input
            placeholder="Private Key"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <Textarea
            placeholder="Encrypted Message"
            value={encryptedMessage}
            onChange={(e) => setEncryptedMessage(e.target.value)}
          />
        </form>
        <div>
          {res && (
            <div className="p-2">
              <div className="text-lg font-bold">Decrypted Message</div>
              <div className="p-2">{res.toString()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
