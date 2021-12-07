import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import classes from './ShoppingList.module.css';

class ShoppingList extends Component {

    state = {
        addingItem: false
    }
    
    getIngredients = (meals) => {
        let ings = {};
        for (let i = 0; i < meals.length; i ++) {
            let meal = meals[i];
            for (let j = 0; j < meal.ingredients.length; j ++) {
                if (meal.ingredients[j].ingredientName in ings) {
                    ings[meal.ingredients[j].ingredientName] += 1
                } else {
                    ings[meal.ingredients[j].ingredientName] = 1;
                }
            }
        }
        return ings;
    }

    onAddItemClicked = () => {
        this.setState({
            addingItem: true
        });
    }

    onAddIngredientKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.setState({
                addingItem: false
            });
            let newItem = {ingredientName: e.target.value}
            
            this.props.onAddItem(newItem);
        }
    }

    

    render () {
        let ingredients = this.getIngredients(this.props.selectedMeals);

        let addInput;

        if (this.state.addingItem) {
            addInput = <input 
                className={classes.NewItem}
                onKeyPress={this.onAddIngredientKeyPress}
                autoFocus={true}
                onBlur={() => {this.setState({addingIngredient: false})}}/>
        }

        return (
            <div className={classes.ShoppingList}>
                <h3>Your Shopping List:</h3>
                <ul>
                    {Object.keys(ingredients).map(ing => {
                        let suffix = "";

                        if (ingredients[ing] > 1) {
                            suffix += " ";
                            for (let i = 0; i < ingredients[ing]; i ++) {
                                suffix += "*";
                            }
                        }

                        return (
                            <li key={ing}>
                                <input type="checkbox" />
                                <p>{ing + suffix}</p>
                            </li>
                        );
                    })}
                </ul>
                {addInput}
                <button 
                    className={classes.Add}
                    onClick={this.onAddItemClicked}>+</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMeals: state.meals.selectedMeals
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (newItem) => dispatch(actions.addItem(newItem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);