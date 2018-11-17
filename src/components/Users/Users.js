import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { 
  Table, TableBody, TableCell,TableHead, TablePagination, TableRow, TableSortLabel, 
  Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

import * as actions from '../../store/actions/index';
import AddUsers from './AddUsers/AddUsers';
import AddUsersAlert from './AddUsers/AddUsersAlert';
import AddUsersMessage from './AddUsers/AddUsersMessage';
import UpdateUsers from './UpdateUsers/UpdateUsers';
import UpdateUsersAlert from './UpdateUsers/UpdateUsersAlert';
import UpdateUsersMessage from './UpdateUsers/UpdateUsersMessage';
import DeleteUsers from './DeleteUsers/DeleteUsers';
import DeleteUsersMessage from './DeleteUsers/DeleteUsersMessage';
import Spinner from '../Spinner/Spinner';

function createData(id, username, name, status, authority_id, created_at, updated_at) {
  return { id, username, name, status, authority_id, created_at, updated_at };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'id', numeric: false, disablePadding: true, label: 'Id' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'authority_id', numeric: false, disablePadding: false, label: 'Authority Id' },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Created At' },
  { id: 'updated_at', numeric: false, disablePadding: false, label: 'Updated At' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
  },
  title: {
    flex: '0 0 auto',
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography id="tableTitle" variant='h6'>
            Users Table
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected === 1 ? (
          <React.Fragment>
            <Tooltip title="Edit" onClick={props.openUpdateHandler}>
              <IconButton aria-label="Edit">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" onClick={props.openDeleteHandler}>
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Tooltip title="Refresh" onClick={props.onRefresh}>
              <IconButton aria-label="Refresh">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add" onClick={props.openAddHandler}>
              <IconButton aria-label="Add">
                <AddIcon />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired, 
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
  },
  table: {
    width: '100%'
  },
  tableWrapper: {
    overflowX: 'auto',
    position: 'relative'
  },
});

class Users extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'id',
    selected: [],
    data: [],
    users: [],
    add: {
      open: false,
      openAlert: false,
      message: {
        open: false,
        text: '',
        status: false
      },
      input: {
        name: '',
        username: '',
        password: ''
      },
      inputMessage: {
        name: '',
        username: '',
        password: ''
      }
    },
    update: {
      open: false,
      openAlert: false,
      message: {
        open: false,
        text: '',
        status: false
      },
      input: {
        name: '',
        username: '',
        password: ''
      },
      inputMessage: {
        name: '',
        username: '',
        password: ''
      }
    },
    delete: {
      open: false,
      message: {
        open: false,
        text: '',
        status: false
      }
    },
    page: 0,
    rowsPerPage: 10,
    token: localStorage.getItem('token'),
    loading: false
  };

  async componentDidMount() {
    const token = await localStorage.getItem('token');

    if (!token) {
      return;
    }

    this.props.onFetch(this.state.token);
  }

  componentDidUpdate() {
    if (this.state.users !== this.props.users) {
      this.setState({
        data: [],
        users: this.props.users,
        loading: this.props.loading
      });
      this.props.users.map(user => (
        this.setState(prevState => ({
          data: [
            ...prevState.data,
            createData(user.id, user.username, user.name, user.status, user.authority_id, user.created_at, user.updated_at)
          ]
        }))
      ));
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected[0] = id;
    } else {
      newSelected = [];
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected[0] === id;

  unselectHandler = () => {
    this.setState({
      selected: []
    });
  }

  refreshHandler = () => {
    this.props.onFetch(this.state.token);
  }

  // ------------------- Add Function ---------------------
  openAddHandler = () => {
    this.setState(prevState => ({
      add: {
        ...prevState.add,
        open: true
      }
    }));
  }

  closeAddHandler = () => {
    this.setState(prevState => ({
      add: {
        ...prevState.add,
        open: false
      }
    }));
  }

  inputAddHandler = id => event => {
    const value = event.target.value;
    const name = [id][0];

    this.setState(prevState => ({
      add: {
        ...prevState.add,
        input: {
          ...prevState.add.input,
          [name]: value
        }
      }
    }));
  }

  resetInputAddHandler = () => {
    this.setState(prevState => ({
      add: {
        ...prevState.add,
        input: {
          name: '',
          description: ''
        }
      }
    }));
  }

  addValidationHandler = () => {
    let name = '';
    let username = '';
    let password = '';

    if (!this.state.add.input.name) {
      name = 'name is required';
    } else if (this.state.add.input.name.length < 4) {
      name = 'The name must be at least 4 characters';
    }

    if (!this.state.add.input.username) {
      username = 'username is required';
    } else if (this.state.add.input.username.length < 6) {
      username = 'The username must be at least 6 characters';
    }
    
    if (!this.state.add.input.password) {
      password = 'password is required';
    } else if (this.state.add.input.password.length < 6) {
      password = 'The password must be at least 6 characters';
    }

    this.setState(prevState => ({
      add: {
        ...prevState.add,
        inputMessage: {
          name,
          username,
          password
        }
      }
    }));
  }

  toggleAddAlertHandler = async () => {
    await this.addValidationHandler();

    if ((!this.state.add.inputMessage.name) 
      && (!this.state.add.inputMessage.username)
      && (!this.state.add.inputMessage.password)) {
      this.setState(prevState => ({
        add: {
          ...prevState.add,
          openAlert: !prevState.add.openAlert
        }
      }));
    }
  }

  toggleMessageAddHandler = () => {
    this.setState(prevState => ({
      add: {
        ...prevState.add,
        message: {
          ...prevState.add.message,
          open: !prevState.add.message.open
        }
      }
    }));
  }

  messageAddHandler = () => {
    this.setState(prevState => ({
      add: {
        ...prevState.add,
        message: {
          open: true,
          text: this.props.add.message,
          status: this.props.add.status
        }
      }
    }));
  }

  saveAddHandler = async () => {
    await this.props.onPost(this.state.add.input, this.state.token);
    this.toggleAddAlertHandler();
    this.closeAddHandler();
    this.resetInputAddHandler();
    this.messageAddHandler()
  }

  // ------------------- Update Function ---------------------

  openUpdateHandler = () => {
    const input = this.state.users.filter(age => (
      age.id === this.state.selected[0]
    ));

    this.setState(prevState => ({
      update: {
        ...prevState.update,
        open: true,
        input: {
          name: input[0].name,
          username: input[0].username,
          password: input[0].password
        }
      }
    }));
  }

  closeUpdateHandler = () => {
    this.setState(prevState => ({
      update: {
        ...prevState.update,
        open: false
      }
    }));
  }

  resetInputUpdateHandler = () => {
    this.setState(prevState => ({
      update: {
        ...prevState.update,
        input: {
          name: '',
          username: '',
          password: ''
        }
      }
    }));
  }

  inputUpdateHandler = id => event => {
    const value = event.target.value;
    const name = [id][0];

    this.setState(prevState => ({
      update: {
        ...prevState.update,
        input: {
          ...prevState.update.input,
          [name]: value
        }
      }
    }));
  }

  updateValidationHandler = () => {
    let name = '';
    let username = '';
    let password = '';

    if (!this.state.update.input.name) {
      name = 'name is required';
    } else if (this.state.update.input.name.length < 4) {
      name = 'The name must be at least 4 characters';
    }

    if (!this.state.update.input.username) {
      username = 'username is required';
    } else if (this.state.update.input.username.length < 6) {
      username = 'The username must be at least 6 characters';
    }
    
    if (!this.state.update.input.password) {
      password = 'password is required';
    } else if (this.state.update.input.password.length < 6) {
      password = 'The password must be at least 6 characters';
    }

    this.setState(prevState => ({
      update: {
        ...prevState.update,
        inputMessage: {
          name,
          username,
          password
        }
      }
    }));
  }

  toggleUpdateAlertHandler = async () => {
    await this.updateValidationHandler();

    if ((!this.state.update.inputMessage.name) 
      && (!this.state.update.inputMessage.username)
      && (!this.state.update.inputMessage.password)) {
      this.setState(prevState => ({
        update: {
          ...prevState.update,
          openAlert: !prevState.update.openAlert
        }
      }));
    }
  }

  toggleMessageUpdateHandler = () => {
    this.setState(prevState => ({
      update: {
        ...prevState.update,
        message: {
          ...prevState.update.message,
          open: !prevState.update.message.open
        }
      }
    }));
  }

  messageUpdateHandler = () => {
    this.setState(prevState => ({
      update: {
        ...prevState.update,
        message: {
          open: true,
          text: this.props.update.message,
          status: this.props.update.status
        }
      }
    }));
  }
  
  saveUpdateHandler = async () => {
    const id = this.state.selected[0] ? this.state.selected[0].toString() : '1';

    await this.props.onUpdate(id, this.state.token, this.state.update.input);
    this.toggleUpdateAlertHandler();
    this.closeUpdateHandler();
    this.resetInputUpdateHandler();
    this.messageUpdateHandler();
  }

  // ------------------- Delete Function ---------------------

  deleteHandler = async () => {
    const id = this.state.selected[0];

    await this.props.onDelete(id, this.state.token);
    this.toggleDeleteAlertHandler();
    this.unselectHandler();
    this.messageDeleteHandler();
  }

  toggleDeleteAlertHandler = () => {
    this.setState(prevState => ({
      delete: {
        ...prevState.delete,
        open: !prevState.delete.open
      }
    }));
  }

  toggleMessageDeleteHandler = () => {
    this.setState(prevState => ({
      delete: {
        ...prevState.delete,
        message: {
          ...prevState.delete.message,
          open: !prevState.delete.message.open
        }
      }
    }));
  }

  messageDeleteHandler = () => {
    this.setState(prevState => ({
      delete: {
        ...prevState.delete,
        message: {
          open: true,
          text: this.props.delete.message,
          status: this.props.delete.status
        }
      }
    }));
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <React.Fragment>
        {this.state.add.message.open
          ? <AddUsersMessage 
              closed={this.toggleMessageAddHandler} 
              message={this.state.add.message.text}
              status={this.state.add.message.status}
            />
          : null
        }

        {this.state.add.open 
          ? <AddUsers 
              closeAddHandler={this.closeAddHandler}
              input={this.state.add.input}
              inputMessage={this.state.add.inputMessage}
              changed={this.inputAddHandler} 
              onToggleAlert={this.toggleAddAlertHandler}
            /> 
          : null
        }

        <AddUsersAlert
          open={this.state.add.openAlert}
          onToggleAlert={this.toggleAddAlertHandler}
          added={this.saveAddHandler} />

        {this.state.update.message.open
          ? <UpdateUsersMessage 
              closed={this.toggleMessageUpdateHandler} 
              message={this.state.update.message.text}
              status={this.state.update.message.status}
            />
          : null
        }

        {this.state.update.open 
          ? <UpdateUsers 
              closed={this.closeUpdateHandler}
              input={this.state.update.input}
              inputMessage={this.state.update.inputMessage}
              changed={this.inputUpdateHandler} 
              onToggleAlert={this.toggleUpdateAlertHandler}
            /> 
          : null
        }

        <UpdateUsersAlert
          open={this.state.update.openAlert}
          onToggleAlert={this.toggleUpdateAlertHandler}
          updated={this.saveUpdateHandler} />

        {this.state.delete.message.open
          ? <DeleteUsersMessage 
              closed={this.toggleMessageDeleteHandler} 
              message={this.state.delete.message.text}
              status={this.state.delete.message.status}
            />
          : null
        }

        <DeleteUsers 
          open={this.state.delete.open}
          onToggleAlert={this.toggleDeleteAlertHandler}
          deleted={this.deleteHandler} />

        <Paper className={classes.root}>
          <EnhancedTableToolbar 
            numSelected={selected.length} 
            openDeleteHandler={this.toggleDeleteAlertHandler}
            openAddHandler={this.openAddHandler}
            openUpdateHandler={this.openUpdateHandler}
            onRefresh={this.refreshHandler}
          />

          <div className={classes.tableWrapper}>
            {this.props.loading ? <Spinner /> : null}

            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
              />

              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          {n.id}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.username}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.name}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.status}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.authority_id}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.created_at}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.updated_at}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </React.Fragment>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users,
    add: state.usersReducer.add,
    update: state.usersReducer.update,
    delete: state.usersReducer.delete,
    loading: state.usersReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetch: token => dispatch(actions.fetchUsers(token)),
    onPost: (user, token) => dispatch(actions.postUsers(user, token)),
    onDelete: (id, token) => dispatch(actions.deleteUsers(id, token)),
    onUpdate: (id, token, user) => dispatch(actions.updateUsers(id, token, user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Users));
