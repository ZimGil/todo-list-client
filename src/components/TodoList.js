import React, { Fragment, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';

import ItemList from './ItemList';
import AddItemDialog from './AddItemDialog';
import { ADD_ITEM_MUTATION } from './../gql/mutations';

export default function() {
  const [latestItem, setLatestItem] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [addItemMutation] = useMutation(ADD_ITEM_MUTATION);
  const isMobile = !useMediaQuery('(min-width:600px)');
  const listStyle = {
    width: isMobile ? '360px' : '40%',
    margin: '0 auto',
  };
  const topStyle = {
    width: isMobile ? '360px' : '40%',
    margin: '0 auto',
    marginTop: isMobile ? '0.5em' : '2em',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const addItem = (variables) => {
    addItemMutation({variables})
      .then(({data}) => setLatestItem(data.addItem));
  };

  return (
    <Fragment>
      <AddItemDialog
        open={isDialogOpen}
        close={() => setDialogOpen(false)}
        addItem={addItem} />
      <div style={topStyle}>
        <h1>ToDo List</h1>
        <div>
          <IconButton
            color="secondary"
            onClick={() => setDialogOpen(true)}>
              <AddIcon />
          </IconButton>
        </div>
      </div>
      <List dense style={listStyle}>
        <ItemList latestItem={latestItem} />
      </List>
    </Fragment>
  );
};
