import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Navigation from './components/Navigation/Navigation';
// import Navigation from './components/Navigation/Nav';
// import Navigation from './components/Navigation/NavBar';
import Auth from './components/Auth/Auth';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <React.Fragment>
            <Switch>
              <Route path='/login' exact component={Auth} />
              <Route path='/' component={Navigation} />
            </Switch>
          </React.Fragment>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
