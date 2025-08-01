'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import DetailedJob from '../components/DetailedJob';
import { sampleJobs } from '../jobData';
import { mapJobToDetailedProps } from '../components/DetailedJob';

export default function DetailedPage() {
  const searchParams = useSearchParams();
  const jobIndex = searchParams.get('jobIndex');
  
  // Convert jobIndex to number and find the job
  const jobIndexNum = jobIndex ? parseInt(jobIndex, 10) : -1;
  const job = jobIndexNum >= 0 && jobIndexNum < sampleJobs.length ? sampleJobs[jobIndexNum] : null;

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found</h2>
          <p className="text-gray-700 mb-6">The job you are looking for does not exist or has been removed.</p>
          <a 
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Back to Jobs
          </a>
        </div>
      </div>
    );
  }

  const detailedJobProps = mapJobToDetailedProps(job);

  return <DetailedJob {...detailedJobProps} />;
}