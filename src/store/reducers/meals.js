import * as actionTypes from '../actions/actionTypes';

let initialMeals = [
    {'name': 'curry', 'ingredients': ['rice', 'spice']},
    {'name': 'soup', 'ingredients': ['vegetables', 'stock']},
    {'name': 'burger', 'ingredients': ['patty', 'bun']},
    {'name': 'eggs', 'ingredients': ['egg', 'bread']},
    {'name': 'salad', 'ingredients': ['lettuce', 'gin']},
    {'name': 'pasta', 'ingredients': ['pasata', 'tomato']}
  ];

const initialState = {
    meals: initialMeals,
    selectedMeals: []
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MEAL:
            let meal = {'name': action.mealName, 'ingredients': []};

            return {
                ...state,
                meals: state.meals.concat(meal)
            }
        case actionTypes.REMOVE_MEAL:
            let meals = [...state.meals];
            let index;

            for (let i = 0; i < meals.length; i ++) {
                if (meals[i].name === action.mealName) {
                    index = i;
                    break;
                }
            }

            let nextMeals = meals.slice(0, index).concat(meals.slice(index + 1, meals.length));
            return {
                ...state,
                meals: nextMeals
            }
        case actionTypes.ADD_INGREDIENT:
            let nextMealsAddIngredient = [...state.meals];
            let thisMealAdd = nextMealsAddIngredient.filter(m => m.name === action.mealName)[0];
            let oldAddIngredients = [...thisMealAdd.ingredients];
            let newAddIngredients = oldAddIngredients.concat(action.ingredientName);
            thisMealAdd.ingredients = newAddIngredients;
            return {
                ...state,
                meals: nextMealsAddIngredient
            }
        case actionTypes.REMOVE_INGREDIENT:
            let nextMealsRemoveIngredient = [...state.meals];
            let thisMealRemove = nextMealsRemoveIngredient.filter(m => m.name === action.mealName)[0];
            let oldRemoveIngredients = [...thisMealRemove.ingredients];
            let removeIngredientIndex;
            for (let i = 0; i < oldRemoveIngredients.length; i ++) {
                if (oldRemoveIngredients[i] === action.ingredientName) {
                    removeIngredientIndex = i;
                }
            }
            let newRemoveIngredients = oldRemoveIngredients.slice(0, removeIngredientIndex).concat(oldRemoveIngredients.slice(removeIngredientIndex + 1, oldRemoveIngredients.length));
            thisMealRemove.ingredients = newRemoveIngredients;
            return {
                ...state,
                meals: nextMealsRemoveIngredient
            }
        case actionTypes.SELECT_MEAL:
            let selectedMeal = state.meals.filter(m => m.name === action.mealName)[0];
            console.log("AFTER:", state.selectedMeals.concat(selectedMeal))

            return {
                ...state,
                selectedMeals: state.selectedMeals.concat(selectedMeal)
            }
        case actionTypes.DESELECT_MEAL:
            let selectedIndex;

            for (let i = 0; i < state.selectedMeals.length; i ++) {
                if (state.selectedMeals[i].name === action.mealName) {
                    selectedIndex = i;
                    break;
                }
            }

            let nextSelectedMeals = state.selectedMeals.slice(0, selectedIndex).concat(state.selectedMeals.slice(selectedIndex + 1, state.selectedMeals.length));
            return {
                ...state,
                selectedMeals: nextSelectedMeals
            }
        default:
            return state;

    }
}

export default reducer;