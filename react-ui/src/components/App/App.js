import './App.css'
import { connect } from 'react-redux'
import React from 'react'
import AppHeader from '../AppHeader/AppHeader';
import Form from '../Form/Form';
import About from '../About/About';
import { BrowserRouter, Route } from 'react-router-dom';
import { BrandBand } from '@salesforce/design-system-react';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import SearchHistory from '../SearchHistory/SearchHistory';
import FormResult from '../FormResult/FormResult'

const mapStateToProps = state => {
  return {
    error: state.error,
    inputSubmitted: state.inputSubmitted,
    resultLoading: state.resultLoading,
    resultRetrieved: state.resultRetrieved,
    currentJobId: state.currentJobId
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

class App extends React.Component {
  constructor() {
    super()
    
  }

  render() {
    return (
      <div data-testid="app">
        <BrowserRouter >
          <BrandBand id="brand-band-lightning-blue" theme="lightning-blue">
            <div className={'App'}>
              {/* If the error prop is populated, then display the ErrorAlert component  */}
              { this.props.error && Object.keys(this.props.error).length === 0  ? null : <ErrorAlert /> } 
              <AppHeader data-testid="appHeader" />

              <Route exact path="/">
                <div className="slds-grid slds-gutters">
                  <div className="slds-col slds-size_1-of-3">
                    <SearchHistory />    
                  </div>
                  <div className="slds-col slds-size_2-of-3">
                    <Form />
                  </div>
                </div>
                <div>
                {this.props.currentJobId ? <FormResult /> : null }
                </div>
                
              </Route>

              <Route path="/about">
                <About />
              </Route>
            </div>
          </BrandBand>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
