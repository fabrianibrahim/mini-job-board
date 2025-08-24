"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant="link" onClick={() => router.back()} className="mb-6">
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
}
