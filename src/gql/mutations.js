import gql from 'graphql-tag';

export const ADD_ITEM_MUTATION = gql`
  mutation AddItemMutation($title: String!, $description: String, $deadline: String) {
    addItem(title: $title, description: $description, deadline: $deadline) {
      id,
      title,
      isCompleated
    }
  }
`;

export const TOGGLE_COMPLEATED_MUTATION = gql`
  mutation ToggleCompleated($id: ID!, $isCompleated: Boolean!) {
    setCompleated(id: $id, isCompleated: $isCompleated) {
      id,
      isCompleated
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItam($id: ID!) {
    deleteItem(id: $id) {
      id,
      title,
      isCompleated
    }
  }
`;

export const EDIT_MUTATION = gql`
  mutation EditItem($id: ID!, $deadline: String, $description: String) {
    editItem(id: $id, deadline: $deadline, description: $description) {
      id,
      deadline,
      description
    }
  }
`;
