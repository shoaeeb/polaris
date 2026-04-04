"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DemoPage() {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const handleBlocking = async () => {
    setLoading(true);
    await fetch("/api/demo/blocking", {
      method: "POST",
    });
    setLoading(false);
  };

  const handleBackground = async () => {
    setLoading1(true);
    await fetch("/api/demo/background", {
      method: "POST",
    });
    setLoading1(false);
  };

  // 1) Clien Error - throws in the browser
  const handleClientError = () => {
    throw new Error("Client error: Something went wrong in the browser");
  };
  //2) API Error - triggers server-side error
  const handleAPIError = async () => {
    await fetch("/api/demo/error", {
      method: "POST",
    });
  };
  //3) Inngest Error - triggers error in the background job
  const handleInggestError = async () => {
    await fetch("/api/demo/inngest-error", {
      method: "POST",
    });
  };
  return (
    <div className="p-8 space-x-4">
      <Button disabled={loading} onClick={handleBlocking}>
        {loading ? "Loading..." : "Blocking "}
      </Button>
      <Button disabled={loading1} onClick={handleBackground}>
        {loading1 ? "Loading..." : "Background "}
      </Button>
      <Button variant={"destructive"} onClick={handleClientError}>
        Client Error
      </Button>
      <Button variant={"destructive"} onClick={handleAPIError}>
        API Error
      </Button>
      <Button variant={"destructive"} onClick={handleInggestError}>
        Inngest Error
      </Button>
    </div>
  );
}
