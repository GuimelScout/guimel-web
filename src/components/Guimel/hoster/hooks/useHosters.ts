import { useQuery } from "@apollo/client";
import { GET_HOSTERS_QUERY } from "../QueryHoster.queries";
import { Host } from "@/data/types";
import { Role } from "@/app/template/(client-components)/(Header)/AvatarDropdown/constants";

export interface UseHostersOptions {
  sortBy?: 'reviewStar' | 'createdAt' | 'name';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}

export const useHosters = (options: UseHostersOptions = {}) => {
  const { 
    sortBy = 'totalReviews', 
    sortOrder = 'desc', 
    limit 
  } = options;

  const getDefaultSortOrder = (sortBy: string) => {
    switch (sortBy) {
      case 'createdAt':
        return 'asc';
      case 'totalReviews':
        return 'desc';
      case 'name':
        return 'asc';
      default:
        return 'desc';
    }
  };

  const effectiveSortOrder = sortOrder || getDefaultSortOrder(sortBy);

  const { data, loading, error, refetch } = useQuery<{ users: Host[] }>(GET_HOSTERS_QUERY, {
    variables: {
      where: {
        role: {
          some: {
            name: {
              equals: Role.HOSTER
            }
          }
        }
      },
      orderBy: [
        { createdAt: "desc" } // Basic ordering from GraphQL
      ]
    },
    fetchPolicy: "cache-and-network"
  });

  const hosters = data?.users || [];

  // Sort hosters based on options
  const sortedHosters = [...hosters].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'reviewStar':
        const starA = a.reviewStar || 0;
        const starB = b.reviewStar || 0;
        comparison = starA - starB;
        break;
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'name':
        const nameA = `${a.name} ${a.lastName}`.toLowerCase();
        const nameB = `${b.name} ${b.lastName}`.toLowerCase();
        comparison = nameA.localeCompare(nameB);
        break;
      default:
        comparison = 0;
    }

    // Apply sort order
    if (effectiveSortOrder === 'desc') {
      comparison = -comparison;
    }

    return comparison;
  });

  // Apply limit if specified
  const limitedHosters = limit ? sortedHosters.slice(0, limit) : sortedHosters;

  return {
    hosters: limitedHosters,
    loading,
    error,
    refetch,
    totalCount: hosters.length
  };
};
