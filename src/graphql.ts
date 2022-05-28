import { gql } from "@apollo/client";
export const ME = gql`
  query me {
    user(login: "TakayaSugiyama") {
      name
      avatarUrl
    }
  }
`;

export const searchRepository = gql`
  query searchRepos(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $query: String!
  ) {
    search(
      after: $after
      before: $before
      first: $first
      last: $last
      query: $query
      type: REPOSITORY
    ) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            url
            stargazers {
              totalCount
            }
            viewerHasStarred
          }
        }
      }
    }
  }
`;
