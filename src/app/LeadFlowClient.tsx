"use client";

import dynamic from "next/dynamic";

const ComponentApp = dynamic(() => import("../App"), { ssr: false });

export default function LeadFlowClient() {
  return <ComponentApp />;
}
