import React from 'react';

import { 
  Typography, Button, TextField, Tooltip, Paper, IconButton,
  FormControl, FormHelperText
} from '@material-ui/core';

import CloseItem from '@material-ui/icons/Close';

const addUsers = props => (
  <Paper style={styles.container}>
    <div style={styles.contentHeader}>
      <Typography variant='h6'>
        Add Users
      </Typography>
      <Tooltip title='close' onClick={props.closeAddHandler}>
        <IconButton aria-label='close'>
          <CloseItem />
        </IconButton>
      </Tooltip>
    </div>
    <div style={styles.contentBody}>
      <FormControl error style={styles.textField}>
        <TextField
          id="name"
          label="name"
          value={props.input.name}
          onChange={props.changed('name')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.name 
          ? <FormHelperText>{props.inputMessage.name}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error style={styles.textField}>
        <TextField
          id="username"
          label="username"
          value={props.input.username}
          onChange={props.changed('username')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.username 
          ? <FormHelperText>{props.inputMessage.username}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error style={styles.textField}>
        <TextField
          id="password"
          label="password"
          value={props.input.password}
          onChange={props.changed('password')}
          margin="normal"
          type='password'
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.password 
          ? <FormHelperText>{props.inputMessage.password}</FormHelperText>
          : null
        }
      </FormControl>
    </div>
    <div style={styles.contentNavigation}>
      <Button onClick={props.closeAddHandler}>
        Cancel
      </Button>
      <Button onClick={props.onToggleAlert}>
        Save
      </Button>
    </div>
  </Paper>
);

const styles = {
  container: {
    marginBottom: '1.5rem',
    overflow: 'hidden'
  },
  contentHeader: {
    padding: '.75rem .5rem .75rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentBody: {
    padding: '.75rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between'
  },
  contentNavigation: {
    padding: '.75rem 1.5rem',
    textAlign: 'right'
  },
  textField: {
    width: '32%'
  }
};

export default addUsers;