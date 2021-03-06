import React, { Component } from 'react';
import {
  Card,
  Icon,
  DataTable,
  CardEmpty,
  DataTableColumn,
  IconSettings
} from '@salesforce/design-system-react';
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    results: state.results
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
    return (
      this.props.results.map(result => {
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

        let customHeader = (
          <>
            {result.folderPath}
          </>
        )
        
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
      })
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataExtensionTables);
