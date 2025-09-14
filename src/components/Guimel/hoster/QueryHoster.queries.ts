import gql from "graphql-tag";


export const BOOKINGS_HOSTER_QUERY = gql`
  query GetBookings($where: BookingWhereInput!) {
    bookings(where: $where) {
      id
      code
      start_date
      status
      user {
        name
        phone
        email
      }
      guestsCount
      end_date
      createdAt
      activity {
        image {
          url
        }
        name
        link
      }
      lodging {
        name
        logo {
          url
        }
      }
    }
  }
`;

