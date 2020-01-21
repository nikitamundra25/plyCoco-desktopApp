import gql from "graphql-tag";

const ADD_REGION = gql`
  mutation AddRegion($regionInput: RegionInput!) {
    addRegion(regionInput: $regionInput) {
      id
      regionName
    }
  }
`;

const GET_REGIONS = gql`
  query GetRegions($searchBy: String, $sortBy: Int, $limit: Int, $page: Int) {
    getRegions(
      searchBy: $searchBy
      sortBy: $sortBy
      limit: $limit
      page: $page
    ) {
      totalCount
      regionData {
        id
        regionName
        createdAt
      }
    }
  }
`;
export const RegionQueries = [ADD_REGION, GET_REGIONS];
