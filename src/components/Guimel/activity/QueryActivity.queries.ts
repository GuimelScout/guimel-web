import gql from "graphql-tag";

export const ACTIVITIES_QUERY = gql`
  query Activities($where: ActivityWhereInput) {
    activities(where: $where) {
      id
      name
      link
      address
      price
      commission_type
      commission_value
      reviewCount
      reviewStar
      image {
        url
      }
      gallery {
        description
        image {
          url
        }
      }
      descriptionActivities {
        document
      }
    }
    activitiesCount
  }
`;

export const ACTIVITY_QUERY = gql`
  query Activity($where: ActivityWhereUniqueInput!) {
    activity(where: $where) {
      id
      name
      link
      address
      price
      commission_type
      commission_value
      reviewCount
      reviewStar
      image {
        url
      }
      gallery {
        description
        image {
          url
        }
      }
      includes {
        name
        description
      }
      descriptionActivities {
        document
      }
      hostBy {
        name
        lastName
        secondLastName
        description
        activityCount
        lodgingCount
        reviewsCount
        reviewStar
        verified
        image {
          url
        }
        link
        createdAt
      }
      lodgingCount
      lodging {
        id
        name
        price
        commission_type
        commission_value
        address
        link
        logo {
          url
        }
      }
      location {
        id
        name
        image {
          url
        }
      }
      type_day
      available_days {
        day
      }
    }
  }
`;

export const BOOKING_QUERY = gql`
  query Booking($where: BookingWhereUniqueInput!) {
    booking(where: $where) {
      id
      guestsCount
      start_date
      end_date
      code
      status
      payment_type
      createdAt
      activity {
        id
        name
        description
        address
        link
        price
        reviewCount
        reviewStar
        image {
          url
        }
        hostBy {
          id
          name
          secondLastName
          lastName
          description
          activityCount
          lodgingCount
          reviewsCount
          reviewStar
          image {
            url
          }
          verified
        }
      }
      lodging {
        id
        name
        link
        address
        price
        reviewCount
        reviewStar
        logo {
          url
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

