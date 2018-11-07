import React from 'react';

import { 
  Typography, Button, TextField, Tooltip, Paper, IconButton,
  FormControl, FormHelperText, Select, MenuItem
} from '@material-ui/core';

import CloseItem from '@material-ui/icons/Close';

const updateMaps = props => (
  <Paper style={styles.container}>
    <div style={styles.contentHeader}>
      <Typography variant='h6'>
        Update Maps
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
          id="code"
          label="code"
          value={props.input.code}
          onChange={props.changed('code')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.code 
          ? <FormHelperText>{props.inputMessage.code}</FormHelperText>
          : null
        }
      </FormControl>
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
      <FormControl style={styles.textFieldReference}>
        <Typography variant='caption'>Islands Id</Typography>
        <Select
          value={props.input.island_id}
          onChange={props.changed('island_id')}
          displayEmpty
          name='island_id'
        >
          {props.islands.map(island => (
            <MenuItem key={island.id} value={island.id}>{island.name}</MenuItem>
          ))}
        </Select>
        {props.inputMessage.island_id 
          ? <FormHelperText error style={{marginTop: '1rem'}}>{props.inputMessage.island_id}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl style={styles.textFieldReference}>
        <Typography variant='caption'>Scales Id</Typography>
        <Select
          value={props.input.scale_id}
          onChange={props.changed('scale_id')}
          displayEmpty
          name='scale_id'
        >
          {props.scales.map(sacale => (
            <MenuItem key={sacale.id} value={sacale.id}>{sacale.name}</MenuItem>
          ))}
        </Select>
        {props.inputMessage.scale_id 
          ? <FormHelperText error style={{marginTop: '1rem'}}>{props.inputMessage.scale_id}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl style={styles.textFieldReference}>
        <Typography variant='caption'>Types Id</Typography>
        <Select
          value={props.input.type_id}
          onChange={props.changed('type_id')}
          displayEmpty
          name='type_id'
        >
          {props.types.map(type => (
            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
          ))}
        </Select>
        {props.inputMessage.type_id 
          ? <FormHelperText error style={{marginTop: '1rem'}}>{props.inputMessage.type_id}</FormHelperText>
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
    width: '19%'
  },
  textFieldReference: {
    width: '19%',
    paddingTop: '.84rem'
  },
};

export default updateMaps;