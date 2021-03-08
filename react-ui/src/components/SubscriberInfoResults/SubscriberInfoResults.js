import React, { Component } from 'react'
import {connect} from 'react-redux'
import { 
  Card,
  Icon,
  DataTable,
  DataTableColumn, } from '@salesforce/design-system-react'

const mapStateToProps = state => {
  return {
    results: state.results
  } 
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

class SubscriberInfoResults extends Component {
  
  componentDidMount() {

  }
  
  render() {
    let subscriberInfoResults = this.props.results.subscriberInfo
    let displayMessage;
    let displayResult;

    const columns = [
      <DataTableColumn
        key='subCardColumn-SubscriberKey'
        label='Subscriber Key'
        property='SubscriberKey'
      />,
      <DataTableColumn
        key='subCardColumn-EmailAddress'
        label='Email Address'
        property='EmailAddress'
      />,
      <DataTableColumn
        key='subCardColumn-SubscriberId'
        label='Subscriber ID'
        property='ID'
      />,
      <DataTableColumn
        key='subCardColumn-CreatedDate'
        label='Created Date'
        property='CreatedDate'
      />,
      <DataTableColumn
        key='subCardColumn-Status'
        label='Status'
        property='Status'
      />
    ]
    
    if (subscriberInfoResults.length > 1) {
      displayMessage = (
        <div className={"slds-text-color_success slds-text-heading_medium"}>
          {subscriberInfoResults.length} Subscribers were found in the All Subscribers List
        </div>
      )
    } else if (subscriberInfoResults.length === 1) {
      displayMessage = (
        <div className={"slds-text-color_success slds-text-heading_medium"}>
          {subscriberInfoResults.length} Subscriber was found in the All Subscribers List
        </div>
      ) 
    } else {
      displayMessage = (
        <div className={"slds-text-color_error slds-text-heading_medium"}>
          No Subscribers were found in the All Subscribers List
        </div>
      )
    }

    if (subscriberInfoResults.length > 0) {
      displayResult = (
        <Card 
          key={`subCard`}
          heading='All Subscribers Info'
          icon={<Icon category="standard" name="contact" size="small"/>}
        >

          <DataTable items={subscriberInfoResults}>
            {columns}
          </DataTable>
            
        </Card>
      )
    } else {
      displayResult = null
    }

  
    return (
      <div>
        <div style={{marginBottom: '1em'}}>
          {displayMessage}
        </div>
        {displayResult}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriberInfoResults)