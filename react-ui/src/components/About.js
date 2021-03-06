import { Accordion, AccordionPanel } from '@salesforce/design-system-react';
import React, { Component } from 'react';

export default class About extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
          id: 1,
          summary: 'This is a test accordion panel',
          details: 'These are some test details'
        }
      ]
    }
  }


  togglePanel(event, data) {
		this.setState((state) => ({
			...state,
			expandedPanels: {
				[data.id]: !state.expandedPanels[data.id],
			},
		}));
		if (this.props.action) {
			const dataAsArray = Object.keys(data).map((id) => data[id]);
			this.props.action('onClick')(event, ...dataAsArray);
		} else if (console) {
			console.log('[onSelect] (event, data)', event, data);
		}
	}

  render() {
    return (
      <div>
        <div className="slds-box slds-theme_default">
          <div className="slds-grid slds-gutters">
            <div className="slds-col">
              <div className="slds-text-heading_medium slds-border_bottom">
                What is SubFinder?
              </div>
              
              <div className="slds-text-body_medium">
                Have you ever gotten the question &quot;Where can I find &quot; SubFinder was developed to be a &quot;super&quot; admin tool to allow you to find data about your Subscribers that may be tucked away in 
              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }
}
