import './AppHeader.css'
import React from 'react';
import { Link } from 'react-router-dom';

class AppHeader extends React.Component {
    render() {
        return (
          <div id="add-header" className="slds-box slds-theme_default" >
              <h1 id="app-name" className="slds-text-heading_large" >SubFinder</h1>
              <Link to="/">Home</Link> | <Link to="/about">About</Link>
          </div>
        )
    }
}

export default AppHeader