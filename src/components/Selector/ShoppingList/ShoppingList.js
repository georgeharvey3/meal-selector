import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../../hoc/Aux';

class ShoppingList extends Component {
    
    getIngredients = (meals) => {
        let ingredients = [];
        for (let i = 0; i < meals.length; i ++) {
            let meal = meals[i];
            for (let j = 0; j < meal.ingredients.length; j ++) {
                ingredients.push(meal.ingredients[j]);
            }
        }
        return ingredients;
    }
    render () {
        let ingredients = this.getIngredients(this.props.selectedMeals);

        return (
            <Aux>
                <h3>Your Shopping List:</h3>
                <ul>
                    {ingredients.map(ing => (
                        <li key={ing}>
                            <p>{ing}</p>
                        </li>
                    ))}
                </ul>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMeals: state.selectedMeals
    }
}

export default connect(mapStateToProps)(ShoppingList);