"use client";

import { decrypt } from "@/app/action";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export function DecryptComp() {
  const [res, setRes] = useState<string | undefined>();
  const [privateKey, setPrivateKey] = useState("");
  const [d, setD] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");

  async function decryptMessage() {
    try {
      const decrypted = await decrypt(encryptedMessage, d, privateKey);
      setRes(decrypted);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="w-full h-fit bg-primary-foreground rounded-lg border p-4">
      <div className="p-2 pb-4 flex justify-end">
        <Button onClick={() => decryptMessage()}>Decrypt</Button>
      </div>
      <div className="space-y-4">
        <form className="space-y-4">
          <Input
            placeholder="D"
            value={d}
            onChange={(e) => setD(e.target.value)}
          />

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
