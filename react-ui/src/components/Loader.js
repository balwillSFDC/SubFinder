import React, { Component } from 'react'
import { Spinner } from '@salesforce/design-system-react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
      inputSubmitted: state.inputSubmitted,  
      loadingResult: state.loadingResult
    }
}

class Loader extends Component {
    render() {
        return (
          <>
            <p style={{textAlign: 'center', marginBottom: '.25em'}}>Hold tight! We are finding <strong>{this.props.inputSubmitted}</strong> for you</p>
            <div style={{ position: 'relative', height: '5rem' }}>
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

export default connect(mapStateToProps)(Loader)