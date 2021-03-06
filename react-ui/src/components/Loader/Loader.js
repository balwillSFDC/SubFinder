import './Loader.css'
import React, { Component } from 'react'
import { Spinner } from '@salesforce/design-system-react'
import { connect } from 'react-redux'
import { subFinderPropTypes } from '../../stateManagement/propTypes'

const mapStateToProps = state => {
    return {
      inputSubmitted: state.inputSubmitted,  
    }
}

class Loader extends Component {
    render() {
        return (
          <>
            <p id='spinner-message' data-testid='spinner-message'>Hold tight! We are finding <strong>{this.props.inputSubmitted}</strong> for you</p>
            <div id='spinner' data-testid='spinner'>
              <Spinner
                size="medium"
                variant="brand"
                assistiveText={{ label: 'Main Frame Loading...' }}
              />
            </div>
          </>
        )
    }
}

Loader.propTypes = {...subFinderPropTypes}

export default connect(mapStateToProps)(Loader)