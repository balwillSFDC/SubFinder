import React, { Component } from 'react';

export default class About extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [
      ]
    }
  }

  render() {
    return (
      <div data-testid="about-page">
        <div className="slds-box slds-theme_default">
          <div className="slds-grid slds-gutters">
            <div className="slds-col">
              <div 
                className="slds-text-heading_medium slds-align_absolute-center" 
                style={{marginBottom: '1em'}}
              >
                Coming Soon! Please visit the Github Wiki below
              </div>
              <div className="slds-align_absolute-center" >
                <a href='https://github.com/balwillSFDC/SubFinder/wiki' 
                  target='_blank'
                  rel="noreferrer"
                >
                  <img 
                    src={process.env.PUBLIC_URL + '/assets/images/github/GitHub-Mark-64px.png'} alt='github-logo'   
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
