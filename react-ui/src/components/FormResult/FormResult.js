import './FormResult.css'
import React from 'react';
import DataExtensionTables from '../DataExtensionTables/DataExtensionTables';
import Loader from '../Loader/Loader'
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SubscriberInfoResults from '../SubscriberInfoResults/SubscriberInfoResults'
import { updateFindSubscriberJobs } from '../../stateManagement/actions'


// Maps the Store's State (aka the global state) to this Component's props
const mapStateToProps = state => {
  return {
    input: state.input,
    inputSubmitted: state.inputSubmitted,
    resultLoading: state.resultLoading,
    resultRetrieved: state.resultRetrieved,
    results: state.results,
    error: state.error,
    findSubscriberJobs: state.findSubscriberJobs,
    currentJobId: state.currentJobId
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}


class FormResult extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      setInterval(() => {
        let incompleteJobs = this.props.findSubscriberJobs.filter(job => {
          return job.state != 'completed'
        })

        if (incompleteJobs.length > 0) {
          this.props.dispatch(updateFindSubscriberJobs(incompleteJobs))
        } 
      }, 2000)
  }

  render() {
    
    let displayResults;
    
    let currentJob = this.props.findSubscriberJobs.find( job => job.id == this.props.currentJobId)

    if (this.props.resultLoading && !this.props.resultRetrieved) {
      displayResults = (
        <>
          <div
            id='loading-message'
            className="slds-text-heading_medium"
          >
            Finding Subscriber...
          </div>
          <Loader />
        </>
      )
    } else if ( this.props.resultRetrieved && (currentJob.result.subscriberInfo.length > 0 || currentJob.result.dataExtensionResults.length > 0) ) {
      displayResults = (
        <>
          <SubscriberInfoResults />
          <DataExtensionTables />  
        </>
      )
    } else if (this.props.resultRetrieved && this.props.results.subscriberInfo.length === 0 && this.props.results.dataExtensionResults.length === 0) {
      displayResults = <div className={'slds-text-heading_medium slds-text-align_center'}>Whoops! Looks like that subscriber does not exist</div> 
    }

    return (
      <div
        id='form-result'
        className="slds-box slds-theme_default"
      >
        {displayResults}
      </div>
    );
  } 
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FormResult);
