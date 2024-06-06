"use client";

import { generateRandomPrimes } from "@/app/action";
import { Button } from "./ui/button";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface RSAKeyPair {
  p: string;
  q: string;
  n: string;
  phi: string;
  e: string;
  d: string;
}

type BaseFormat = {
  base: "hex" | "base64";
};

export function GenerateComp() {
  const [res, setRes] = useState<RSAKeyPair | undefined>();
  const [format, setFormat] = useState<BaseFormat>({ base: "hex" });

  async function getRandomPrimes() {
    const res = await generateRandomPrimes();
    console.log(res);
    setRes(res);
  }

  function convertToBase(value: string, base: "hex" | "base64") {
    if (base === "hex") {
      return value;
    } else if (base === "base64") {
      // Convert hex string to Buffer, then to Base64
      const buffer = Buffer.from(value, "hex");
      return buffer.toString("base64");
    } else {
      return value;
    }
  }

  return (
    <div className="w-full h-fit bg-primary-foreground rounded-lg border p-4">
      <div className="flex justify-end p-2 gap-4">
        <Badge variant={"outline"}>{format.base}</Badge>
        <Button
          onClick={() =>
            setFormat((prev) => ({
              base: prev.base === "hex" ? "base64" : "hex",
            }))
          }
        >
          Toggle
        </Button>
        <Button onClick={getRandomPrimes}>Generate</Button>
      </div>
      <div>
        {res && (
          <div className="">
            <SubCard
              title="Prime P"
              description="Random prime number"
              value={convertToBase(res.p, format.base)}
            />
            <SubCard
              title="Prime Q"
              description="Random prime number"
              value={convertToBase(res.q, format.base)}
            />
            <SubCard
              title="N"
              description="Product of P and Q"
              value={convertToBase(res.n, format.base)}
            />
            <SubCard
              title="Phi"
              description="Euler's totient function"
              value={convertToBase(res.phi, format.base)}
            />
            <SubCard
              title="E"
              description="Public key exponent"
              value={convertToBase(res.e, format.base)}
            />
            <SubCard
              title="D"
              description="Private key exponent"
              value={convertToBase(res.d, format.base)}
            />
            <SubCard
              title="Public Key"
              description="Public key pair"
              value={
                convertToBase(res.e, format.base) +
                ", " +
                convertToBase(res.n, format.base)
              }
              copy
            />
            <SubCard
              title="Private Key"
              description="Private key pair"
              value={
                convertToBase(res.d, format.base) +
                ", " +
                convertToBase(res.n, format.base)
              }
              copy
            />
          </div>
        )}
      </div>
    </div>
  );
}

type SubCardProps = {
  title: string;
  description: string;
  value: string;
  copy?: boolean;
};

const SubCard = ({ title, description, value, copy }: SubCardProps) => {
  return (
    <div className="p-4 bg-white rounded-lg m-2 text-xl overflow-auto break-all border space-y-2">
      <div>
        <div className="flex gap-4 items-center justify-between">
          <h2>{title}</h2>
          {copy && (
            <Button
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied to clipboard", { position: "top-right" });
              }}
              size={"sm"}
              variant={"outline"}
              className="top-2 right-2"
            >
              <Copy className="size-4" />
            </Button>
          )}
        </div>
        <p className="text-blue-600 text-base">{description}</p>
        <span className="text-sm text-muted-foreground"> {value}</span>
      </div>
    </div>
  );
};
