import { gql } from "@apollo/client";

export const AUTHENTICATE_WITH_PASSWORD = gql`
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const LOG_OUT_MUTATION = gql`
  mutation LogOut {
    endSession
  }
`;

export const USER_REGISTER = gql`
  mutation Mutation($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      name
      email
    }
  }
`;