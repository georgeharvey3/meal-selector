import * as actionTypes from './actionTypes';

export const addMeal = mealName => {
    return {
        type: actionTypes.ADD_MEAL,
        mealName: mealName
    }
}

export const removeMeal = mealName => {
    return {
        type: actionTypes.REMOVE_MEAL,
        mealName: mealName
    }
}

export const addIngredient = (mealName, ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        mealName: mealName,
        ingredientName: ingredientName
    }
}

export const removeIngredient = (mealName, ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        mealName: mealName,
        ingredientName: ingredientName
    }
}

export const selectMeal = (mealName) => {
    return {
        type: actionTypes.SELECT_MEAL,
        mealName: mealName
    }
}

export const deSelectMeal = (mealName) => {
    return {
        type: actionTypes.DESELECT_MEAL,
        mealName: mealName
    }
}

export const fetchMeals = () => {
    return {
        type: actionTypes.FETCH_MEALS
    }
}