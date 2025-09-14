import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(where: { id: $id }) {
      id
      name
      lastName
      secondLastName
      email
      phone
      countryCode
      description
      instagram
      facebook
      twitter
      linkedin
      tiktok
      youtube
      website
      verified
      image {
        url
      }
      status
      createdAt
      reviewStar
      bookingCount
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: ID!
    $data: UserUpdateInput!
  ) {
    updateUser(where: { id: $id }, data: $data) {
      id
      name
      lastName
      secondLastName
      email
      phone
      countryCode
      description
      instagram
      facebook
      twitter
      linkedin
      tiktok
      youtube
      website
      verified
      image {
        url
      }
      status
      createdAt
      reviewStar
    }
  }
`;

export const UPLOAD_USER_IMAGE_MUTATION = gql`
  mutation UploadUserImage($id: ID!, $image: Upload!) {
    updateUser(where: { id: $id }, data: { image: { upload: $image } }) {
      id
      image {
        url
      }
    }
  }
`;
