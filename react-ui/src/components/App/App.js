import './App.css'
import { connect } from 'react-redux'
import React from 'react'
import AppHeader from '../AppHeader/AppHeader';
import Form from '../Form/Form';
import About from '../About/About';
import { BrowserRouter, Route } from 'react-router-dom';
import { BrandBand } from '@salesforce/design-system-react';

const mapStateToProps = state => {
  return {

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
