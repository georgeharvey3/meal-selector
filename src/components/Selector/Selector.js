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
        showList: false
    }

    onAddMealClicked = () => {
        this.setState({
            addingMeal: true
        });
    }

    onAddMealKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.setState({
                addingMeal: false
            });
            this.props.onAddMeal(e.target.value);
        }
    }

    onShowList = () => {
        this.setState({
            showList: true
        })
    }

    onDismissModal = () => {
        this.setState({
            showList: false
        })
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
                <Button
                    clicked={this.onAddMealClicked}>Add Meal</Button>
                <Button
                    clicked={this.onShowList}>See List</Button>
                <Modal 
                    show={this.state.showList}
                    modalClosed={this.onDismissModal}>
                    <ShoppingList />
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
        onRemoveMeal: (mealName) => dispatch(mealActions.removeMeal(mealName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);