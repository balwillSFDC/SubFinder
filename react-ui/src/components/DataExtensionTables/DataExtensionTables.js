import React, { Component } from 'react';
import {
  Card,
  Icon,
  DataTable,
  DataTableColumn,
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
          className={'slds-text-heading_medium slds-text-color_success'} 
          style={{marginBottom: '1em'}}
        >
          Your Subscriber was found in {dataExtensionResults.length} Data Extensions
        </div>
      )
    } else if (dataExtensionResults.length === 1) {
      dataExtensionResultMessage = (
        <div 
          className={'slds-text-heading_medium slds-text-color_success'} 
          style={{marginBottom: '1em'}}
        >
          Your Subscriber was found in {dataExtensionResults.length} Data Extension
        </div>
      )
    } else {
      <div 
        className={'slds-text-heading_medium slds-text-color_error'} 
        style={{marginBottom: '1em'}}
      > 
        Your Subscriber was not found in any Data Extensions. 
      </div>
    }

    return (
      <div style={{marginTop: '3em'}}>
       
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
            <>
              <Card 
                key={`card-${result.dataExtension.ObjectID}`}
                heading={result.dataExtension.Name}
                icon={<Icon category="standard" name="dataset" size="small"/>}
              >
                <div className={'slds-text-color_weak'} style={{padding: "0px 16px 12px"}}>
                  {result.folderPath}
                </div>
                <DataTable 
                  key={`dataTable-${result.dataExtension.ObjectID}`}
                  items={result.matchingRows}
                >
                  {columns}
                </DataTable>
              </Card>
            </>
          )
        }) }

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataExtensionTables);
