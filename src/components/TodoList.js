import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'

const ITEM_LIST = gql`
  {
    list {
      id,
      title,
      isCompleated
    }
  }
`;

const TOGGLE_COMPLEATED = gql`
  mutation ToggleCompleated($id: ID!, $isCompleated: Boolean!) {
    setCompleated(id: $id, isCompleated: $isCompleated) {
      id,
      isCompleated
    }
  }
`;

function GetItemList() {
  const { loading, error, data } = useQuery(ITEM_LIST);
  const [toggleCompleated] = useMutation(TOGGLE_COMPLEATED);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error)
    return <p>Error :(</p>;
  }
  return data.list.map((item) => (
    <ListItem key={item.id} button disableRipple>
      <Checkbox
        checked={item.isCompleated}
        onClick={e => e.stopPropagation()}
        onChange={(e) => toggleCompleated({variables: {id: item.id, isCompleated: e.target.checked}})} />
      <ListItemText primary={item.title} />
      <ListItemSecondaryAction>
        <IconButton size="small"><Edit /></IconButton>
        <IconButton size="small"><Delete /></IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));
}

export default function() {
  return (
    <List dense>
      {GetItemList()}
    </List>
  )
};
