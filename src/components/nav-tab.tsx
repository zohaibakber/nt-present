"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateComp } from "./generate-comp";
import { EncryptCom } from "./encrypt-com";
import { DecryptComp } from "./decrypt-comp";
import { memo } from "react";

const MemoizedEncryptCom = memo(EncryptCom);
const MemoizedDecryptComp = memo(DecryptComp);

export function NavTab() {
  return (
    <nav className="py-4">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
          <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <GenerateComp />
        </TabsContent>
        <TabsContent value="encrypt">
          <MemoizedEncryptCom />
        </TabsContent>
        <TabsContent value="decrypt">
          <MemoizedDecryptComp />
        </TabsContent>
      </Tabs>
    </nav>
  );
}
