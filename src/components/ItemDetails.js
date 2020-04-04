import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const ITEM_QUERY = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      description,
      deadline,
    }
  }
`;


export default function(props) {
  const { loading, error, data } = useQuery(ITEM_QUERY, {variables: props});
  const [deadline, setDeadline] = useState();
  const [description, setDescription] = useState();
  useMemo(() => {
    if (data) {
      setDeadline(data.item.deadline);
      setDescription(data.item.description);
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
            onChange={setDeadline}
            label="Deadline" />
        </div>
        <div>
          <TextField
            type="text"
            style={{width: '100%'}}
            id="outlined-multiline-static"
            rows="4"
            multiline
            variant="outlined"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </div>
      </form>
      </MuiPickersUtilsProvider>
  );
}
