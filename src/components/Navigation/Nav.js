import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import SettingsIcon from '@material-ui/icons/Settings';

import Collection from './../Collection/Collection';
import Home from './../Home/Home';
import User from './../User/User';
import Map from './../Map/Map';
import MapAdd from './../Map/MapAdd';
import Types from './../Types/Types';
import TypesAdd from './../Types/TypesAdd';
import TypesUpdate from './../Types/TypesUpdate';
import * as actions from './../../store/actions/index';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    whiteSpace: 'nowrap',
    height: '100vh',
    position: 'sticky',
    top: 0, 
    bottom: 0,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    width: `calc(100% - ${drawerWidth}px)`
  },
});

class Navigation extends React.Component {
  state = {
    open: false,
    submenuData: false,
    datas: [
      'users',
      'collections',
      'authoritys',
      'classifications',
      'familys',
      'ages',
      'acquisions',
      'maps',
      'types',
      'scales',
      'islands',
      'racks',
      'drawers'
    ]
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.props.history.push('/login');
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  submenuHandler = () => {
    this.setState(prevState => {
      return {submenuData: !prevState.submenuData};
    });
  }

  onLogout = () => {
    this.props.onLogout();

    this.props.history.push('/login');
  }

  render() {
    const { classes, theme } = this.props;

    const datasMenu = this.state.datas;

    let datas = datasMenu.map(data => (
      <NavLink 
        to={'/' + data} 
        exact 
        key={data}
        className='navLink'
        activeClassName='navLinkActive'
      >
        <ListItem button>
          <ListItemIcon style={{color: 'transparent'}}>
            <HomeIcon /> 
          </ListItemIcon>
          <ListItemText primary={data} />
        </ListItem>
      </NavLink>
    ));
    
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
            color='inherit'
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                GeoFriendly
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <NavLink 
                to='/' 
                exact
                className='navLink'
                activeClassName='navLinkActive'
              >
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon /> 
                  </ListItemIcon>
                  <ListItemText primary='Home' />
                </ListItem>
              </NavLink>
              <ListItem button onClick={this.submenuHandler}>
                <ListItemIcon>
                  <DataUsageIcon /> 
                </ListItemIcon>
                <ListItemText primary='Data' />
              </ListItem>
              <div style={{display: this.state.submenuData ? 'block' : 'none'}}>
                {datas}
              </div>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={this.onLogout}>
                <ListItemIcon>
                  <SettingsIcon /> 
                </ListItemIcon>
                <ListItemText primary='Settings' />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path='/types/update' exact component={TypesUpdate} />
              <Route path='/types/add' exact component={TypesAdd} />
              <Route path='/types' exact component={Types} />
              <Route path='/maps/add' exact component={MapAdd} />
              <Route path='/maps' exact component={Map} />
              <Route path='/users' exact component={User} />
              <Route path='/collections' exact component={Collection} />
              <Route path='/' exact component={Home} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Navigation));