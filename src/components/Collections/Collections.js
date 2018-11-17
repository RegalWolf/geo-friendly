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
import AddCollections from './AddCollections/AddCollections';
import AddCollectionsAlert from './AddCollections/AddCollectionsAlert';
import AddCollectionsMessage from './AddCollections/AddCollectionsMessage';
import UpdateCollections from './UpdateCollections/UpdateCollections';
import UpdateCollectionsAlert from './UpdateCollections/UpdateCollectionsAlert';
import UpdateCollectionsMessage from './UpdateCollections/UpdateCollectionsMessage';
import DeleteCollections from './DeleteCollections/DeleteCollections';
import DeleteCollectionsMessage from './DeleteCollections/DeleteCollectionsMessage';
import Spinner from '../Spinner/Spinner';

function createData(id, registration, inventory, code, name, synonym, amount, founder, 
  collector, location, coordinate, formation, determination, redetermination, type,
  width, height, weight, high, environment, reference, description, photo, family_id, 
  age_id, drawer_id, map_id, acquisition_id, user_id, taken_at, created_at, updated_at) {
  return { id, registration, inventory, code, name, synonym, amount, founder, 
    collector, location, coordinate, formation, determination, redetermination, type,
    width, height, weight, high, environment, reference, description, photo, family_id, 
    age_id, drawer_id, map_id, acquisition_id, user_id, taken_at, created_at, updated_at };
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
  { id: 'registration', numeric: false, disablePadding: false, label: 'Registration' },
  { id: 'inventory', numeric: false, disablePadding: false, label: 'Inventory' },
  { id: 'code', numeric: false, disablePadding: false, label: 'Code' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'synonym', numeric: false, disablePadding: false, label: 'Synonym' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'Amount' },
  { id: 'founder', numeric: false, disablePadding: false, label: 'Founder' },
  { id: 'collector', numeric: false, disablePadding: false, label: 'Collector' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
  { id: 'coordinate', numeric: false, disablePadding: false, label: 'Coordinate' },
  { id: 'formation', numeric: false, disablePadding: false, label: 'Formation' },
  { id: 'determination', numeric: false, disablePadding: false, label: 'Determination' },
  { id: 'redetermination', numeric: false, disablePadding: false, label: 'Redetermination' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'width', numeric: false, disablePadding: false, label: 'Width' },
  { id: 'height', numeric: false, disablePadding: false, label: 'Height' },
  { id: 'weight', numeric: false, disablePadding: false, label: 'Weight' },
  { id: 'high', numeric: false, disablePadding: false, label: 'High' },
  { id: 'environment', numeric: false, disablePadding: false, label: 'Environment' },
  { id: 'reference', numeric: false, disablePadding: false, label: 'Reference' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'photo', numeric: false, disablePadding: false, label: 'Photo' },
  { id: 'family_id', numeric: false, disablePadding: false, label: 'Family_id' },
  { id: 'age_id', numeric: false, disablePadding: false, label: 'Age_id' },
  { id: 'drawer_id', numeric: false, disablePadding: false, label: 'Drawer_id' },
  { id: 'map_id', numeric: false, disablePadding: false, label: 'Map_id' },
  { id: 'acquisition_id', numeric: false, disablePadding: false, label: 'Acquisition_id' },
  { id: 'user_id', numeric: false, disablePadding: false, label: 'User_id' },
  { id: 'taken_at', numeric: false, disablePadding: false, label: 'Taken_at' },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Created_at' },
  { id: 'updated_at', numeric: false, disablePadding: false, label: 'Updated_at' }
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
          <TableCell padding="checkbox" />
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
            Collections Table
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
  },
  table: {
    width: '100%'
  },
  tableWrapper: {
    overflowX: 'auto',
    position: 'relative'
  },
});

class Collections extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'id',
    selected: [],
    data: [],
    collections: [],
    ages: [],
    families: [],
    drawers: [],
    maps: [],
    acquisitions: [],
    add: {
      open: false,
      openAlert: false,
      message: {
        open: false,
        text: '',
        status: false
      },
      input: {
        registration: '', 
        inventory: '', 
        code: '', 
        name: '', 
        synonym: '', 
        amount: '', 
        founder: '', 
        collector: '', 
        location: '', 
        coordinate: '', 
        formation: '', 
        determination: '', 
        redetermination: '', 
        type: '',
        width: '', 
        height: '', 
        weight: '', 
        high: '', 
        environment: '', 
        reference: '', 
        description: '', 
        photo: '', 
        family_id: '', 
        age_id: '', 
        drawer_id: '', 
        map_id: '', 
        acquisition_id: '', 
        user_id: '', 
        taken_at: ''
      },
      inputMessage: {
        code: '',
        name: '',
        inventory: '',
        registration: '',
        age_id: '',
        family_id: '',
        drawer_id: '',
        map_id: '',
        acquisition_id: ''
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
        registration: '', 
        inventory: '', 
        code: '', 
        name: '', 
        synonym: '', 
        amount: '', 
        founder: '', 
        collector: '', 
        location: '', 
        coordinate: '', 
        formation: '', 
        determination: '', 
        redetermination: '', 
        type: '',
        width: '', 
        height: '', 
        weight: '', 
        high: '', 
        environment: '', 
        reference: '', 
        description: '', 
        photo: '', 
        family_id: '', 
        age_id: '', 
        drawer_id: '', 
        map_id: '', 
        acquisition_id: '', 
        user_id: '', 
        taken_at: ''
      },
      inputMessage: {
        code: '',
        name: '',
        inventory: '',
        registration: '',
        age_id: '',
        family_id: '',
        drawer_id: '',
        map_id: '',
        acquisition_id: ''
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

    await this.props.onFetch(this.state.token);
    this.props.onFetchFamilies(this.state.token);
    this.props.onFetchAcquisitions(this.state.token);
    this.props.onFetchMaps(this.state.token);
    this.props.onFetchAges(this.state.token);
    this.props.onFetchDrawers(this.state.token);

    this.setState(prevState => ({
      add: {
        ...prevState.add,
        input: {
          ...prevState.add.input,
          user_id: this.props.user_id
        }
      },
      update: {
        ...prevState.update,
        input: {
          ...prevState.update.input,
          user_id: this.props.user_id
        }
      }
    }));
  }

  componentDidUpdate() {
    if (this.state.collections !== this.props.collections) {
      this.setState({
        data: [],
        collections: this.props.collections,
        loading: this.props.loading
      });
      this.props.collections.map(collection => (
        this.setState(prevState => ({
          data: [
            ...prevState.data,
            createData(collection.id, collection.registration, collection.inventory, collection.code,
              collection.name, collection.synonym, collection.amount, collection.founder, 
              collection.collector, collection.location, collection.coordinate, collection.formation,
              collection.determination, collection.redetermination, collection.type,
              collection.width, collection.height, collection.weight, collection.high,
              collection.environment, collection.reference, collection.description, collection.photo,
              collection.family_id, collection.age_id, collection.drawer_id, collection.map_id,
              collection.acquisition_id, collection.user_id, collection.taken_at, collection.created_at,
              collection.updated_at)
          ]
        }))
      ));
    }

    if (this.state.families !== this.props.families) {
      this.setState({
        families: this.props.families,
      });
    }

    if (this.state.ages !== this.props.ages) {
      this.setState({
        ages: this.props.ages,
      });
    }

    if (this.state.drawers !== this.props.drawers) {
      this.setState({
        drawers: this.props.drawers,
      });
    }

    if (this.state.maps !== this.props.maps) {
      this.setState({
        maps: this.props.maps,
      });
    }

    if (this.state.acquisitions !== this.props.acquisitions) {
      this.setState({
        acquisitions: this.props.acquisitions,
      });
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

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  unselectHandler = () => {
    this.setState({
      selected: []
    });
  }

  refreshHandler = async () => {
    await this.props.onFetch(this.state.token);
    this.props.onFetchAges(this.state.token);
    this.props.onFetchFamilies(this.state.token);
    this.props.onFetchDrawers(this.state.token);
    this.props.onFetchMaps(this.state.token);
    this.props.onFetchAcquisitions(this.state.token);
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
          ...prevState.add.input,
          registration: '', 
          inventory: '', 
          code: '', 
          name: '', 
          synonym: '', 
          amount: '', 
          founder: '', 
          collector: '', 
          location: '', 
          coordinate: '', 
          formation: '', 
          determination: '', 
          redetermination: '', 
          type: '',
          width: '', 
          height: '', 
          weight: '', 
          high: '', 
          environment: '', 
          reference: '', 
          description: '', 
          photo: '', 
          family_id: '', 
          age_id: '', 
          drawer_id: '', 
          map_id: '', 
          acquisition_id: '', 
          taken_at: ''
        }
      }
    }));
  }

  addValidationHandler = () => {
    let code = '';
    let name = '';
    let inventory = '';
    let registration = '';
    let age_id = '';
    let family_id = '';
    let drawer_id = '';
    let map_id = '';
    let acquisition_id = '';

    if (!this.state.add.input.code) {
      code = 'code is required';
    } else if (this.state.add.input.code.length < 4) {
      code = 'The code must be at least 4 characters';
    }

    if (!this.state.add.input.name) {
      name = 'name is required';
    } else if (this.state.add.input.name.length < 4) {
      name = 'The name must be at least 4 characters';
    }

    if (!this.state.add.input.inventory) {
      inventory = 'inventory is required';
    } else if (this.state.add.input.inventory.length < 4) {
      inventory = 'The inventory must be at least 4 characters';
    }

    if (!this.state.add.input.registration) {
      registration = 'registration is required';
    } else if (this.state.add.input.registration.length < 4) {
      registration = 'The registration must be at least 4 characters';
    }

    if (!this.state.add.input.family_id) {
      family_id = 'family_id id is required';
    }

    if (!this.state.add.input.age_id) {
      age_id = 'age_id id is required';
    }

    if (!this.state.add.input.drawer_id) {
      drawer_id = 'drawer_id id is required';
    }

    if (!this.state.add.input.map_id) {
      map_id = 'map_id id is required';
    }

    if (!this.state.add.input.acquisition_id) {
      acquisition_id = 'acquisition_id id is required';
    }

    this.setState(prevState => ({
      add: {
        ...prevState.add,
        inputMessage: {
          code,
          name,
          inventory,
          registration,
          age_id,
          family_id,
          drawer_id,
          map_id,
          acquisition_id
        }
      }
    }));
  }

  toggleAddAlertHandler = async () => {
    await this.addValidationHandler();

    if ((!this.state.add.inputMessage.code) 
      && (!this.state.add.inputMessage.name) 
      && (!this.state.add.inputMessage.inventory) 
      && (!this.state.add.inputMessage.registration) 
      && (!this.state.add.inputMessage.family_id) 
      && (!this.state.add.inputMessage.age_id) 
      && (!this.state.add.inputMessage.drawer_id) 
      && (!this.state.add.inputMessage.map_id) 
      && (!this.state.add.inputMessage.acquisition_id)) {
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
    const input = this.state.collections.filter(collection => (
      collection.id === this.state.selected[0]
    ));

    this.setState(prevState => ({
      update: {
        ...prevState.update,
        open: true,
        input: {
          id: input[0].id, 
          registration: input[0].registration, 
          inventory: input[0].inventory, 
          code: input[0].code, 
          name: input[0].name, 
          synonym: input[0].synonym ? input[0].synonym : '', 
          amount: input[0].amount ? input[0].amount : '', 
          founder: input[0].founder ? input[0].founder : '', 
          collector: input[0].collector ? input[0].collector : '', 
          location: input[0].location ? input[0].location : '', 
          coordinate: input[0].coordinate ? input[0].coordinate : '', 
          formation: input[0].formation ? input[0].formation : '', 
          determination: input[0].determination ? input[0].determination : '', 
          redetermination: input[0].redetermination ? input[0].redetermination : '', 
          type: input[0].type ? input[0].type : '',
          width: input[0].width ? input[0].width : '', 
          height: input[0].height ? input[0].height : '', 
          weight: input[0].weight ? input[0].weight : '', 
          high: input[0].high ? input[0].high : '', 
          environment: input[0].environment ? input[0].environment : '', 
          reference: input[0].reference ? input[0].reference : '', 
          description: input[0].description ? input[0].description : '', 
          photo: input[0].photo ? input[0].photo : '', 
          family_id: input[0].family_id, 
          age_id: input[0].age_id, 
          drawer_id: input[0].drawer_id, 
          map_id: input[0].map_id, 
          acquisition_id: input[0].acquisition_id, 
          taken_at: input[0].taken_at ? input[0].taken_at : '', 
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
          id: '', 
          registration: '', 
          inventory: '', 
          code: '', 
          name: '', 
          synonym: '', 
          amount: '', 
          founder: '', 
          collector: '', 
          location: '', 
          coordinate: '', 
          formation: '', 
          determination: '', 
          redetermination: '', 
          type: '',
          width: '', 
          height: '', 
          weight: '', 
          high: '', 
          environment: '', 
          reference: '', 
          description: '', 
          photo: '', 
          family_id: '', 
          age_id: '', 
          drawer_id: '', 
          map_id: '', 
          acquisition_id: '', 
          taken_at: ''
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
    let code = '';
    let name = '';
    let inventory = '';
    let registration = '';
    let age_id = '';
    let family_id = '';
    let drawer_id = '';
    let map_id = '';
    let acquisition_id = '';

    if (!this.state.update.input.code) {
      code = 'code is required';
    } else if (this.state.update.input.code.length < 4) {
      code = 'The code must be at least 4 characters';
    }

    if (!this.state.update.input.name) {
      name = 'name is required';
    } else if (this.state.update.input.name.length < 4) {
      name = 'The name must be at least 4 characters';
    }

    if (!this.state.update.input.inventory) {
      inventory = 'inventory is required';
    } else if (this.state.update.input.inventory.length < 4) {
      inventory = 'The inventory must be at least 4 characters';
    }

    if (!this.state.update.input.registration) {
      registration = 'registration is required';
    } else if (this.state.update.input.registration.length < 4) {
      registration = 'The registration must be at least 4 characters';
    }

    if (!this.state.update.input.family_id) {
      family_id = 'family_id id is required';
    }

    if (!this.state.update.input.age_id) {
      age_id = 'age_id id is required';
    }

    if (!this.state.update.input.drawer_id) {
      drawer_id = 'drawer_id id is required';
    }

    if (!this.state.update.input.map_id) {
      map_id = 'map_id id is required';
    }

    if (!this.state.update.input.acquisition_id) {
      acquisition_id = 'acquisition_id id is required';
    }

    this.setState(prevState => ({
      update: {
        ...prevState.update,
        inputMessage: {
          code,
          name,
          inventory,
          registration,
          age_id,
          family_id,
          drawer_id,
          map_id,
          acquisition_id
        }
      }
    }));
  }

  toggleUpdateAlertHandler = async () => {
    await this.updateValidationHandler();

    if ((!this.state.update.inputMessage.code) 
      && (!this.state.update.inputMessage.name) 
      && (!this.state.update.inputMessage.inventory) 
      && (!this.state.update.inputMessage.registration) 
      && (!this.state.update.inputMessage.family_id) 
      && (!this.state.update.inputMessage.age_id) 
      && (!this.state.update.inputMessage.drawer_id) 
      && (!this.state.update.inputMessage.map_id) 
      && (!this.state.update.inputMessage.acquisition_id)) {
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
  
  saveUpdateHandler = () => {
    const id = this.state.selected[0] ? this.state.selected[0].toString() : '1';

    this.props.onUpdate(id, this.state.token, this.state.update.input);
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
          ? <AddCollectionsMessage 
              closed={this.toggleMessageAddHandler} 
              message={this.state.add.message.text}
              status={this.state.add.message.status}
            />
          : null
        }

        {this.state.add.open 
          ? <AddCollections 
              closeAddHandler={this.closeAddHandler}
              input={this.state.add.input}
              inputMessage={this.state.add.inputMessage}
              changed={this.inputAddHandler} 
              onToggleAlert={this.toggleAddAlertHandler}
              ages={this.state.ages}
              families={this.state.families}
              drawers={this.state.drawers}
              maps={this.state.maps}
              acquisitions={this.state.acquisitions}
            /> 
          : null
        }

        <AddCollectionsAlert
          open={this.state.add.openAlert}
          onToggleAlert={this.toggleAddAlertHandler}
          added={this.saveAddHandler} />

        {this.state.update.message.open
          ? <UpdateCollectionsMessage 
              closed={this.toggleMessageUpdateHandler} 
              message={this.state.update.message.text}
              status={this.state.update.message.status}
            />
          : null
        }

        {this.state.update.open 
          ? <UpdateCollections 
              closed={this.closeUpdateHandler}
              input={this.state.update.input}
              inputMessage={this.state.update.inputMessage}
              changed={this.inputUpdateHandler} 
              onToggleAlert={this.toggleUpdateAlertHandler}
              ages={this.state.ages}
              families={this.state.families}
              drawers={this.state.drawers}
              maps={this.state.maps}
              acquisitions={this.state.acquisitions}
            /> 
          : null
        }

        <UpdateCollectionsAlert
          open={this.state.update.openAlert}
          onToggleAlert={this.toggleUpdateAlertHandler}
          updated={this.saveUpdateHandler} />

        {this.state.delete.message.open
          ? <DeleteCollectionsMessage 
              closed={this.toggleMessageDeleteHandler} 
              message={this.state.delete.message.text}
              status={this.state.delete.message.status}
            />
          : null
        }

        <DeleteCollections 
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
                          {n.registration}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.inventory}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.code}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.name}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.synonym}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.amount}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.founder}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.collector}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.location}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.coordinate}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.formation}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.determination}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.redetermination}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.type}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.width}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.height}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.weight}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.high}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.environment}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.reference}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.description}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.photo}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.family_id}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.age_id}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.drawer_id}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.map_id}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.acquisition_id}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.user_id}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="default">
                          {n.taken_at}
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

Collections.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user_id: state.authReducer.user_id,
    collections: state.collectionsReducer.collections,
    ages: state.agesReducer.ages,
    maps: state.mapsReducer.maps,
    families: state.familiesReducer.families,
    acquisitions: state.acquisitionsReducer.acquisitions,
    drawers: state.drawersReducer.drawers,
    add: state.collectionsReducer.add,
    update: state.collectionsReducer.update,
    delete: state.collectionsReducer.delete,
    loading: state.collectionsReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetch: token => dispatch(actions.fetchCollections(token)),
    onFetchAges: token => dispatch(actions.fetchAges(token)),
    onFetchFamilies: token => dispatch(actions.fetchFamilies(token)),
    onFetchDrawers: token => dispatch(actions.fetchDrawers(token)),
    onFetchMaps: token => dispatch(actions.fetchMaps(token)),
    onFetchAcquisitions: token => dispatch(actions.fetchAcquisitions(token)),
    onPost: (collection, token) => dispatch(actions.postCollections(collection, token)),
    onDelete: (id, token) => dispatch(actions.deleteCollections(id, token)),
    onUpdate: (id, token, collection) => dispatch(actions.updateCollections(id, token, collection))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Collections));
