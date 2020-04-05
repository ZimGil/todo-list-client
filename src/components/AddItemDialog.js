import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(null);
  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Dialog
        open={props.open}
        onClose={props.close}
        fullWidth
        maxWidth="sm">
          <DialogTitle id="simple-dialog-title">Add ToDo</DialogTitle>
          <DialogContent dividers style={style}>
            <TextField
              fullWidth
              required
              error={!title}
              style={{marginTop: '10px'}}
              variant="outlined"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} />
            <TextField
              fullWidth
              style={{marginTop: '10px'}}
              rows="4"
              multiline
              variant="outlined"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
            <DateTimePicker
              autoOk
              fullWidth
              style={{marginTop: '10px'}}
              inputVariant="outlined"
              ampm={false}
              value={deadline}
              onChange={(v) => setDeadline(new Date(v).toISOString())}
              label="Deadline" />
          </DialogContent>
          <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disabled={!title}
            startIcon={<SaveIcon />}
            onClick={addAndClose}>
              Save
            </Button>
          </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );

  function addAndClose() {
    props.addItem({title, description, deadline});
    props.close();
    resetState();
  }

  function resetState() {
    setTitle('');
    setDescription('');
    setDeadline(null);
  }
}
