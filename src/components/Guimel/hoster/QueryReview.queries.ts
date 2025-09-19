import { gql } from '@apollo/client';

export const CREATE_REVIEW_MUTATION = gql`
  mutation createReview($data: ReviewCreateInput!) {
    createReview(data: $data) {
      id
      review
      rating
      createdAt
      user {
        id
        name
        lastName
        image {
          url
        }
      }
    }
  }
`;
