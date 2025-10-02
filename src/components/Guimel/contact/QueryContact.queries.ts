import { gql } from '@apollo/client';

export const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContact($data: ContactCreateInput!) {
    createContact(data: $data) {
      name
      phone
      message
      email
    }
  }
`;
