import React from 'react';

import { 
  Typography, Button, TextField, Tooltip, Paper, IconButton,
  FormControl, FormHelperText
} from '@material-ui/core';

import CloseItem from '@material-ui/icons/Close';

const updateClassifications = props => {
  return (
    <Paper style={styles.container}>
      <div style={styles.contentHeader}>
        <Typography variant='h6'>
          Update Classifications
        </Typography>
        <Tooltip title='close' onClick={props.closed}>
          <IconButton aria-label='close'>
            <CloseItem />
          </IconButton>
        </Tooltip>
      </div>
      <div style={styles.contentBody}>
        <FormControl error style={styles.textFieldName}>
          <TextField
            id="name"
            label="Name"
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
        <FormControl error style={styles.textFieldDescription}>
          <TextField
            id="description"
            label="Description"
            value={props.input.description}
            onChange={props.changed('description')}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {props.inputMessage.description 
            ? <FormHelperText>{props.inputMessage.description}</FormHelperText>
            : null
          }
        </FormControl>
      </div>
      <div style={styles.contentNavigation}>
        <Button onClick={props.closed}>
          Cancel
        </Button>
        <Button onClick={props.onToggleAlert}>
          Save
        </Button>
      </div>
    </Paper>
  );
};

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
  textFieldName: {
    width: '25%'
  },
  textFieldDescription: {
    width: '74%'
  }
};

export default updateClassifications;