import React from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  title: string;
  org: string;
  location: string;
  description: string;
  tags: {
    label: string;
    color: string;
    border?: string;
  }[];
  logo: string;
  jobIndex: number;
}

const Card = ({ title, org, location, description, tags, logo, jobIndex }: CardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/detailed?jobIndex=${jobIndex}`);
  };
  
  // Truncate description if it's too long
  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleCardClick}
    >
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          {logo ? (
            <img
              src={logo}
              alt="Organization Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 font-bold">{org.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-800 mb-1">{title}</h1>
          <p className="text-gray-600 text-sm">
            {org} • {location || "Remote"}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{truncateDescription(description)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags && tags.map((tag, index) => (
          <span 
            key={index} 
            className={`px-3 py-1 text-xs font-medium rounded-full ${tag.color} ${tag.border || ''}`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;