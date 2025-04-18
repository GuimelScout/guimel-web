import gql from "graphql-tag";

export const LODGINGS_QUERY = gql`
  query Lodgings {
    lodgings {
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
        includes {
          name
          description
        }
        gallery {
          description
          image {
            url
          }
        }
      }
    lodgingsCount
  }
`;

export const LODGING_QUERY = gql`
  query Lodging($where: LodgingWhereUniqueInput!) {
    lodging(where: $where) {
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
    }
  }
`;

