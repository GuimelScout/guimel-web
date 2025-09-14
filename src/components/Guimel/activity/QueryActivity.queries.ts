import gql from "graphql-tag";

export const ACTIVITIES_QUERY = gql`
  query Activities($where: ActivityWhereInput) {
    activities(where: $where) {
      id
      name
      link
      address
      price
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
        createdAt
      }
      lodgingCount
      lodging {
        id
        name
        price
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

