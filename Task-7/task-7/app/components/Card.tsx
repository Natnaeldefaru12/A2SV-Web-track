import React from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  id: string;
  title: string;
  orgName: string;
  location: string[];
  description: string;
  categories: string[];
  logoUrl: string;
  requiredSkills: string[];
}

const Card = ({ id, title, orgName, location, description, categories, logoUrl, requiredSkills }: CardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/detailed?id=${id}`);
  };
  
  // Truncate description if it's too long
  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className="bg-white p-8 pl-14 rounded-3xl w-full max-w-[919px] h-[266px] shadow-lg flex flex-col justify-between cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={handleCardClick}
    >
      <div className="flex items-start space-x-4 mb-4">
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
          <h1 className="text-xl font-bold text-gray-800 mb-1">{title}</h1>
          <p className="text-gray-600 text-sm">
            {orgName} • {location && location.length > 0 ? location[0] : "Remote"}
          </p>
        </div>
      </div>
      <div className="pl-16 mb-4 flex-1">
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{truncateDescription(description)}</p>
      </div>
      <div className="pl-16 flex flex-wrap gap-3">
        {categories && categories.length > 0 && (
          <span className="px-4 py-2 text-xs font-medium rounded-full text-[#FFB836] border border-[#FFB836]">
            {categories[0]}
          </span>
        )}
        {categories && categories.length > 1 && (
          <span className="px-4 py-2 text-xs font-medium rounded-full text-[#4640DE] border border-[#4640DE]">
            {categories[1]}
          </span>
        )}
        {requiredSkills && requiredSkills.length > 0 && (
          <span className="px-4 py-2 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {requiredSkills[0]}
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;