import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  Toast,
  ToastContainer,
  IconSettings } from '@salesforce/design-system-react'
import { subFinderPropTypes } from '../../stateManagement/propTypes'

const mapStateToProps = (state) => {
  return {
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

class ErrorAlert extends Component {

  constructor(props) {
    super(props)
    this.state = {
			isOpen: true,
		};
  }

  componentDidMount() {
    // Closes the error message if not automatically closed itself
    setTimeout(() => {
      this.setState(() => ({
        isOpen: false
      }))

      this.props.dispatch({
        type: 'CLEAR_GENERAL_ERROR_MESSAGE'
      })
    }, 20000)
  }

  render() {
    return (
      <div data-testid="errorAlert">
      <IconSettings iconPath='/icons/'>
				{this.state.isOpen ? (
          <ToastContainer>
					<Toast
						labels={{
							heading: `Error: ${this.props.error.message}`,
							details: this.props.error.config.data ? `Here is some data related to the failed job: ${this.props.error.config.data}` : null,
						}}
						variant="error"
            onRequestClose={() => {
              this.setState({ isOpen: false });
            }}
            title
					/>
				</ToastContainer>
        ) : null}
      </IconSettings>
      </div>
    )
  }
}

ErrorAlert.propTypes = { ...subFinderPropTypes}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlert)
