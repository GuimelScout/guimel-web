import gql from "graphql-tag";

export const LOCATIONS_QUERY = gql`
  query LocationsGet {
    locations {
      id
      link
      name
      description
      lodgingCount
      activityCount
      image {
        url
      }
    }
  }
`;

export const LOCATION_QUERY = gql`
  query LocationGet($where: LocationWhereUniqueInput!) {
  location(where: $where) {
    id
    link
    name
    description
    image {
      url
    }
    gallery {
      description
      image {
        url
      }
    }
    activityCount
    lodgingCount
    activity {
      name
      link
      address
      price
      reviewCount
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
      address
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
  }
}
`;
