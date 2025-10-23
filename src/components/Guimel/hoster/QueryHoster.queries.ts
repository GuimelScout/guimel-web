import gql from "graphql-tag";

export const GET_HOSTERS_QUERY = gql`
  query GetHosters($where: UserWhereInput, $orderBy: [UserOrderByInput!]) {
    users(where: $where, orderBy: $orderBy) {
      id
      name
      lastName
      secondLastName
      email
      phone
      description
      link
      instagram
      facebook
      twitter
      linkedin
      tiktok
      youtube
      website
      totalReviews
      image {
        url
      }
      role {
        id
        name
      }
      verified
      createdAt
      activityCount
      lodgingCount
      reviewsCount
      reviewStar
    }
  }
`;

export const GET_HOSTER_DETAILS_QUERY = gql`
  query GetHosterDetails($link: String!) {
    user(where: { link: $link }) {
      id
      name
      lastName
      secondLastName
      email
      phone
      description
      link
      instagram
      facebook
      twitter
      linkedin
      tiktok
      youtube
      website
      image {
        url
      }
      role {
        id
        name
      }
      verified
      createdAt
      activityCount
      lodgingCount
      reviewsCount
      reviewStar
      totalReviews
      activity {
        id
        name
        description
        price
        image {
          url
        }
        link
        reviewCount
        reviewStar
        address
      }
      lodging {
        id
        name
        description
        price
        logo {
          url
        }
        link
        reviewCount
        reviewStar
        address
      }
      reviews {
        id
        rating
        review
        createdAt
        user {
          id
          verified
          name
          lastName
          image {
            url
          }
        }
        activity {
          name
        }
        lodging {
          name
        }
      }
    }
  }
`;

export const GET_HOSTER_REVIEWS = gql`
 query Reviews($where: ReviewWhereInput!) {
  reviews(where: $where) {
    review
    rating
    createdAt
    createdBy {
      id
      verified
      name
      lastName
      image {
        url
      }
    }
    activity {
      name
      link
    }
    lodging {
      name
      link
    }
  }
}
`;

export const BOOKINGS_HOSTER_QUERY = gql`
  query GetBookings($where: BookingWhereInput!, $orderBy: [BookingOrderByInput!]) {
    bookings(where: $where, orderBy: $orderBy) {
      id
      code
      start_date
      status
      payment_type
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
        price
        hostBy {
          id
        }
      }
      lodging {
        name
        logo {
          url
        }
        price
        hostBy {
          id
        }
      }
      payment {
        id
        amount
        notes
        paymentMethod {
          lastFourDigits
          cardType
        }
      }
    }
  }
`;