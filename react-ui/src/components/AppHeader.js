import React from 'react';
import { Link } from 'react-router-dom';


class AppHeader extends React.Component {
    render() {
        return (
            <div className="slds-box slds-theme_default" style={{marginBottom:'10px'}}>
                <h1 className="slds-text-heading_large" style={{paddingBottom:'10px'}}>SubFinder</h1>
                <Link to="/">Home</Link> | <Link to="/about">About</Link>
            </div>
            
        )
    }
}

export default AppHeader