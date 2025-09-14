import React from 'react';
import { UserType } from '../UserTypes';
import { 
  StarIcon, 
  CalendarIcon, 
  CheckCircleIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

interface UserStatsProps {
  user: UserType;
  bookingCount?: number;
  paymentCount?: number;
  totalSpent?: number;
}

const UserStats: React.FC<UserStatsProps> = ({
  user,
  bookingCount = 0,
  paymentCount = 0,
  totalSpent = 0
}) => {
  const stats = [
    {
      label: 'Calificación',
      value: user.reviewStar ? `${user.reviewStar.toFixed(1)} ⭐` : 'Sin calificaciones',
      icon: StarIcon,
      color: 'text-yellow-500'
    },
    {
      label: 'Miembro desde',
      value: new Date(user.createdAt).toLocaleDateString('es-MX', {
        month: 'short',
        year: 'numeric'
      }),
      icon: CalendarIcon,
      color: 'text-blue-500'
    },
    {
      label: 'Reservas',
      value: user.bookingCount.toString(),
      icon: UserGroupIcon,
      color: 'text-green-500'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Estadísticas de tu cuenta
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-2">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {stat.label}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStats;
