/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import PaperExampleSimple from './PaperExampleSimple.jsx';
import PaperExampleRounded from './PaperExampleRounded.jsx';
import PaperExampleCircle from './PaperExampleCircle.jsx';
import PopoverExampleSimple from './PopoverExampleSimple.jsx';


const muiTheme = getMuiTheme();

class Main extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
            <PaperExampleSimple/>
            <PaperExampleRounded/>
            <PaperExampleCircle/>
            <PopoverExampleSimple/>
        </div>
        
      </MuiThemeProvider>
    );
  }
}

export default Main;
