"use client";

import DetailedJob, { mapJobToDetailedProps } from "../components/DetailedJob";
import Navbar from "../components/Navbar";
import { useSearchParams, useRouter } from "next/navigation";
import { sampleJobs } from "../jobData";
import { useSession } from "next-auth/react";

export default function DetailedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const jobIndex = id ? parseInt(id) : 0;

  // Redirect to sign in page if not authenticated
  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  const job = sampleJobs[jobIndex];

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-xl">Job not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <DetailedJob {...mapJobToDetailedProps(job)} />
      </div>
    </div>
  );
}