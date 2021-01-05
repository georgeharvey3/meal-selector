import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as mealActions from '../../../store/actions/index';

import classes from './MealCard.module.css';

class MealCard extends Component {

    state = {
        selected: false,
        addingIngredient: false
    }

    onAddIngredientClicked = () => {
        this.setState({
            addingIngredient: true
        })
    }

    toggleSelectMeal = () => {        
        if (!this.state.selected) {
            this.props.onSelectMeal(this.props.meal.name);
        } else {
            this.props.onDeselectMeal(this.props.meal.name);
        }

        this.setState(prevState => {
            return {
                selected: !prevState.selected
            }
        });
    }

    onAddIngredientKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.setState({
                addingIngredient: false
            });
            this.props.onAddIngredient(this.props.meal.name, e.target.value);
        }
    }

    render () {

        let titleClasses = [classes.Title, classes.Hoverable];

        if (this.state.name === '') {
            titleClasses = [classes.Title];
        }

        if (this.state.selected) {
            titleClasses.push(classes.Selected);
        }

        let addInput = null;

        if (this.state.addingIngredient) {
            addInput = <input 
                onKeyPress={this.onAddIngredientKeyPress}
                autoFocus={true}/>
        }

        let header;
        let ingredients = [];

        if (this.props.new) {
            header = <input 
                onKeyPress={this.props.addMealKeyPress}
                autoFocus={true}/>;
        } else {
            header = <h3>{this.props.meal.name}</h3>
            ingredients = this.props.meal.ingredients.map((ing, index) => (
                <li key={index}>
                    <button 
                        className={classes.Remove}
                        onClick={() => this.props.onRemoveIngredient(this.props.meal.name, ing)}>X</button>
                    <p>{ing}</p>
                </li>
            ));
        }

        return (
            <div className={classes.MealCard}>
                <div className={classes.RMHolder}>
                    <button 
                        className={classes.RemoveMeal}
                        onClick={this.props.removeMealClicked}>X</button>
                </div>
                <div 
                    className={titleClasses.join(" ")}
                    onClick={this.toggleSelectMeal}>
                    {header}
                </div>
                <hr />
                <ul>
                    {ingredients}
                </ul>
                {addInput}
                <button 
                    className={classes.Add}
                    onClick={this.onAddIngredientClicked}>+</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedMeals: state.selectedMeals
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (mealName, ingredientName) => dispatch(mealActions.addIngredient(mealName, ingredientName)),
        onRemoveIngredient: (mealName, ingredientName) => dispatch(mealActions.removeIngredient(mealName, ingredientName)),
        onSelectMeal: mealName => dispatch(mealActions.selectMeal(mealName)),
        onDeselectMeal: mealName => dispatch(mealActions.deSelectMeal(mealName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealCard);