import React from 'react';

import { 
  Typography, Button, TextField, Tooltip, Paper, IconButton,
  FormControl, FormHelperText, Select, MenuItem
} from '@material-ui/core';

import CloseItem from '@material-ui/icons/Close';
import classes from './UpdateCollections.module.scss';

const updateCollections = props => (
  <Paper style={styles.container}>
    <div style={styles.contentHeader}>
      <Typography variant='h6'>
        Update Collections
      </Typography>
      <Tooltip title='close' onClick={props.closed}>
        <IconButton aria-label='close'>
          <CloseItem />
        </IconButton>
      </Tooltip>
    </div>
    <div style={styles.contentBody}>
      <FormControl error className={classes.textField2}>
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
      <FormControl error className={classes.textField2}>
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
      <FormControl error className={classes.textField2}>
        <TextField
          id="inventory"
          label="inventory"
          value={props.input.inventory}
          onChange={props.changed('inventory')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.inventory 
          ? <FormHelperText>{props.inputMessage.inventory}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="registration"
          label="registration"
          value={props.input.registration}
          onChange={props.changed('registration')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.registration 
          ? <FormHelperText>{props.inputMessage.registration}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="synonym"
          label="synonym"
          value={props.input.synonym}
          onChange={props.changed('synonym')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.synonym 
          ? <FormHelperText>{props.inputMessage.synonym}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="amount"
          label="amount"
          value={props.input.amount}
          onChange={props.changed('amount')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.amount 
          ? <FormHelperText>{props.inputMessage.amount}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="founder"
          label="founder"
          value={props.input.founder}
          onChange={props.changed('founder')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.founder 
          ? <FormHelperText>{props.inputMessage.founder}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="collector"
          label="collector"
          value={props.input.collector}
          onChange={props.changed('collector')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.collector 
          ? <FormHelperText>{props.inputMessage.collector}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="location"
          label="location"
          value={props.input.location}
          onChange={props.changed('location')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.location 
          ? <FormHelperText>{props.inputMessage.location}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="coordinate"
          label="coordinate"
          value={props.input.coordinate}
          onChange={props.changed('coordinate')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.coordinate 
          ? <FormHelperText>{props.inputMessage.coordinate}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="formation"
          label="formation"
          value={props.input.formation}
          onChange={props.changed('formation')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.formation 
          ? <FormHelperText>{props.inputMessage.formation}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="determination"
          label="determination"
          value={props.input.determination}
          onChange={props.changed('determination')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.determination 
          ? <FormHelperText>{props.inputMessage.determination}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="redetermination"
          label="redetermination"
          value={props.input.redetermination}
          onChange={props.changed('redetermination')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.redetermination 
          ? <FormHelperText>{props.inputMessage.redetermination}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="type"
          label="type"
          value={props.input.type}
          onChange={props.changed('type')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.type 
          ? <FormHelperText>{props.inputMessage.type}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="width"
          label="width"
          value={props.input.width}
          onChange={props.changed('width')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.width 
          ? <FormHelperText>{props.inputMessage.width}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="height"
          label="height"
          value={props.input.height}
          onChange={props.changed('height')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.height 
          ? <FormHelperText>{props.inputMessage.height}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="weight"
          label="weight"
          value={props.input.weight}
          onChange={props.changed('weight')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.weight 
          ? <FormHelperText>{props.inputMessage.weight}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="high"
          label="high"
          value={props.input.high}
          onChange={props.changed('high')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.high 
          ? <FormHelperText>{props.inputMessage.high}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="environment"
          label="environment"
          value={props.input.environment}
          onChange={props.changed('environment')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.environment 
          ? <FormHelperText>{props.inputMessage.environment}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="reference"
          label="reference"
          value={props.input.reference}
          onChange={props.changed('reference')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.reference 
          ? <FormHelperText>{props.inputMessage.reference}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl error className={classes.textField2}>
        <TextField
          id="description"
          label="description"
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
      <FormControl error className={classes.textField2}>
        <TextField
          id="photo"
          label="photo"
          value={props.input.photo}
          onChange={props.changed('photo')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {props.inputMessage.photo 
          ? <FormHelperText>{props.inputMessage.photo}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl className={classes.textField2}>
        <Typography variant='caption' className={classes.textField2__caption}>Age Id</Typography>
        <Select
          value={props.input.age_id}
          onChange={props.changed('age_id')}
          displayEmpty
          name='age_id'
        >
          {props.ages.map(age => (
            <MenuItem key={age.id} value={age.id}>{age.name}</MenuItem>
          ))}
        </Select>
        {props.inputMessage.age_id 
          ? <FormHelperText error style={{marginTop: '1rem'}}>{props.inputMessage.age_id}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl className={classes.textField2}>
        <Typography variant='caption' className={classes.textField2__caption}>Family Id</Typography>
        <Select
          value={props.input.family_id}
          onChange={props.changed('family_id')}
          displayEmpty
          name='family_id'
        >
          {props.families.map(family => (
            <MenuItem key={family.id} value={family.id}>{family.name}</MenuItem>
          ))}
        </Select>
        {props.inputMessage.family_id 
          ? <FormHelperText error style={{marginTop: '1rem'}}>{props.inputMessage.family_id}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl className={classes.textField2}>
        <Typography variant='caption' className={classes.textField2__caption}>Drawer Id</Typography>
        <Select
          value={props.input.drawer_id}
          onChange={props.changed('drawer_id')}
          displayEmpty
          name='drawer_id'
        >
          {props.drawers.map(drawer => (
            <MenuItem key={drawer.id} value={drawer.id}>{drawer.name}</MenuItem>
          ))}
        </Select>
        {props.inputMessage.drawer_id 
          ? <FormHelperText error style={{marginTop: '1rem'}}>{props.inputMessage.drawer_id}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl className={classes.textField2}>
        <Typography variant='caption' className={classes.textField2__caption}>Map Id</Typography>
        <Select
          value={props.input.map_id}
          onChange={props.changed('map_id')}
          displayEmpty
          name='map_id'
        >
          {props.maps.map(map => (
            <MenuItem key={map.id} value={map.id}>{map.name}</MenuItem>
          ))}
        </Select>
        {props.inputMessage.map_id 
          ? <FormHelperText error style={{marginTop: '1rem'}}>{props.inputMessage.map_id}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl className={classes.textField2}>
        <Typography variant='caption' className={classes.textField2__caption}>Acquisition Id</Typography>
        <Select
          value={props.input.acquisition_id}
          onChange={props.changed('acquisition_id')}
          displayEmpty
          name='acquisition_id'
        >
          {props.acquisitions.map(acquisition => (
            <MenuItem key={acquisition.id} value={acquisition.id}>{acquisition.name}</MenuItem>
          ))}
        </Select>
        {props.inputMessage.acquisition_id 
          ? <FormHelperText error style={{marginTop: '1rem'}}>{props.inputMessage.acquisition_id}</FormHelperText>
          : null
        }
      </FormControl>
      <FormControl className={classes.textField2}>
        <TextField
          id="taken_at"
          label="taken_at"
          type="date"
          value={props.input.taken_at}
          onChange={props.changed('taken_at')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
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
  },
  contentNavigation: {
    padding: '.75rem 1.5rem',
    textAlign: 'right'
  }
};

export default updateCollections;