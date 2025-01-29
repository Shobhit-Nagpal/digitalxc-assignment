"use client";

import { useState } from "react";
import { useToast } from "./use-toast";

export function useSecretSanta() {
  const { toast } = useToast();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const generateSecretSanta = async () => {
    try {
      setLoading(true);
      const req = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({}),
      });

      const res = await req.json();
      //      setSecretSanta(res.data);
    } catch (err) {
      toast({
        title: "Failed to generate secret santa",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    loading,
    generateSecretSanta,
  };
}
