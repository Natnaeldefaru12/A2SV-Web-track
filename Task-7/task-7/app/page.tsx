'use client';

import { useState } from 'react';
import Card from './components/Card';
import { sampleJobs, mapJobToCardProps } from './jobData';

export default function Page() {
  const [sortBy, setSortBy] = useState("Most relevant");

  // Sort jobs based on selection
  const getSortedJobs = () => {
    switch (sortBy) {
      case "Newest first":
        return [...sampleJobs].sort(
          (a, b) =>
            new Date(b.about.posted_on).getTime() -
            new Date(a.about.posted_on).getTime()
        );
      case "Oldest first":
        return [...sampleJobs].sort(
          (a, b) =>
            new Date(a.about.posted_on).getTime() -
            new Date(b.about.posted_on).getTime()
        );
      default:
        return sampleJobs;
    }
  };

  const jobPostings = getSortedJobs();

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Opportunities</h1>
          <div className="flex justify-between items-center">
            <p className="text-gray-300">
              Showing {jobPostings.length} results
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white text-gray-800 px-3 py-1 rounded-lg text-sm"
              >
                <option>Most relevant</option>
                <option>Newest first</option>
                <option>Oldest first</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {jobPostings.map((job, idx) => (
            <Card key={idx} {...mapJobToCardProps(job, idx)} jobIndex={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
