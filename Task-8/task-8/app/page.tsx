"use client";

import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { sampleJobs, mapJobToCardProps } from "./jobData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sortOption, setSortOption] = useState<string>("relevance");

  console.log("Home page - Session status:", status);
  console.log("Home page - Session data:", session);
  console.log("Home page - Current URL:", window.location.href);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Redirecting to sign in...</div>
      </div>
    );
  }

  const sortedJobs = [...sampleJobs].sort((a, b) => {
    if (sortOption === "newest") {
      return (
        new Date(b.about.posted_on).getTime() -
        new Date(a.about.posted_on).getTime()
      );
    } else if (sortOption === "oldest") {
      return (
        new Date(a.about.posted_on).getTime() -
        new Date(b.about.posted_on).getTime()
      );
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-6xl mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Job Listings</h1>
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-white">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-gray-800 text-white rounded-md px-3 py-1 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="w-full max-w-6xl space-y-6">
          {sortedJobs.map((job, idx) => (
            <Card key={idx} {...mapJobToCardProps(job, idx)} />
          ))}
        </div>
      </main>
    </div>
  );
}
