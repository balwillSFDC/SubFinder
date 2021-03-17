import './Form.css'
import React from 'react';
import { 
  Input,
  Button,
  Icon,
  IconSettings,
  PageHeader,
} from '@salesforce/design-system-react';
import FormResult from '../FormResult/FormResult';
import { connect } from 'react-redux'
import { addFindSubscriberJob, handleInput } from '../../stateManagement/actions'


// Maps the Store's State (aka the global state) to this Component's props
const mapStateToProps = state => {
  return {
    input: state.input,
    inputSubmitted: state.inputSubmitted,
    resultLoading: state.resultLoading,
    resultRetrieved: state.resultRetrieved,
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
    // Used to disable the 'Submit' button unless input is an email address
    let isEmail = this.props.input.includes('@') ? true : false 

    return (
      <div id="form">
        <IconSettings iconPath="/icons/">
          <PageHeader
            icon={
              <Icon
                category="standard"
                name="form"
              />
            }
            title="Form"
            variant="object-home"
            className="formHeader"
          />
        </IconSettings>
        <div
          id='form-body'
          className="slds-box slds-theme_default"
        >
          <h1 className="slds-text-title slds-p-vertical_medium">
            Input the Email Address of the Subscriber you want to find below!
          </h1>
          <Input
            id="Email"
            name="email"
            label="Subscriber Email Address"
            aria-required= {true}
            Value={this.props.input}
            onChange={(e) => this.props.dispatch(handleInput(e))}
            type="email"
            required={true}
          />

          <Button
            id="Submit"
            label="Submit"
            variant="brand"
            onClick={() => this.props.dispatch(addFindSubscriberJob())}
            disabled={!isEmail}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
