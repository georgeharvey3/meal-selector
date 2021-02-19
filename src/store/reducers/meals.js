import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

let initialMeals = [
    {'name': 'Carbonara', 'ingredients': [{'ingredientName': 'Dijon Mustard'}, {'ingredientName': 'Cashews'}, {'ingredientName': 'Linguine'}, {'ingredientName': 'Almond Flakes'}, {'ingredientName': 'Mushrooms'}, {'ingredientName': 'Parsley'}]},
    {'name': 'Sweet Potato Dhal', 'ingredients': [{'ingredientName': 'Red Lentils'}, {'ingredientName': 'Onion'}, {'ingredientName': 'Ginger'}, {'ingredientName': 'Sweet Potato'}, {'ingredientName': 'Coconut Milk'}, {'ingredientName': 'Chilli'}]},
    {'name': 'Risotto', 'ingredients': [{'ingredientName': 'Risotto Rice'}, {'ingredientName': 'Leek'}, {'ingredientName': 'Chestnuts'}, {'ingredientName': 'Walnuts'}, {'ingredientName': 'White Wine'}]},
  ];

const initialState = {
    meals: [],
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
        case actionTypes.ADD_MEAL_LOCAL:
            let nextMealsAddLocal = state.meals.concat(action.meal);

            localStorage.setItem("meals", JSON.stringify(nextMealsAddLocal));

            return {
                ...state,
                meals: nextMealsAddLocal
            }
        case actionTypes.REMOVE_MEAL_SUCCESS:
            let nextMealsRemoveMeal = [...state.meals];
            let indexRemoveMeal;

            for (let i = 0; i < nextMealsRemoveMeal.length; i ++) {
                if (nextMealsRemoveMeal[i].id === action.mealId) {
                    indexRemoveMeal = i;
                    break;
                }
            }

            nextMealsRemoveMeal = nextMealsRemoveMeal.slice(0, indexRemoveMeal).concat(nextMealsRemoveMeal.slice(indexRemoveMeal + 1, nextMealsRemoveMeal.length));

            localStorage.setItem("meals", JSON.stringify(nextMealsRemoveMeal));

            return {
                ...state,
                meals: nextMealsRemoveMeal
            }
        case actionTypes.REMOVE_MEAL_LOCAL:
            let nextMealsRemoveMealLocal = [...state.meals];
            let indexRemoveMealLocal;

            for (let i = 0; i < nextMealsRemoveMealLocal.length; i ++) {
                if (nextMealsRemoveMealLocal[i].name === action.mealName) {
                    indexRemoveMealLocal = i;
                    break;
                }
            }

            nextMealsRemoveMealLocal = nextMealsRemoveMealLocal.slice(0, indexRemoveMealLocal).concat(nextMealsRemoveMealLocal.slice(indexRemoveMealLocal + 1, nextMealsRemoveMealLocal.length));

            localStorage.setItem("meals", JSON.stringify(nextMealsRemoveMealLocal));

            return {
                ...state,
                meals: nextMealsRemoveMealLocal
            }

        case actionTypes.ADD_INGREDIENT_SUCCESS:
            let nextMealsAddIngredient = [...state.meals];
            let thisMealAddIngredient = nextMealsAddIngredient.filter(m => m.id === action.mealId)[0];
            let oldAddIngredients = [...thisMealAddIngredient.ingredients];
            let newAddIngredients = oldAddIngredients.concat(action.ingredient);
            thisMealAddIngredient.ingredients = newAddIngredients;

            localStorage.setItem("meals", JSON.stringify(nextMealsAddIngredient));

            return {
                ...state,
                meals: nextMealsAddIngredient
            }
        case actionTypes.ADD_INGREDIENT_LOCAL:
            let nextMealsAddIngredientLocal = [...state.meals];
            let thisMealAddIngredientLocal = nextMealsAddIngredientLocal.filter(m => m.name === action.mealName)[0];
            let oldAddIngredientsLocal = [...thisMealAddIngredientLocal.ingredients];
            let newAddIngredientsLocal = oldAddIngredientsLocal.concat(action.ingredient);
            thisMealAddIngredientLocal.ingredients = newAddIngredientsLocal;

            localStorage.setItem("meals", JSON.stringify(nextMealsAddIngredientLocal));

            return {
                ...state,
                meals: nextMealsAddIngredientLocal
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
        case actionTypes.REMOVE_INGREDIENT_LOCAL:
            let nextMealsRemoveIngredientLocal = [...state.meals];
            let thisMealRemoveIngredientLocal = nextMealsRemoveIngredientLocal.filter(m => m.name === action.mealName)[0];
            let oldRemoveIngredientsLocal = [...thisMealRemoveIngredientLocal.ingredients];
            let removeIngredientIndexLocal;
            for (let i = 0; i < oldRemoveIngredientsLocal.length; i ++) {
                if (oldRemoveIngredientsLocal[i].ingredientName === action.ingredientName) {
                    removeIngredientIndexLocal = i;
                }
            }
            let newRemoveIngredientsLocal = oldRemoveIngredientsLocal.slice(0, removeIngredientIndexLocal).concat(oldRemoveIngredientsLocal.slice(removeIngredientIndexLocal + 1, oldRemoveIngredientsLocal.length));
            thisMealRemoveIngredientLocal.ingredients = newRemoveIngredientsLocal;

            localStorage.setItem("meals", JSON.stringify(nextMealsRemoveIngredientLocal));

            return {
                ...state,
                meals: nextMealsRemoveIngredientLocal
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
        case actionTypes.FETCH_MEALS_LOCAL:
            let localMeals = JSON.parse(localStorage.getItem('meals'));

            if (localMeals === null) {
                localMeals = initialMeals;
                localStorage.setItem('meals', JSON.stringify(localMeals));
            }
            return updateObject(state, {
                meals: localMeals,
                loading: false,
                error: false
            })
        default:
            return state;

    }
}

export default reducer;