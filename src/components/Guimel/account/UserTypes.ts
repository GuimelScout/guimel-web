export interface UserType {
  id: string;
  name: string;
  lastName: string;
  secondLastName?: string;
  email: string;
  phone?: string;
  countryCode?: string;
  description?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
  website?: string;
  verified: boolean;
  image?: {
    url: string;
  };
  status: string;
  createdAt: string;
  reviewStar: number;
  bookingCount: number;
}

export interface UserUpdateData {
  name?: string;
  lastName?: string;
  secondLastName?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  description?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
  website?: string;
}

export interface SocialMediaField {
  name: keyof UserUpdateData;
  label: string;
  placeholder: string;
  icon: string;
  color: string;
}

export const SOCIAL_MEDIA_FIELDS: SocialMediaField[] = [
  {
    name: 'instagram',
    label: 'Instagram',
    placeholder: '@usuario_instagram',
    icon: '📷',
    color: 'from-pink-500 to-purple-600'
  },
  {
    name: 'facebook',
    label: 'Facebook',
    placeholder: 'facebook.com/usuario',
    icon: '👥',
    color: 'from-blue-600 to-blue-800'
  },
  {
    name: 'twitter',
    label: 'Twitter/X',
    placeholder: '@usuario_twitter',
    icon: '🐦',
    color: 'from-sky-400 to-sky-600'
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'linkedin.com/in/usuario',
    icon: '💼',
    color: 'from-blue-700 to-blue-900'
  },
  {
    name: 'tiktok',
    label: 'TikTok',
    placeholder: '@usuario_tiktok',
    icon: '🎵',
    color: 'from-gray-900 to-gray-700'
  },
  {
    name: 'youtube',
    label: 'YouTube',
    placeholder: 'youtube.com/@usuario',
    icon: '📺',
    color: 'from-red-600 to-red-800'
  },
  {
    name: 'website',
    label: 'Sitio Web',
    placeholder: 'https://mi-sitio.com',
    icon: '🌐',
    color: 'from-green-500 to-green-700'
  }
];
