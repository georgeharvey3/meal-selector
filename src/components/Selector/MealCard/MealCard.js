import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as mealActions from '../../../store/actions/index';

import RemoveButton from '../../UI/Button/RemoveButton/RemoveButton';
import Button from '../../UI/Button/Button';

import Aux from '../../../hoc/Aux';

import classes from './MealCard.module.css';

class MealCard extends Component {

    state = {
        selected: false,
        addingIngredient: false,
        showIngredients: Boolean(this.props.new)
    }

    componentDidMount = () => {
        if (this.props.meal && this.props.meal.ingredients.length === 0) {
            this.setState({
                showIngredients: true
            });
        }
    }

    onAddIngredientClicked = () => {
        this.setState({
            addingIngredient: true
        });
    }

    toggleShowIngredients = () => {
        this.setState(prevState => {
            return {
                showIngredients: !prevState.showIngredients
            }
        });
    }

    toggleSelectMeal = () => {  

        if (this.props.new) {
            return;
        }      
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

        let cardClasses = [classes.MealCard];

        if (this.state.selected) {
            cardClasses.push(classes.Selected);
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
            header = (
                <Aux>
                    <h3>{this.props.meal.name}</h3>
                    <Button clicked={this.toggleShowIngredients}>{this.state.showIngredients ? "Hide Ingredients" : "Show Ingredients"}</Button>
                </Aux>
            );    
            ingredients = this.props.meal.ingredients.map((ing, index) => (
                <li key={index}>
                    <RemoveButton 
                        className={classes.Remove}
                        clicked={() => this.props.onRemoveIngredient(this.props.meal.name, ing)}>
                            X
                    </RemoveButton>
                    <p>{ing}</p>
                </li>
            ));
        }

        let total = (
            <Aux>
                <hr />
                <ul>
                    {ingredients}
                </ul>
                {addInput}
                <button 
                    className={classes.Add}
                    onClick={this.onAddIngredientClicked}>+</button>
            </Aux>
        );

        if (!this.state.showIngredients) {
            total = null;
        }

        return (
            <div className={cardClasses.join(" ")}>
                <div className={classes.RMHolder}>
                    <button 
                        onClick={this.toggleSelectMeal}>Select Meal</button>
                    <RemoveButton 
                        className={classes.RemoveMeal}
                        clicked={this.props.removeMealClicked}>
                            X
                    </RemoveButton>
                </div>
                <div 
                    className={classes.Title}
                    >{header}
                </div>
                {total}
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