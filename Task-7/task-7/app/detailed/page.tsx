'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DetailedJob, { mapApiJobToDetailedProps } from '../components/DetailedJob';

interface ApiJobResponse {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  orgID: string;
  datePosted: string;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: null | any;
  perksAndBenefits: null | any;
  createdAt: string;
  updatedAt: string;
  orgPrimaryPhone: string;
  orgEmail: string;
  average_rating: number;
  total_reviews: number;
}

export default function DetailedPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');
  
  const [job, setJob] = useState<ApiJobResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) {
        setError('Job ID is missing');
        setLoading(false);
        return;
      }

      try {
        // Fetch user data from JSONPlaceholder API
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${jobId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch job details: ${response.status}`);
        }
        
        const user = await response.json();
        
        // Create a mock job from the user data
        const mockJob: ApiJobResponse = {
          id: user.id.toString(),
          title: `${user.name}'s Job Position`,
          description: `Job description for ${user.name}. ${user.company.catchPhrase}`,
          responsibilities: `Responsibilities for ${user.name}:\n- Lead team initiatives\n- Manage projects\n- Coordinate with stakeholders`,
          requirements: `Requirements for this position:\n- Experience with ${user.company.bs}\n- Strong communication skills\n- Problem-solving abilities`,
          idealCandidate: `Ideal candidate:\n- Passionate about technology\n- Team player\n- Innovative thinker`,
          categories: ['Technology', 'Management'],
          opType: 'Full-time',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          location: [user.address.city],
          requiredSkills: ['Communication', 'Leadership', 'Technical expertise'],
          whenAndWhere: `${user.address.street}, ${user.address.city}`,
          orgID: user.company.name,
          datePosted: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Active',
          applicantsCount: Math.floor(Math.random() * 100),
          viewsCount: Math.floor(Math.random() * 1000),
          orgName: user.company.name,
          logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.company.name)}&background=random`,
          isBookmarked: false,
          isRolling: false,
          questions: null,
          perksAndBenefits: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          orgPrimaryPhone: user.phone,
          orgEmail: user.email,
          average_rating: parseFloat((Math.random() * 5).toFixed(1)),
          total_reviews: Math.floor(Math.random() * 50)
        };
        
        setJob(mockJob);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found</h2>
          <p className="text-gray-700 mb-6">{error || 'The job you are looking for does not exist or has been removed.'}</p>
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

  const detailedJobProps = mapApiJobToDetailedProps(job);

  return <DetailedJob {...detailedJobProps} />;
}