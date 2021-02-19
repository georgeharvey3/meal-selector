import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Auth.module.css';

import * as actionTypes from '../../../../../store/actions/index';

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password, false);
    }

    onUpdateField = (event, field) => {
        this.setState({
            [field]: event.target.value
        });
    }

    render () {
        return (
            <div className={classes.Auth}>
                <h3>Login</h3>
                {this.props.errorMessage}
                <form>
                    <input
                        id="loginInput"  
                        placeholder="Email"
                        onChange={(event) => this.onUpdateField(event, "email")}
                        autoFocus={true}/>
                    <br/>
                    <input type="password" 
                        placeholder="Password"
                        onChange={(event) => this.onUpdateField(event, "password")}/>
                    <br/>
                    <button onClick={this.submitHandler}>Sign In</button>
                </form>
                <p>Don't have an account? <span onClick={this.props.toggleAuth}>Sign Up</span></p>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isRegister) => dispatch(actionTypes.auth(email, password, isRegister))
    }
}

export default connect(null, mapDispatchToProps)(Login);
