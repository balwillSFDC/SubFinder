import React from 'react';
import DataExtensionTables from './DataExtensionTables';
import Loader from './Loader'
import { connect } from 'react-redux';

// Maps the Store's State (aka the global state) to this Component's props
const mapStateToProps = state => {
  return {
    input: state.input,
    inputSubmitted: state.inputSubmitted,
    resultLoading: state.resultLoading,
    resultRetrieved: state.resultRetrieved,
    results: state.results
  }
}

class FormResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let displayResults;

    if (this.props.resultLoading && !this.props.resultRetrieved) {
      displayResults = <Loader />
    } else if (this.props.resultRetrieved && this.props.results.length > 0) {
      displayResults = <DataExtensionTables />
    } else if (this.props.resultRetrieved) {
      displayResults = <div className={'slds-text-heading_medium slds-text-align_center'}>Whoops! Looks like that subscriber does not exist</div> 
    }


    return (
      <div
        className="slds-box slds-theme_default"
        style={{ marginBottom: '10px'}}
      >
        <div
          className="slds-text-heading_medium"
          style={{ paddingBottom: '10px' }}
        >
          {this.props.resultLoading === true ? `Loading` : `${this.props.results.length} ${this.props.results.length > 1 ? "Results" : "Result"} Found!`}
        </div>
      
        {displayResults}
      </div>
    );
  } 
    
}

export default connect(mapStateToProps)(FormResult);
