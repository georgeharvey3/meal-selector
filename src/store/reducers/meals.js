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

            let nextMealsAdd = state.meals.concat(meal);

            localStorage.setItem("meals", JSON.stringify(nextMealsAdd));

            return {
                ...state,
                meals: nextMealsAdd
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

            let nextMealsRemove = meals.slice(0, index).concat(meals.slice(index + 1, meals.length));

            localStorage.setItem("meals", JSON.stringify(nextMealsRemove));

            return {
                ...state,
                meals: nextMealsRemove
            }
        case actionTypes.ADD_INGREDIENT:
            let nextMealsAddIngredient = [...state.meals];
            let thisMealAdd = nextMealsAddIngredient.filter(m => m.name === action.mealName)[0];
            let oldAddIngredients = [...thisMealAdd.ingredients];
            let newAddIngredients = oldAddIngredients.concat(action.ingredientName);
            thisMealAdd.ingredients = newAddIngredients;

            localStorage.setItem("meals", JSON.stringify(nextMealsAddIngredient));

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

            localStorage.setItem("meals", JSON.stringify(nextMealsRemoveIngredient));

            return {
                ...state,
                meals: nextMealsRemoveIngredient
            }
        case actionTypes.SELECT_MEAL:
            let selectedMeal = state.meals.filter(m => m.name === action.mealName)[0];

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
        case actionTypes.FETCH_MEALS:
            let fetchedMeals = JSON.parse(localStorage.getItem('meals'));
            if (!fetchedMeals) {
                fetchedMeals = [];
                localStorage.setItem("meals", "[]");
            }
            return {
                ...state,
                meals: fetchedMeals
            }
        default:
            return state;

    }
}

export default reducer;