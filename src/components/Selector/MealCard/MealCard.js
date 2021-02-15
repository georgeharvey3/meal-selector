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
            let ingredient = {ingredientName: e.target.value}
            this.props.onAddIngredient(this.props.meal.id, ingredient, this.props.token);
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
                autoFocus={true}
                onBlur={() => {this.setState({addingIngredient: false})}}/>
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
            if (this.props.meal.ingredients && this.props.meal.ingredients.length > 0) {    
                ingredients = this.props.meal.ingredients.map((ing, index) => (
                    <li key={index}>
                        <RemoveButton 
                            className={classes.Remove}
                            clicked={() => this.props.onRemoveIngredient(this.props.meal.id, ing.id, this.props.token)}>
                                X
                        </RemoveButton>
                        <p>{ing.ingredientName}</p>
                    </li>
                ));
            }
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

        let selectColour = this.state.selected ? "rgb(112, 112, 112)" : "rgb(53, 110, 53)";
        let selectOpacity = "1";

        if (this.props.new) {
            selectColour = "rgb(112, 112, 112)";
            selectOpacity = 0.5;
        }

        return (
            <div className={cardClasses.join(" ")}>
                <div className={classes.RMHolder}>
                    <button 
                        className={selectColour}
                        style={{backgroundColor: selectColour, opacity: selectOpacity}}
                        onClick={this.toggleSelectMeal}>{this.state.selected ? "Deselect" : "Select"}</button>
                    <button
                        style={{backgroundColor: "rgb(180, 66, 66)"}} 
                        onClick={this.props.removeMealClicked}>
                            Delete
                    </button>
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
        selectedMeals: state.meals.selectedMeals,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (mealId, ingredient, token) => dispatch(mealActions.addIngredient(mealId, ingredient, token)),
        onRemoveIngredient: (mealId, ingredientId, token) => dispatch(mealActions.removeIngredient(mealId, ingredientId, token)),
        onSelectMeal: mealName => dispatch(mealActions.selectMeal(mealName)),
        onDeselectMeal: mealName => dispatch(mealActions.deSelectMeal(mealName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealCard);