import React from "react";
import { useRouter } from "next/navigation";

interface DetailedJobProps {
  id: string;
  title: string;
  orgName: string;
  location: string[];
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  whenAndWhere: string;
  datePosted: string;
  deadline: string;
  startDate: string;
  endDate: string;
  categories: string[];
  requiredSkills: string[];
  logoUrl: string;
  orgEmail: string;
  orgPrimaryPhone: string;
}

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

export const mapApiJobToDetailedProps = (job: ApiJobResponse): DetailedJobProps => ({
  id: job.id,
  title: job.title,
  orgName: job.orgName,
  location: job.location,
  description: job.description,
  responsibilities: job.responsibilities,
  requirements: job.requirements,
  idealCandidate: job.idealCandidate,
  whenAndWhere: job.whenAndWhere,
  datePosted: job.datePosted,
  deadline: job.deadline,
  startDate: job.startDate,
  endDate: job.endDate,
  categories: job.categories,
  requiredSkills: job.requiredSkills,
  logoUrl: job.logoUrl,
  orgEmail: job.orgEmail,
  orgPrimaryPhone: job.orgPrimaryPhone
});

const DetailedJob = ({
  id,
  title,
  orgName,
  location,
  description,
  responsibilities,
  requirements,
  idealCandidate,
  whenAndWhere,
  datePosted,
  deadline,
  startDate,
  endDate,
  categories,
  requiredSkills,
  logoUrl,
  orgEmail,
  orgPrimaryPhone,
}: DetailedJobProps) => {
  const router = useRouter();
  
  const handleBackClick = () => {
    router.push('/');
  };

  // Split responsibilities, requirements, and idealCandidate by newline characters
  const responsibilitiesList = responsibilities.split('\n').filter(item => item.trim() !== '');
  const requirementsList = requirements.split('\n').filter(item => item.trim() !== '');
  const idealCandidateList = idealCandidate.split('\n').filter(item => item.trim() !== '');

  // Format dates
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl p-8 max-w-6xl w-full shadow-lg relative">
        <button 
          onClick={handleBackClick}
          className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <div className="flex flex-col md:flex-row gap-8 mt-10">
          <div className="flex-1">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Organization Logo"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-bold">{orgName.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{title}</h1>
                <p className="text-gray-600 text-sm">
                  {orgName} • {location && location.length > 0 ? location.join(', ') : "Remote"}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>

              {responsibilitiesList.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Responsibilities</h2>
                  <ul className="space-y-2">
                    {responsibilitiesList.map((resp, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {requirementsList.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h2>
                  <ul className="space-y-2">
                    {requirementsList.map((req, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {idealCandidateList.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Ideal Candidate</h2>
                  <ul className="space-y-3">
                    {idealCandidateList.map((trait, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-gray-700">{trait}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {whenAndWhere && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">When & Where</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-500">📍</span>
                    <span className="text-gray-700">{whenAndWhere}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-80 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">🕐</span>
                  <span className="text-gray-700">Posted On: {formatDate(datePosted)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">👍</span>
                  <span className="text-gray-700">Deadline: {formatDate(deadline)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">📍</span>
                  <span className="text-gray-700">Location: {location && location.length > 0 ? location.join(', ') : "Remote"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">📅</span>
                  <span className="text-gray-700">Start Date: {formatDate(startDate)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">📅</span>
                  <span className="text-gray-700">End Date: {formatDate(endDate)}</span>
                </div>
                {orgEmail && (
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-500">📧</span>
                    <span className="text-gray-700">Email: {orgEmail}</span>
                  </div>
                )}
                {orgPrimaryPhone && (
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-500">📞</span>
                    <span className="text-gray-700">Phone: {orgPrimaryPhone}</span>
                  </div>
                )}
              </div>
            </div>

            {categories && categories.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${idx === 0 ? "bg-orange-500 text-white" : "bg-blue-400 text-white"}`}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {requiredSkills && requiredSkills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium text-blue-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedJob;