"use client";

import { useState } from "react";
import { useToast } from "./use-toast";
import { SecretSantaResult } from "@/types";

export function useSecretSanta() {
  const { toast } = useToast();
  const [result, setResult] = useState<SecretSantaResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const generateSecretSanta = async (data: string[][]) => {
    try {
      setLoading(true);
      const req = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          data,
        }),
      });

      const res = await req.json();
      setResult(res.data as SecretSantaResult[]);

      toast({
        title: "Secret Santa Generated!",
      });

    } catch (err) {
      console.error(err)
      toast({
        title: "Failed to generate secret santa",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
  }

  return {
    result,
    loading,
    generateSecretSanta,
    reset,
  };
}
