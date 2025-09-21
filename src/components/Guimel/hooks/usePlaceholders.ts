import { useMemo } from 'react';

interface PlaceholderConfig {
  type: 'activity' | 'lodging' | 'review';
  titles: string[];
  descriptions: string[];
}

interface PlaceholderItem {
  type: 'activity' | 'lodging' | 'review';
  title: string;
  description: string;
  key: string;
}

const PLACEHOLDER_CONFIGS: Record<string, PlaceholderConfig> = {
  activity: {
    type: 'activity',
    titles: [
      'Nuevas aventuras en camino',
      'Más experiencias increíbles',
      'Próximamente más aventuras',
      'Experiencias únicas por descubrir',
      'Aventuras emocionantes te esperan'
    ],
    descriptions: [
      'Pronto descubrirás experiencias únicas',
      'Este anfitrión está creando momentos especiales',
      'Experiencias emocionantes están por llegar',
      'Momentos inolvidables en preparación',
      'Nuevas historias están por escribirse'
    ]
  },
  lodging: {
    type: 'lodging',
    titles: [
      'Nuevos alojamientos en preparación',
      'Más lugares únicos por descubrir',
      'Próximamente más opciones',
      'Espacios especiales en camino',
      'Alojamientos únicos te esperan'
    ],
    descriptions: [
      'Pronto tendrás más opciones de hospedaje',
      'Este anfitrión está curando espacios especiales',
      'Nuevos alojamientos están en camino',
      'Lugares mágicos en preparación',
      'Experiencias de hospedaje únicas por llegar'
    ]
  },
  review: {
    type: 'review',
    titles: [
      'Reseñas en camino',
      'Próximamente más opiniones',
      'Testimonios por llegar',
      'Experiencias compartidas en preparación'
    ],
    descriptions: [
      'Los huéspedes compartirán sus experiencias',
      'Pronto verás más testimonios',
      'Nuevas reseñas están por llegar',
      'Historias de viajeros en camino'
    ]
  }
};

export const usePlaceholders = (itemType: 'activity' | 'lodging' | 'review', itemCount: number, maxGridItems: number = 3) => {
  return useMemo(() => {
    if (itemCount >= maxGridItems) {
      return [];
    }

    const placeholdersNeeded = maxGridItems - itemCount;
    const config = PLACEHOLDER_CONFIGS[itemType];
    
    if (!config) {
      return [];
    }

    const placeholders: PlaceholderItem[] = [];
    
    for (let i = 0; i < placeholdersNeeded; i++) {
      const titleIndex = i % config.titles.length;
      const descriptionIndex = i % config.descriptions.length;
      
      placeholders.push({
        type: config.type,
        title: config.titles[titleIndex],
        description: config.descriptions[descriptionIndex],
        key: `${itemType}-placeholder-${i}`
      });
    }

    return placeholders;
  }, [itemType, itemCount, maxGridItems]);
};
