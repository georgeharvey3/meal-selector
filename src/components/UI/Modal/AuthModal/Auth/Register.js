import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Auth.module.css';

import * as actionTypes from '../../../../../store/actions/index';

class Register extends Component {

    state = {
        email: '',
        password: ''
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password, true);
    }

    onUpdateField = (event, field) => {
        this.setState({
            [field]: event.target.value
        });
    }

    render () {
        return (
            <div className={classes.Auth}>
                <h3>Register</h3>
                {this.props.errorMessage}
                <input 
                    placeholder="Email"
                    onChange={(event) => this.onUpdateField(event, "email")}/>
                <br/>
                <input type="password" 
                    placeholder="Password"
                    onChange={(event) => this.onUpdateField(event, "password")}/>
                <br />
                <button onClick={this.submitHandler}>Register</button>
                <p>Already have an account? <span onClick={this.props.toggleAuth}>Login</span></p>
            </div>
        );
    }    
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isRegister) => dispatch(actionTypes.auth(email, password, isRegister))
    }
}

export default connect(null, mapDispatchToProps)(Register);

