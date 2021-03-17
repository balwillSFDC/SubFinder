import './DataExtensionTables.css'
import React, { Component } from 'react';
import {
  Card,
  Icon,
  DataTable,
  DataTableColumn,
  IconSettings,
} from '@salesforce/design-system-react';
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    findSubscriberJobs: state.findSubscriberJobs,
    currentJobId: state.currentJobId
  }
}

const mapDispatchToProps = dispatch => {
  return {dispatch}
}

class DataExtensionTables extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let currentJob = this.props.findSubscriberJobs.find( job => job.id == this.props.currentJobId)
    let dataExtensionResults = currentJob.result.dataExtensionResults

    let dataExtensionResultMessage;

    if (dataExtensionResults.length > 0) {
      dataExtensionResultMessage = (
        <div 
          id={'data-extension-result-message'}
          className={'slds-text-heading_medium slds-text-color_success'} 
        >
          Your Subscriber was found in {dataExtensionResults.length} Data Extensions
        </div>
      )
    } else if (dataExtensionResults.length === 1) {
      dataExtensionResultMessage = (
        <div 
          id={'data-extension-result-message'}
          className={'slds-text-heading_medium slds-text-color_success'} 
        >
          Your Subscriber was found in {dataExtensionResults.length} Data Extension
        </div>
      )
    } else {
      <div 
        id={'data-extension-result-message'}
        className={'slds-text-heading_medium slds-text-color_error'} 
      > 
        Your Subscriber was not found in any Data Extensions. 
      </div>
    }

    return (
      <div id={'data-extension-results-section'}>
       
        {dataExtensionResultMessage}

        { dataExtensionResults.map(result => {
          // returns array of column names for the DE 
          let columnNames = Object.keys(result.matchingRows[0])
          let columns = columnNames.map(column => {
            return (
              <DataTableColumn 
                key={`${result.dataExtension.CustomerKey}-${column}`}
                label={column}
                property={column}
              />
            )
          })
          
          return (       
            <IconSettings iconPath='/icons/' key={`iconSettings-${result.dataExtension.ObjectID}`}>
              <Card 
                key={`card-${result.dataExtension.ObjectID}`}
                heading={result.dataExtension.Name}
                icon={<Icon category="standard" name="entity" size="small" />}
              >
                <div id={'folder-path'} className={'slds-text-color_weak'} >
                  {result.folderPath}
                </div>
                <DataTable 
                  key={`dataTable-${result.dataExtension.ObjectID}`}
                  items={result.matchingRows}
                >
                  {columns}
                </DataTable>
              </Card>
            </IconSettings>
          )
        }) }

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataExtensionTables);
