"use client";

import Lottie from "lottie-react";
import loader from "@/lotties/loader.json";

export default function Loading() {
  return <Lottie animationData={loader} className="size-[350px]" />;
}
