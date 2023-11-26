import React, { Component } from 'react';
import { render } from 'react-dom';
import HomePage from './HomePage';
import { AuthProvider } from './AuthContext'; // Import AuthProvider


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <AuthProvider> {/* Wrap your components with AuthProvider */}
            <div>
                <HomePage />
            </div> 
        </AuthProvider>
        )
    }
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);