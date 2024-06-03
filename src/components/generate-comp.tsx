"use client";

import { generateRandomPrimes } from "@/app/action";
import { Button } from "./ui/button";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type RSAParams = {
  p: bigint;
  q: bigint;
  n: bigint;
  phi: bigint;
  e: bigint;
  d: bigint;
};

export function GenerateComp() {
  const [res, setRes] = useState<RSAParams | undefined>();
  async function getRandomPrimes() {
    const res = await generateRandomPrimes();
    console.log(res);
    setRes(res);
  }

  return (
    <div className="w-full h-fit bg-primary-foreground rounded-lg border p-4">
      <div className="flex justify-end p-2">
        <Button onClick={() => getRandomPrimes()}>Generate</Button>
      </div>
      <div>
        {res && (
          <div className="">
            <SubCard
              title="Prime P"
              description="Random prime number"
              value={res.p.toString()}
            />
            <SubCard
              title="Prime Q"
              description="Random prime number"
              value={res.q.toString()}
            />
            <SubCard
              title="N"
              description="Product of P and Q"
              value={res.n.toString()}
            />
            <SubCard
              title="Phi"
              description="Euler's totient function"
              value={res.phi.toString()}
            />
            <SubCard
              title="E"
              description="Public key exponent"
              value={res.e.toString()}
            />
            <SubCard
              title="D"
              description="Private key exponent"
              value={res.d.toString()}
            />
            <SubCard
              title="Public Key"
              description="Public key pair"
              value={`(${res.e}, ${res.n})`}
              copy
            />
            <SubCard
              title="Private Key"
              description="Private key pair"
              value={`(${res.d}, ${res.n})`}
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
