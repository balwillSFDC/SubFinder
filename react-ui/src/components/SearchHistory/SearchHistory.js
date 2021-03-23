import './SearchHistory.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCurrentJobIdValue } from '../../stateManagement/actions'
import {
  SplitView,
  SplitViewHeader,
  SplitViewListbox,
  PageHeaderControl,
  Icon,
  IconSettings,
  Splitview,
  Button
} from '@salesforce/design-system-react'

const mapStateToProps = (state) => ({
  findSubscriberJobs: state.findSubscriberJobs
})

const mapDispatchToProps = dispatch => {
  return { dispatch }
}


class SearchHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
			isOpen: typeof props.isOpen === 'boolean' ? props.isOpen : true,
    }
  }

  // jobs need to be formmatted this way so <SplitViewListbox /> can read them
  reFormmattedJobs = jobs => {
    // Sorts the jobs it's given so the higher job id # (i.e. the last job to be added) is first on the list 
    let sortedJobs = jobs.sort((a,b) => {
      return b.id - a.id
    })
    
    return sortedJobs.map(job => {

      let deResults = job.state != 'completed' ? 'pending' : job.result.dataExtensionResults.length 

      // converting dateTime so it's in user's timezone
      let dateTime = new Date(job.timeSubmitted).toLocaleString()

      // Short function that capitalizes the first letter for a string given
      const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

      return {
        id: job.id,
        label: job.inputSubmitted,
        bottomLeftText: `Data Extension Results: ${deResults}`,
        topRightText: capitalize(job.state),
        bottomRightText: dateTime
      }
    })
  }

  headerActions = () => (
    <PageHeaderControl>
      <Button
        assistiveText={{ icon: 'Refresh' }}
        iconCategory="utility"
        iconName="refresh"
        iconVariant="border"
        variant="icon"
      />
    </PageHeaderControl>
  )
  
  masterView() {
    return [
      <SplitViewHeader
        key="1"
        info={`${this.props.findSubscriberJobs.length} ${this.props.findSubscriberJobs.length > 1 ? "items": "item"}`}
        title="Search History"
        truncate
        icon={
          <Icon
            category="standard"
            name="search"
          />
        }
        onRenderActions={this.headerActions}
      />,
      <SplitViewListbox
        key="2"
        options={this.reFormmattedJobs(this.props.findSubscriberJobs)}
        events={{
          onSelect: (event, { item }) => this.props.dispatch(updateCurrentJobIdValue(item.id))
        }}
        assistiveText={{list: 'Select an item to view the details'}}
      />
    ]
  }

  render() {
    return (
      <IconSettings iconPath="/icons/">
        <div id='splitview' data-testid='searchHistory'>
          <Splitview
            events={{
              onClose: () => { this.setState({ isOpen: false })},
              onOpen: () => { this.setState({ isOpen: true })}
            }}
            isOpen={this.state.isOpen}
            master={this.masterView()}
            detail={() => {}}
            masterWidth="100%"
          />
        </div>
      </IconSettings>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory)
