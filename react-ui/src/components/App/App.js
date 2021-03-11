import './App.css'
import { connect } from 'react-redux'
import React from 'react'
import AppHeader from '../AppHeader/AppHeader';
import Form from '../Form/Form';
import About from '../About/About';
import { BrowserRouter, Route } from 'react-router-dom';
import { BrandBand } from '@salesforce/design-system-react';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

const mapStateToProps = state => {
  return {
    error: state.error
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
      <BrowserRouter>
        <BrandBand id="brand-band-lightning-blue" theme="lightning-blue">
          <div className={'App'}>
            {/* If the error prop is populated, then display the ErrorAlert component  */}
            { this.props.error && Object.keys(this.props.error).length === 0  ? null : <ErrorAlert /> } 
            <AppHeader />

            <Route exact path="/">
              <Form />
            </Route>

            <Route path="/about">
              <About />
            </Route>
          </div>
        </BrandBand>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
