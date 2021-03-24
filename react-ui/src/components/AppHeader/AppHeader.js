import './AppHeader.css'
import React from 'react';
import { Link } from 'react-router-dom';
import {
  PageHeader,
  IconSettings,
  Icon,
  GlobalNavigationBar,
  GlobalNavigationBarLink,
  GlobalNavigationBarRegion,
  GlobalNavigationBarButton,
} from '@salesforce/design-system-react'

class AppHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
			pageSelected: '/'
    }
  }

  render() {
    return (
      <div data-testid="appHeader">
        <IconSettings iconPath="/icons/">
          <PageHeader
            icon={
              <Icon
                category="standard"
                name="forecasts"
                size="large"
              />
            }
            title="SubFinder"
            variant="object-home"
            info="Welcome to SubFinder - The tool to help you find your Subscribers' data!"
          />
          <div id="links" className="slds-theme_default " >
            <div className="slds-context-bar">
              <div className="slds-context-bar__primary">
                <li 
                  className={`slds-context-bar__item ${this.state.pageSelected === '/' ? 'slds-is-active' : null}`} 
                  id="home-link"
                >
                  <Link 
                    to="/" 
                    className='slds-context-bar__label-action'
                    onClick={() => this.setState({pageSelected: '/'})}
                  >
                    <span className="slds-truncate" title="Home">Home</span>
                  </Link>
                </li>
                <li 
                  className={`slds-context-bar__item ${this.state.pageSelected === '/about' ? 'slds-is-active' : null}`}
                  id="about-link"
                >
                  <Link 
                    to="/about" 
                    className="slds-context-bar__label-action"
                    onClick={() => this.setState({pageSelected: '/about'})}
                  >
                    <span className="slds-truncate" title="About">About</span>
                  </Link>
                </li>
              </div>
            </div>
          </div>

        </IconSettings>
      </div>

    )
  }
}

export default AppHeader