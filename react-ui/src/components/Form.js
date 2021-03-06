import React from 'react';
import { IconSettings, Input, Button } from '@salesforce/design-system-react';
import FormResult from './FormResult';
import { connect } from 'react-redux'
import { findSubscriber, handleInput, handleSubmit } from '../actions'


// Maps the Store's State (aka the global state) to this Component's props
const mapStateToProps = state => {
  return {
    input: state.input,
    inputSubmitted: state.inputSubmitted,
    resultLoading: false,
    resultRetrieved: false,
  }
}

// Maps store.dispatch() to this Component's props
const mapDispatchToProps = dispatch => {
  return { dispatch }
}

class Form extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <React.Fragment>
        <div
          className="slds-box slds-theme_default"
          style={{ marginBottom: '10px' }}
        >
          <h1 className="slds-text-title slds-p-vertical_medium">
            Input the Email Address of the Subscriber you want to find below!
          </h1>
          <Input
            id="Email"
            name="email"
            label="Subscriber Email Address"
            aria-required= {true}
            styleContainer={{ marginBottom: '10px' }}
            Value={this.props.input}
            onChange={(e) => this.props.dispatch(handleInput(e))}
          />

          <Button
            id="Submit"
            label="Submit"
            variant="brand"
            onClick={() => this.props.dispatch(findSubscriber())}
          />
        </div>

        {(this.props.inputSubmitted) ? <FormResult /> : null }

      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
