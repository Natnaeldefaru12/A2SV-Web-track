import React from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  title: string;
  org: string;
  location: string;
  description: string;
  tags: { label: string; color: string; border?: string }[];
  logo: string;
  jobIndex?: number; // Add job index for navigation
}

const Card = ({ title, org, location, description, tags, logo, jobIndex = 0 }: CardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/detailed?id=${jobIndex}`);
  };

  return (
    <div 
      className="bg-white p-8 pl-14 rounded-3xl w-[919px] h-[266px] shadow-lg flex flex-col justify-between cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={handleCardClick}
    >
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          <img
            src={logo}
            alt="Company Logo"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-800 mb-1">{title}</h1>
          <p className="text-gray-600 text-sm">
            {org} • {location}
          </p>
        </div>
      </div>
      <div className="pl-16 mb-4 flex-1">
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{description}</p>
      </div>
      <div className="pl-16 flex flex-wrap gap-3">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className={`px-4 py-2 text-xs font-medium rounded-full ${tag.color} ${tag.border || ""}`.trim()}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;