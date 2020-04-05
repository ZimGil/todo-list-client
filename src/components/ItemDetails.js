import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { ITEM_QUERY } from '../gql/queries';
import { EDIT_MUTATION } from '../gql/mutations';

export default function(props) {
  const [deadline, setDeadline] = useState();
  const [description, setDescription] = useState();
  const [initialData, setInitialData] = useState();
  const { loading, error, data } = useQuery(ITEM_QUERY, {variables: props});
  const [editItem] = useMutation(EDIT_MUTATION);
  useMemo(() => {
    if (data) {
      setDeadline(data.item.deadline);
      setDescription(data.item.description);
      setInitialData(data.item);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error)
    return <p>Error :(</p>;
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <form noValidate autoComplete="off" style={{width: '100%'}}>
        <div style={{marginBottom: '15px'}}>
          <DateTimePicker
            autoOk
            inputVariant="outlined"
            ampm={false}
            value={deadline}
            onChange={(v) => setDeadline(new Date(v).toISOString())}
            label="Deadline" />
        </div>
          <TextField
            style={{width: '100%'}}
            id="outlined-multiline-static"
            rows="4"
            multiline
            variant="outlined"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        <div style={{marginTop: '0.5em'}}>
          <Button
            variant="contained"
            color="primary"
            disabled={!isSaveable()}
            startIcon={<SaveIcon />}
            onClick={saveEdit}
            style={{marginRight: '5px'}}>
              Save
            </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={reserState}>
              Clear
          </Button>
        </div>
      </form>
      </MuiPickersUtilsProvider>
  );

  function isSaveable() {
    return initialData
      && (initialData.description !== description
      || initialData.deadline !== deadline);
  }

  function reserState() {
    setDeadline(initialData.deadline);
    setDescription(initialData.description);
  }

  function saveEdit() {
    const variables = Object.assign({deadline, description}, props);
    editItem({variables})
      .then(({data}) => setInitialData(data.editItem));
  }
}
