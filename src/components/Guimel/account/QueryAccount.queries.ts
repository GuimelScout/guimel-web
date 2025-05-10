import gql from "graphql-tag";


export const BOOKINGS_QUERY = gql`
  query Bookings($where: BookingWhereInput!, $orderBy: [BookingOrderByInput!]!) {
    bookings(where: $where, orderBy: $orderBy) {
      id
      activity {
        name
        link
        price
        reviewCount
        reviewStar
        gallery {
          description
          image {
            url
          }
        }    
      }
      lodging {
        name
        link
      }
      payment {
        id
        amount
        status
      }
      status
      start_date
      guestss
      end_date
      createdAt
      code
    }
  }
`;


export const PAYMENTS_QUERY = gql`
  query Payments($where: PaymentWhereInput!, $orderBy: [PaymentOrderByInput!]!) {
    payments(where: $where, orderBy: $orderBy) {
      id
      amount
      notes
      status
      createdAt
      booking {
        id
        code
      }
      paymentMethod {
        id
        cardType
        lastFourDigits
      }
    }
  }
`;