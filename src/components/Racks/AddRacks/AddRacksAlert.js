import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Spinner from '../../Spinner/Spinner';

const addRacksAlert = props => (
  <Dialog
    open={props.open}
    onClose={props.onToggleAlert}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <div style={{position: 'relative'}}>
      <DialogTitle id="alert-dialog-title">Save the Data?</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you save the data, then data will save in your Databases.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.onToggleAlert} color="primary">
          Cancel
        </Button>

        <Button onClick={props.added} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>

      {props.loading ? <Spinner /> : null}
    </div>
  </Dialog>
);

const mapStateToProps = state => {
  return {
    loading: state.racksReducer.loading
  };
};

export default connect(mapStateToProps)(addRacksAlert);