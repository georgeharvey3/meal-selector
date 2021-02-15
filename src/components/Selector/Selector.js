import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import MealCard from './MealCard/MealCard';
import Modal from '../UI/Modal/Modal';
import ShoppingList from '../Selector/ShoppingList/ShoppingList';
import LoginModal from '../UI/Modal/AuthModal/AuthModal';

import classes from './Selector.module.css';

import Aux from '../../hoc/Aux';

class Selector extends Component {

    state = {
        addingMeal: false,
        showList: false,
        showErrorModal: false,
        errorMessage: "",
        showLogin: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
            if (this.props.isAuthenticated) {

                this.props.onFetchMeals(this.props.token, this.props.userId);

                this.setState({
                    showLogin: false
                });
            }
        }
    }

    onAddMealClicked = () => {
        this.setState({
            addingMeal: true
        });
    }

    onAddMealKeyPress = (e) => {
        if (e.key === 'Enter') {
            let found = false;
            for (let i = 0; i < this.props.meals.length; i ++) {
                if (this.props.meals[i].name === e.target.value) {
                    found = true;
                }
            }

            if (found) {
                this.setState({
                    showErrorModal: true,
                    errorMessage: `You already have a meal named ${e.target.value}!`
                })
            } else {
                this.setState({
                    addingMeal: false
                });
                let mealName = e.target.value;
                let meal = {
                    name: mealName,
                    ingredients: [],
                    userId: this.props.userId
                }
                this.props.onAddMeal(meal, this.props.token);
            }
        }
    }

    onShowList = () => {
        this.setState({
            showList: true
        })
    }

    onDismissModal = () => {
        this.setState({
            showList: false,
            showErrorModal: false
        });
    }

    onLoginClicked = () => {
        this.setState({
            showLogin: true
        });
    }

    onLogoutClicked = () => {

    }

    onDismissLogin = () => {
        this.setState({
            showLogin: false
        })
    }

    render () {
        let addingMealCard = null;
        if (this.state.addingMeal) {
            addingMealCard = <MealCard 
                                key={0}
                                new
                                addMealKeyPress={(e) => this.onAddMealKeyPress(e)}
                                removeMealClicked={() => this.setState({addingMeal: false})}/>
        }

        return (
            <Aux>
                <h1>Meal Selector</h1>
                {this.props.isAuthenticated ? 
                    <button
                    onClick={this.props.onLogoutClicked}>
                        Logout
                    </button> :
                    <button
                        onClick={this.onLoginClicked}>
                            Login/Register
                    </button>}
                <br />
                <button
                    className={classes.Button}
                    onClick={this.onAddMealClicked}>Add Meal</button>
                <button
                    className={classes.Button}
                    onClick={this.onShowList}>See List</button>
                <div className={classes.Selector}>
                    {this.props.meals.map((meal, index) => {
                        return (
                            <MealCard 
                                key={index} 
                                meal={meal} 
                                removeMealClicked={() => this.props.onRemoveMeal(meal.id, this.props.token)}/>
                        );
                    })}
                    {addingMealCard}
                </div>
                
                <Modal 
                    show={this.state.showList}
                    modalClosed={this.onDismissModal}>
                    <ShoppingList />
                </Modal>
                <Modal
                    show={this.state.showErrorModal}
                    modalClosed={this.onDismissModal}>
                        <p>{this.state.errorMessage}</p>
                </Modal>
                <LoginModal 
                    show={this.state.showLogin}
                    modalClosed={this.onDismissLogin}/>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        meals: state.meals.meals,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        mealError: state.meals.error,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddMeal: (meal, token) => dispatch(actions.addMeal(meal, token)),
        onRemoveMeal: (mealId, token) => dispatch(actions.removeMeal(mealId, token)),
        onFetchMeals: (token, userId) => dispatch(actions.fetchMeals(token, userId)),
        onLogoutClicked: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);