import gql from "graphql-tag";


export const BOOKINGS_QUERY = gql`
  query Bookings($where: BookingWhereInput!) {
    bookings(where: $where) {
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
  query Payments($where: PaymentWhereInput!) {
    payments(where: $where) {
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