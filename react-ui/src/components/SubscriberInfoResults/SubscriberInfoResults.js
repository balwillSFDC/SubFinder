import './SubscriberInfoResults.css'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { 
  Card,
  Icon,
  DataTable,
  DataTableColumn,
  IconSettings } from '@salesforce/design-system-react'

const mapStateToProps = state => {
  return {
    findSubscriberJobs: state.findSubscriberJobs,
    currentJobId: state.currentJobId
  } 
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

class SubscriberInfoResults extends Component {
  
  componentDidMount() {

  }
  
  render() {
    let currentJob = this.props.findSubscriberJobs.find( job => job.id == this.props.currentJobId)
    let subscriberInfoResults = currentJob.result.subscriberInfo
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
        <IconSettings iconPath='/icons/' >
          <Card 
            key={`subCard`}
            heading='All Subscribers Info'
            icon={<Icon category="standard" name="people" size="small"/>}
          >

            <DataTable items={subscriberInfoResults}>
              {columns}
            </DataTable>
            
          </Card>
        </IconSettings>
        
      )
    } else {
      displayResult = null
    }

  
    return (
      <div>
        <div id='display-message' >
          {displayMessage}
        </div>
        {displayResult}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriberInfoResults)