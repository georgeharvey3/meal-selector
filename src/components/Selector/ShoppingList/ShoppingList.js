import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ShoppingList.module.css';

class ShoppingList extends Component {
    
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
    render () {
        let ingredients = this.getIngredients(this.props.selectedMeals);

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
                                <p>{ing + suffix}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMeals: state.meals.selectedMeals
    }
}

export default connect(mapStateToProps)(ShoppingList);