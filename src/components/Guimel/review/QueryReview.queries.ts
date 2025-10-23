import gql from "graphql-tag";

export const CREATE_REVIEW = gql`
  mutation createReview($data: ReviewCreateInput!) {
    createReview(data: $data) {
      review
      rating
    }
  }
`;

export const GET_REVIEWS = gql`
  query getReviews($where: ReviewWhereInput!, $orderBy: [ReviewOrderByInput!]!) {
    reviews(where: $where, orderBy: $orderBy) {
      rating
      review
      user {
        name
        lastName
        verified
        image {
          url
        }
      }
      createdBy {
        name
        lastName
        verified
        image {
          url
        }
      }
      createdAt
    }
  }
`;

