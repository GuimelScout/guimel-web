import React from 'react';
import HosterDetailsClient from '@/components/Guimel/hoster/HosterDetailsClient';

interface HosterDetailsPageProps {
  params: {
    id: string; // This is actually the link now
  };
}

const HosterDetailsPage: React.FC<HosterDetailsPageProps> = ({ params }) => {
  return <HosterDetailsClient hosterLink={params.id} />;
};

export default HosterDetailsPage;
