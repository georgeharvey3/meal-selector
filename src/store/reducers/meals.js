import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

let initialMeals = [
    {'mealName': 'Carbonara', 'ingredients': ['Dijon Mustard', 'Cashews', 'Linguine', 'Almond Flakes', 'Mushrooms', 'Parsley']},
    {'mealName': 'Sweet Potato Dhal', 'ingredients': ['Red Lentils', 'Onion', 'Ginger', 'Sweet Potato', 'Coconut Milk', 'Chilli']},
    {'mealName': 'Risotto', 'ingredients': ['Risotto Rice', 'Leek', 'Chestnuts', 'Walnuts', 'White Wine']},
  ];

const initialState = {
    meals: initialMeals,
    selectedMeals: [],
    error: false,
    loading: true
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MEAL_SUCCESS:

            let nextMealsAdd = state.meals.concat(action.meal);

            localStorage.setItem("meals", JSON.stringify(nextMealsAdd));

            return {
                ...state,
                meals: nextMealsAdd
            }
        case actionTypes.REMOVE_MEAL_SUCCESS:
            let meals = [...state.meals];
            let index;

            for (let i = 0; i < meals.length; i ++) {
                if (meals[i].id === action.mealId) {
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
        case actionTypes.ADD_INGREDIENT_SUCCESS:
            let nextMealsAddIngredient = [...state.meals];
            let thisMealAdd = nextMealsAddIngredient.filter(m => m.id === action.mealId)[0];
            let oldAddIngredients = [...thisMealAdd.ingredients];
            let newAddIngredients = oldAddIngredients.concat(action.ingredient);
            thisMealAdd.ingredients = newAddIngredients;

            localStorage.setItem("meals", JSON.stringify(nextMealsAddIngredient));

            return {
                ...state,
                meals: nextMealsAddIngredient
            }
        case actionTypes.REMOVE_INGREDIENT_SUCCESS:
            let nextMealsRemoveIngredient = [...state.meals];
            let thisMealRemove = nextMealsRemoveIngredient.filter(m => m.id === action.mealId)[0];
            let oldRemoveIngredients = [...thisMealRemove.ingredients];
            let removeIngredientIndex;
            for (let i = 0; i < oldRemoveIngredients.length; i ++) {
                if (oldRemoveIngredients[i].id === action.ingredientId) {
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
        case actionTypes.SET_MEALS:
            return {
                ...state,
                meals: action.meals,
                error: false,
            }
        case actionTypes.FETCH_MEALS_START:
            return updateObject(state, {loading: true});
        case actionTypes.FETCH_MEALS_FAILED:
            return updateObject(state, {loading: false})
        case actionTypes.FETCH_MEALS_SUCCESS:
            return updateObject(state, {
                meals: action.meals,
                loading: false,
                error: false
            })
        default:
            return state;

    }
}

export default reducer;