import gql from 'graphql-tag';

export const ITEM_LIST_QUERY = gql`
  {
    list {
      id,
      title,
      isCompleated
    }
  }
`;

export const ITEM_QUERY = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      description,
      deadline,
    }
  }
`;
