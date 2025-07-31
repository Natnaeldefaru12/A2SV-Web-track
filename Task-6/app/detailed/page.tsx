"use client";

import DetailedJob, { mapJobToDetailedProps } from "../components/DetailedJob";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { sampleJobs } from "../page";

interface JobPosting {
  title: string;
  description: string;
  responsibilities: string[];
  ideal_candidate: {
    age: string;
    gender: string;
    traits: string[];
  };
  when_where: string;
  about: {
    posted_on: string;
    deadline: string;
    location: string;
    start_date: string;
    end_date: string;
    categories: string[];
    required_skills: string[];
  };
  company: string;
  image: string;
}

export default function DetailedPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const jobIndex = id ? parseInt(id) : 0;

  const job = sampleJobs[jobIndex];

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Job not found</div>
      </div>
    );
  }

  return <DetailedJob {...mapJobToDetailedProps(job)} />;
}
