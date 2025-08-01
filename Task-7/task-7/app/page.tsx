'use client';

import { useState, useEffect } from 'react';
import Card from './components/Card';

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

type SortOption = 'newest' | 'oldest' | 'relevant';

export default function Home() {
  const [jobs, setJobs] = useState<ApiJobResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Use a different API endpoint that returns sample job data
        // This is a temporary solution until we can fix the API integration
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const userData = await response.json();
        
        // Transform the user data into job-like data for demonstration
        const mockJobs: ApiJobResponse[] = userData.map((user: any) => ({
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
          average_rating: (Math.random() * 5).toFixed(1),
          total_reviews: Math.floor(Math.random() * 50)
        }));
        
        setJobs(mockJobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getSortedJobs = () => {
    // Check if jobs is undefined, null, or not an array
    if (!jobs || !Array.isArray(jobs) || jobs.length === 0) return [];
    
    const jobsCopy = [...jobs];
    
    switch (sortOption) {
      case 'newest':
        return jobsCopy.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
      case 'oldest':
        return jobsCopy.sort((a, b) => new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime());
      case 'relevant':
        // For relevance, we could use a more complex algorithm
        // For now, let's sort by the number of views as a proxy for relevance
        return jobsCopy.sort((a, b) => b.viewsCount - a.viewsCount);
      default:
        return jobsCopy;
    }
  };

  const sortedJobs = getSortedJobs();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Jobs</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Job Listings</h1>
            <p className="text-gray-400">{sortedJobs.length} results found</p>
          </div>
          <div className="mt-4 md:mt-0">
            <label htmlFor="sort" className="text-white mr-2">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="relevant">Most relevant</option>
            </select>
          </div>
        </div>

        {sortedJobs.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-700">No jobs found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedJobs.map((job) => (
              <Card
                key={job.id}
                id={job.id}
                title={job.title}
                orgName={job.orgName}
                location={job.location}
                description={job.description}
                categories={job.categories}
                logoUrl={job.logoUrl}
                requiredSkills={job.requiredSkills}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
