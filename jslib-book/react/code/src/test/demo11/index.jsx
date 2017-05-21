import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {
    HashRouter as Router,
    Route,
    Link,
    withRouter
} from 'react-router-dom'

// A simple component that shows the pathname of the current location
class ShowTheLocation extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props

    return (
      <div>You are now at {location.pathname}</div>
    )
  }
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
const ShowTheLocationWithRouter = withRouter(ShowTheLocation)

class App extends Component {
    render (){
        return (
            <Router>
                <div>
                    <ShowTheLocationWithRouter />
                </div>
            </Router>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById('app'))