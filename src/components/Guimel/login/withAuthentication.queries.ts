import { gql } from '@apollo/client';

export const AUTHENTICATED_ITEM_QUERY = gql(`
  query AuthenticatedItem {
    authenticatedItem {
      ... on User {
        id
        name
        lastName
        email
        verified
        phone
        image {
          url
        }
        createdAt
      }
    }
  }
`);
