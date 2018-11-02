import React from 'react';

import { 
  Typography, Button, TextField, Tooltip, Paper, IconButton,
  FormControl, FormHelperText, Select, MenuItem
} from '@material-ui/core';

import CloseItem from '@material-ui/icons/Close';

const addDrawers = props => (
  <Paper style={styles.container}>
    <div style={styles.contentHeader}>
      <Typography variant='h6'>
        Add Drawers
      </Typography>
      <Tooltip title='close' onClick={props.closeAddHandler}>
        <IconButton aria-label='close'>
          <CloseItem />
        </IconButton>
      </Tooltip>
    </div>
    <div style={styles.contentBody}>
      <FormControl error style={styles.textFieldName}>
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
      <FormControl style={styles.textFieldRacksId}>
        <Typography variant='caption'>Racks Id</Typography>
        <Select
          value={props.input.rack_id}
          onChange={props.changed('rack_id')}
          displayEmpty
          name='rack_id'
        >
          <MenuItem value="" disabled>
            Select Rack Id
          </MenuItem>
          {props.racks.map(rack => (
            <MenuItem key={rack.id} value={rack.id}>{rack.name}</MenuItem>
          ))}
        </Select>
        {props.inputMessage.rack_id 
          ? <FormHelperText error style={{marginTop: '1rem'}}>{props.inputMessage.rack_id}</FormHelperText>
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
    justifyContent: 'space-between',
  },
  contentNavigation: {
    padding: '.75rem 1.5rem',
    textAlign: 'right'
  },
  textFieldName: {
    width: '20%',
  },
  textFieldRacksId: {
    width: '20%',
    paddingTop: '.85rem'
  },
  textFieldDescription: {
    width: '57%'
  }
};

export default addDrawers;