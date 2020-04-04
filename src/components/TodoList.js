import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelAction from '@material-ui/core/ExpansionPanelActions';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete'

import ItemDetails from './ItemDetails';

const ITEM_LIST_QUERY = gql`
  {
    list {
      id,
      title,
      isCompleated
    }
  }
`;

const TOGGLE_COMPLEATED_MUTATION = gql`
  mutation ToggleCompleated($id: ID!, $isCompleated: Boolean!) {
    setCompleated(id: $id, isCompleated: $isCompleated) {
      id,
      isCompleated
    }
  }
`;

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItam($id: ID!) {
    deleteItem(id: $id) {
      id,
      title,
      isCompleated
    }
  }
`;

function ItemList() {
  const [expanded, setExpanded] = useState({});
  const { loading, error, data } = useQuery(ITEM_LIST_QUERY);
  const [toggleCompleated] = useMutation(TOGGLE_COMPLEATED_MUTATION);
  const [deleteItemMutation] = useMutation(DELETE_ITEM_MUTATION);
  const [itemList, setItemList] = useState([]);
  useMemo(() => data && setItemList(data.list), [data]);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error)
    return <p>Error :(</p>;
  }
  return itemList.map((item) => (
    <ExpansionPanel
      key={item.id}
      onClick={() => {
        const newExpanded = Object.assign({}, expanded);
        newExpanded[item.id] = true;
        setExpanded(newExpanded);
      }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
        <IconButton onClick={() => deleteItem(item.id)} size="small"><DeleteIcon /></IconButton>
      </ExpansionPanelAction>
      <ExpansionPanelDetails onClick={e => e.stopPropagation()}>
        {expanded[item.id] && <ItemDetails id={item.id} />}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));

  function deleteItem(id) {
    deleteItemMutation({variables: {id}})
      .then(({data}) => setItemList(data.deleteItem));
  }
}

export default function() {
  const isMobile = !useMediaQuery('(min-width:600px)');
  const style = {
    width: isMobile ? '360px' : '40%',
    margin: '0 auto',
  }
  const topStyle = Object.assign({marginTop: isMobile ? '0.5em' : '2em'}, style);

  return (
    <React.Fragment>
    <h1 style={Object.assign({}, style, topStyle)}>ToDo List</h1>
    <List dense style={style}>
      <ItemList />
    </List>
    </React.Fragment>
  )
};
