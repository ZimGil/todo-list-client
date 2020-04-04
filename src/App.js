import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import TodoList from './components/TodoList'
import './App.css';

export default function() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <TodoList />
    </MuiPickersUtilsProvider>
  )
};
