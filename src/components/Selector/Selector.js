import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as mealActions from '../../store/actions/index';

import MealCard from './MealCard/MealCard';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import ShoppingList from '../Selector/ShoppingList/ShoppingList';

import classes from './Selector.module.css';

import Aux from '../../hoc/Aux';

class Selector extends Component {

    state = {
        addingMeal: false,
        showList: false,
        showErrorModal: false,
        errorMessage: ""
    }

    componentDidMount = () => {
        this.props.onFetchMeals();
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
                this.props.onAddMeal(e.target.value);
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

    render () {
        let addingMealCard = null;
        if (this.state.addingMeal) {
            addingMealCard = <MealCard 
                                key={0}
                                new
                                addMealKeyPress={(e) => this.onAddMealKeyPress(e)}/>
        }
        return (
            <Aux>
                <h1>Meal Selector</h1>
                <Button
                    clicked={this.onAddMealClicked}>Add Meal</Button>
                <Button
                    clicked={this.onShowList}>See List</Button>
                <div className={classes.Selector}>
                    {this.props.meals.map((meal, index) => {
                        return (
                            <MealCard 
                                key={index} 
                                meal={meal} 
                                removeMealClicked={() => this.props.onRemoveMeal(meal.name)}/>
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
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        meals: state.meals
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddMeal: (mealName) => dispatch(mealActions.addMeal(mealName)),
        onRemoveMeal: (mealName) => dispatch(mealActions.removeMeal(mealName)),
        onFetchMeals: () => dispatch(mealActions.fetchMeals())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);