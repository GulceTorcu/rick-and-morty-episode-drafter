import { useQuery, gql } from '@apollo/client';


export const GET_ALL_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        status
        species
      }
    }
  }
`;


export const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
    }
  }
`;


export const GET_LOCATIONS = gql`
    query GetAllLocations {
    locations {
      results {
        id
        name
        type
        dimension
      }
    }
  }
`;