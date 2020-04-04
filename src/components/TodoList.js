import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import List from '@material-ui/core/List';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelAction from '@material-ui/core/ExpansionPanelActions';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
    <ExpansionPanel key={item.id}>
      <ExpansionPanelSummary>
      <FormControlLabel
        aria-label="Acknowledge"
        onClick={(event) => event.stopPropagation()}
        onFocus={(event) => event.stopPropagation()}
        control={<Checkbox />}
        onChange={(e) => toggleCompleated({variables: {id: item.id, isCompleated: e.target.checked}})}
        checked={item.isCompleated}
        label={item.title}      />
      </ExpansionPanelSummary>
      <ExpansionPanelAction onClick={e => e.stopPropagation()} >
        <IconButton size="small"><Edit /></IconButton>
        <IconButton size="small"><Delete /></IconButton>
      </ExpansionPanelAction>
      <ExpansionPanelDetails>GGWP</ExpansionPanelDetails>
    </ExpansionPanel>
  ));
}

export default function() {
  return (
    <List dense>
      {GetItemList()}
    </List>
  )
};
