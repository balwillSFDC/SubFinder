import './AppHeader.css'
import React from 'react';
import { Link } from 'react-router-dom';
import {
  PageHeader,
  PageHeaderControl,
  IconSettings,
  Icon,
} from '@salesforce/design-system-react'

class AppHeader extends React.Component {
  links() {
    <>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </>
  }
  
  render() {
    return (

      <IconSettings iconPath="/icons/">
        <PageHeader
          icon={
            <Icon
              category="standard"
              name="forecasts"
            />
          }
          title="SubFinder"
          variant="object-home"
          className="pageHeader"
        />
        <div id="links" className="slds-box slds-theme_default" >
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </div>
      </IconSettings>


    )
  }
}

export default AppHeader