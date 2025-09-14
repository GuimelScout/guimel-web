import React from 'react';
import { UserIcon, PlusIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { RouteGuimel } from '@/routers/routes';

interface HostOnlyAccessProps {
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

const HostOnlyAccess: React.FC<HostOnlyAccessProps> = ({
  title,
  description,
  features,
  ctaText,
  ctaLink
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <UserIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            ¿Qué puedes hacer como anfitrión?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={ctaLink as any}
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            {ctaText}
          </Link>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Es completamente gratuito y solo toma unos minutos
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">💡</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ¿Necesitas ayuda?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Si tienes preguntas sobre cómo convertirte en anfitrión o necesitas asistencia, 
                no dudes en{' '}
                <Link 
                  href={RouteGuimel.contact as any} 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  contactarnos
                </Link>
                . Estamos aquí para ayudarte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostOnlyAccess;
