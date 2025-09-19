import React from 'react';
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox';

const HosterSectionExample: React.FC = () => {
  return (
    <div className="py-16 space-y-16">
      {/* Mostrar anfitriones ordenados por calificación (más altos primero) */}
      <SectionGridAuthorBox 
        showHosters={true}
        hosterSortBy="reviewStar"
        hosterLimit={8}
        gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      />
      
      {/* Mostrar anfitriones ordenados por fecha (más antiguos primero) */}
      <SectionGridAuthorBox 
        showHosters={true}
        hosterSortBy="createdAt"
        hosterLimit={6}
        gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      />
    </div>
  );
};

export default HosterSectionExample;
