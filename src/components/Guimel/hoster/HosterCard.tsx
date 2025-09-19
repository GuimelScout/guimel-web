import React from 'react';
import { Host } from '@/data/types';
import ImageWithPlaceholder from '@/components/Guimel/ImageWithPlaceholder';
import { StarIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { InstagramIcon, FacebookIcon, TwitterIcon, LinkedInIcon, TikTokIcon, YouTubeIcon, WebsiteIcon } from '@/components/Guimel/icons/SocialMediaIcons';
import Avatar from '@/shared/Avatar';

interface HosterCardProps {
  hoster: Host;
  index?: number;
}

const HosterCard: React.FC<HosterCardProps> = ({ hoster, index }) => {
  const fullName = `${hoster.name} ${hoster.lastName} ${hoster.secondLastName || ''}`.trim();
  const displayName = `${hoster.name} ${hoster.lastName}`;
  
  return (
    <Link 
      href={`/anfitrion/${hoster.link}` as any}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block cursor-pointer"
    >
      {/* Ranking badge */}
      {index !== undefined && index < 3 && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
            {index + 1}
          </div>
        </div>
      )}

      {/* Profile Section */}
      <div className="flex flex-col items-center text-center space-y-2">
        {/* Avatar with verification */}
        <div className="relative">
          <Avatar
            hasChecked={hoster.verified}
            sizeClass="h-20 w-20 text-lg"
            radius="rounded-full"
            imgUrl={hoster.image?.url}
            userName={displayName}
            containerClassName="ring-4 ring-gray-100 dark:ring-gray-700 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-all duration-300"
            hasCheckedClass="w-5 h-5 -top-1 -right-1"
          />
        </div>

        {/* Name and Title */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {displayName}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 text-yellow-400" />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {hoster.reviewStar?.toFixed(1) || '0.0'}
          </span>
        </div>

        {/* Social Media Links */}
        {(hoster.instagram || hoster.facebook || hoster.twitter || hoster.linkedin || hoster.tiktok || hoster.youtube || hoster.website) && (
          <div className="w-full pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex justify-center gap-2">
              {hoster.website && (
                <a
                  href={hoster.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                  title="Website"
                  onClick={(e) => e.stopPropagation()}
                >
                  <WebsiteIcon className="w-3 h-3 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </a>
              )}
              {hoster.instagram && (
                <a
                  href={`https://instagram.com/${hoster.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 group shadow-md hover:shadow-lg"
                  title="Instagram"
                  onClick={(e) => e.stopPropagation()}
                >
                  <InstagramIcon className="w-3 h-3 text-white" />
                </a>
              )}
              {hoster.facebook && (
                <a
                  href={`https://facebook.com/${hoster.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors group shadow-md hover:shadow-lg"
                  title="Facebook"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FacebookIcon className="w-3 h-3 text-white" />
                </a>
              )}
              {hoster.twitter && (
                <a
                  href={`https://twitter.com/${hoster.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 bg-sky-500 rounded-full hover:bg-sky-600 transition-colors group shadow-md hover:shadow-lg"
                  title="Twitter/X"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TwitterIcon className="w-3 h-3 text-white" />
                </a>
              )}
              {hoster.linkedin && (
                <a
                  href={`https://linkedin.com/in/${hoster.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors group shadow-md hover:shadow-lg"
                  title="LinkedIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LinkedInIcon className="w-3 h-3 text-white" />
                </a>
              )}
              {hoster.tiktok && (
                <a
                  href={`https://tiktok.com/@${hoster.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors group shadow-md hover:shadow-lg"
                  title="TikTok"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TikTokIcon className="w-3 h-3 text-white" />
                </a>
              )}
              {hoster.youtube && (
                <a
                  href={`https://youtube.com/@${hoster.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 bg-red-600 rounded-full hover:bg-red-700 transition-colors group shadow-md hover:shadow-lg"
                  title="YouTube"
                  onClick={(e) => e.stopPropagation()}
                >
                  <YouTubeIcon className="w-3 h-3 text-white" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Join Date */}
        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          <CalendarIcon className="w-3 h-3" />
          <span>
            Miembro desde {new Date(hoster.createdAt).getFullYear()}
          </span>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/5 group-hover:to-blue-50/10 dark:group-hover:from-blue-900/5 dark:group-hover:to-blue-900/10 rounded-2xl transition-all duration-300 pointer-events-none" />
    </Link>
  );
};

export default HosterCard;
