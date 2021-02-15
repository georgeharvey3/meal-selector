import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './Auth/Login';
import Register from './Auth/Register';
import Backdrop from '../../Backdrop/Backdrop';
import Spinner from '../../Spinner/Spinner';

import classes from './AuthModal.module.css';

import Aux from '../../../../hoc/Aux';

class AuthModal extends Component {

    state = {
        isRegister: false
    }

    onToggleAuth = () => {
        this.setState(prevState => {
            return {
                isRegister: !prevState.isRegister
            }
        })
    }

    render () {
        let errorMessage = null

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let auth = this.state.isRegister ? 
            <Register 
                toggleAuth={this.onToggleAuth}
                errorMessage={errorMessage}/> : 
            <Login 
                toggleAuth={this.onToggleAuth}
                errorMessage={errorMessage}/>

        if (this.props.loading) {
            auth = <Spinner />;
        }

        return (
            <Aux>
                <Backdrop 
                    show={this.props.show} 
                    clicked={this.props.modalClosed}/>
                
                <div 
                    className={classes.LoginModal}
                    style={{
                        display: this.props.show ? 'block': 'none',
                        opactiy: this.props.show ? '1' : '0'
                    }}>
                    {auth}
                </div>
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

export default connect(mapStateToProps)(AuthModal);