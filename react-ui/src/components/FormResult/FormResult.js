import './FormResult.css'
import React from 'react';
import DataExtensionTables from '../DataExtensionTables/DataExtensionTables';
import Loader from '../Loader/Loader'
import { connect } from 'react-redux';
import SubscriberInfoResults from '../SubscriberInfoResults/SubscriberInfoResults'
import { updateFindSubscriberJobs } from '../../stateManagement/actions'
import {
  Icon,
  IconSettings,
  PageHeader,
} from '@salesforce/design-system-react'
import { subFinderPropTypes } from '../../stateManagement/propTypes';


// Maps the Store's State (aka the global state) to this Component's props
const mapStateToProps = state => {
  return {
    input: state.input,
    inputSubmitted: state.inputSubmitted,
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
          return job.state === 'active' || job.state === 'waiting'
        })

        if (incompleteJobs.length > 0) {
          this.props.dispatch(updateFindSubscriberJobs(incompleteJobs))
        } 
      }, 2000)
  }

  render() {
    
    let displayResults;
    let iconDisplay
    
    let currentJob = this.props.findSubscriberJobs.find( job => job.id == this.props.currentJobId)

    
    if (!currentJob) {
      iconDisplay='first_non_empty'
      displayResults = ''
    } else if (currentJob.state === 'active') {
      iconDisplay='generic_loading'
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
    } else if ( currentJob.state === 'failed' && currentJob.reason ) {
      iconDisplay='first_non_empty'
      displayResults = (
        <>
          <div className='slds-text-color_error slds-text-heading_medium slds-text-align_center'> 
            Hmmm...Looks like this job failed. The following was the reason provided: 
          </div>
          <div 
            id='error-reason'
            className='slds-text-color_error slds-text-align_center'
          >
            <i>&quot;{currentJob.reason}&quot;</i> 
          </div>
        </>
      )
    } else if ( currentJob.state === 'completed' && (currentJob.result.subscriberInfo.length > 0 || currentJob.result.dataExtensionResults.length > 0) ) {
      iconDisplay = "task2"
      displayResults = (
        <>
          <SubscriberInfoResults />
          <DataExtensionTables />  
        </>
      )
    } else if (currentJob.state === 'completed' && currentJob.result.subscriberInfo.length === 0 && currentJob.result.dataExtensionResults.length === 0) {
      iconDisplay='first_non_empty'
      displayResults = (
        <div className={'slds-text-heading_medium slds-text-align_center'} >
          Oops! Looks like Subscriber&apos;s email address you searched for, <strong>{currentJob.inputSubmitted}</strong>, does not exist
        </div>
      )
    } 

    return (
      <div id="formResult" data-testid="formResult">
        <IconSettings iconPath="/icons/">
          <PageHeader
            icon={
              <Icon
                category="standard"
                name={iconDisplay}
              />
            }
            title="Results"
            variant="object-home"
            className="formHeader"
          />
        </IconSettings>
        <div
          className="slds-box slds-theme_default"
          id="formResult-body"
        >
          {displayResults}
        </div>
      </div>
    );
  } 
}

FormResult.propTypes = {...subFinderPropTypes}

export default connect(mapStateToProps, mapDispatchToProps)(FormResult);
