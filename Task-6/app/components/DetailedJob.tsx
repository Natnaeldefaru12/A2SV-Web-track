import React from "react";
import { useRouter } from "next/navigation";

interface DetailedJobProps {
  title: string;
  org: string;
  location: string;
  description: string;
  responsibilities: string[];
  idealCandidate: {
    age: string;
    gender: string;
    traits: string[];
  };
  whenWhere: string;
  postedOn: string;
  deadline: string;
  startDate: string;
  endDate: string;
  categories: { label: string; color: string }[];
  requiredSkills: { label: string; color: string }[];
  logo: string;
}

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

export const mapJobToDetailedProps = (job: JobPosting): DetailedJobProps => ({
  title: job.title,
  org: job.company,
  location: job.about.location,
  description: job.description,
  responsibilities: job.responsibilities,
  idealCandidate: {
    age: job.ideal_candidate.age,
    gender: job.ideal_candidate.gender,
    traits: job.ideal_candidate.traits
  },
  whenWhere: job.when_where,
  postedOn: job.about.posted_on,
  deadline: job.about.deadline,
  startDate: job.about.start_date,
  endDate: job.about.end_date,
  categories: job.about.categories.map((cat, idx) => ({
    label: cat,
    color: idx === 0 ? "bg-orange-500 text-white" : "bg-blue-400 text-white"
  })),
  requiredSkills: job.about.required_skills.map(skill => ({
    label: skill,
    color: "text-blue-400"
  })),
  logo: job.image
});

const DetailedJob = ({
  title,
  org,
  location,
  description,
  responsibilities,
  idealCandidate,
  whenWhere,
  postedOn,
  deadline,
  startDate,
  endDate,
  categories,
  requiredSkills,
  logo,
}: DetailedJobProps) => {
  const router = useRouter();
  
  const handleBackClick = () => {
    router.push('/');
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
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <img
                  src={logo}
                  alt="Company Logo"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{title}</h1>
                <p className="text-gray-600 text-sm">
                  {org} • {location}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Responsibilities</h2>
                <ul className="space-y-2">
                  {responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Ideal Candidate we want</h2>
                {idealCandidate.age !== "Any" && (
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Age: </span>
                    <span className="text-gray-700">{idealCandidate.age}</span>
                  </div>
                )}
                {idealCandidate.gender !== "Any" && (
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Gender: </span>
                    <span className="text-gray-700">{idealCandidate.gender}</span>
                  </div>
                )}
                <ul className="space-y-3">
                  {idealCandidate.traits.map((trait, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span className="text-gray-700">{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">When & Where</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">📍</span>
                  <span className="text-gray-700">{whenWhere}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-80 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">🕐</span>
                  <span className="text-gray-700">Posted On: {postedOn}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">👍</span>
                  <span className="text-gray-700">Deadline: {deadline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">📍</span>
                  <span className="text-gray-700">Location: {location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">📅</span>
                  <span className="text-gray-700">Start Date: {startDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">📅</span>
                  <span className="text-gray-700">End Date: {endDate}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${category.color}`}
                  >
                    {category.label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${skill.color}`}
                  >
                    {skill.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedJob;