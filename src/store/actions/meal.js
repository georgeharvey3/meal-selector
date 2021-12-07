//import axios from 'axios';
import axiosMeals from "../../axios-meals";

import * as actionTypes from "./actionTypes";

export const addMealStart = () => {
  return {
    type: actionTypes.ADD_MEAL_START,
  };
};

export const addMealFailed = (error) => {
  return {
    type: actionTypes.ADD_MEAL_FAILED,
    error: error,
  };
};

export const addMealSuccess = (meal) => {
  return {
    type: actionTypes.ADD_MEAL_SUCCESS,
    meal: meal,
  };
};

export const addMeal = (meal, token) => {
  return (dispatch) => {
    dispatch(addMealStart());
    axiosMeals
      .post("/meals.json?auth=" + token, meal)
      .then((response) => {
        console.log(response);
        meal.id = response.data.name;
        dispatch(addMealSuccess(meal));
      })
      .catch((error) => {
        dispatch(addMealFailed(error));
      });
  };
};

export const addMealLocal = (meal) => {
  return {
    type: actionTypes.ADD_MEAL_LOCAL,
    meal: meal,
  };
};

export const removeMealStart = () => {
  return {
    type: actionTypes.REMOVE_MEAL_START,
  };
};

export const removeMealFailed = (error) => {
  return {
    type: actionTypes.REMOVE_MEAL_FAILED,
    error: error,
  };
};

export const removeMealSuccess = (mealId) => {
  return {
    type: actionTypes.REMOVE_MEAL_SUCCESS,
    mealId: mealId,
  };
};

export const removeMeal = (mealId, token) => {
  return (dispatch) => {
    dispatch(removeMealStart());
    axiosMeals
      .delete("/meals/" + mealId + ".json?auth=" + token)
      .then((response) => {
        dispatch(removeMealSuccess(mealId));
      })
      .catch((error) => {
        dispatch(removeMealFailed(error));
      });
  };
};

export const removeMealLocal = (mealName) => {
  return {
    type: actionTypes.REMOVE_MEAL_LOCAL,
    mealName: mealName,
  };
};

export const addIngredientStart = () => {
  return {
    type: actionTypes.ADD_INGREDIENT_START,
  };
};

export const addIngredientFailed = (error) => {
  return {
    type: actionTypes.ADD_INGREDIENT_FAILED,
    error: error,
  };
};

export const addIngredientSuccess = (mealId, ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT_SUCCESS,
    mealId: mealId,
    ingredient: ingredient,
  };
};

export const addIngredient = (mealId, ingredient, token) => {
  return (dispatch) => {
    dispatch(addIngredientStart());
    axiosMeals
      .post("/meals/" + mealId + "/ingredients.json?auth=" + token, ingredient)
      .then((response) => {
        ingredient.id = response.data.name;
        dispatch(addIngredientSuccess(mealId, ingredient));
      })
      .catch((error) => {
        console.log(error);
        dispatch(addIngredientFailed(error));
      });
  };
};

export const updateIngredientStart = () => {
  return {
    type: actionTypes.UPDATE_INGREDIENT_START,
  };
};

export const updateIngredientFailed = (error) => {
  return {
    type: actionTypes.UPDATE_INGREDIENT_FAILED,
    error: error,
  };
};

export const updateIngredientSuccess = (mealId, ingredient) => {
  return {
    type: actionTypes.UPDATE_INGREDIENT_SUCCESS,
    mealId: mealId,
    ingredient: ingredient,
  };
};

export const updateIngredient = (mealId, ingredient, token) => {
  return (dispatch) => {
    dispatch(updateIngredientStart());
    axiosMeals
      .put(
        `/meals/${mealId}/ingredients/${ingredient.id}.json?auth=${token}`,
        ingredient
      )
      .then(() => {
        dispatch(updateIngredientSuccess(mealId, ingredient));
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateIngredientFailed(error));
      });
  };
};

export const addIngredientLocal = (mealName, ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT_LOCAL,
    mealName: mealName,
    ingredient: ingredient,
  };
};

export const addIngredient2 = (mealName, ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    mealName: mealName,
    ingredientName: ingredientName,
  };
};

export const removeIngredientStart = () => {
  return {
    type: actionTypes.REMOVE_INGREDIENT_START,
  };
};

export const removeIngredientFailed = (error) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT_FAILED,
    error: error,
  };
};

export const removeIngredientSuccess = (mealId, ingredientId) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT_SUCCESS,
    mealId: mealId,
    ingredientId: ingredientId,
  };
};

export const removeIngredient = (mealId, ingredientId, token) => {
  return (dispatch) => {
    dispatch(removeIngredientStart());
    axiosMeals
      .delete(
        "/meals/" +
          mealId +
          "/ingredients/" +
          ingredientId +
          ".json?auth=" +
          token
      )
      .then((response) => {
        dispatch(removeIngredientSuccess(mealId, ingredientId));
      })
      .catch((error) => {
        dispatch(removeIngredientFailed(error));
      });
  };
};

export const removeIngredientLocal = (mealName, ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT_LOCAL,
    mealName: mealName,
    ingredientName: ingredientName,
  };
};

export const selectMeal = (mealName) => {
  return {
    type: actionTypes.SELECT_MEAL,
    mealName: mealName,
  };
};

export const deSelectMeal = (mealName) => {
  return {
    type: actionTypes.DESELECT_MEAL,
    mealName: mealName,
  };
};

export const addItem = (newItem) => {
  return {
    type: actionTypes.ADD_ITEM,
    newItem: newItem,
  };
};

export const fetchMealsStart = () => {
  return {
    type: actionTypes.FETCH_MEALS_START,
  };
};

export const fetchMealsFailed = (error) => {
  return {
    type: actionTypes.FETCH_MEALS_FAILED,
    error: error,
  };
};

export const fetchMealsSuccess = (meals) => {
  return {
    type: actionTypes.FETCH_MEALS_SUCCESS,
    meals: meals,
  };
};

export const fetchMeals = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchMealsStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axiosMeals
      .get("/meals.json" + queryParams)
      .then((response) => {
        const fetchedMeals = [];
        for (let key in response.data) {
          const fetchedIngredients = [];
          for (let ingKey in response.data[key].ingredients) {
            fetchedIngredients.push({
              ...response.data[key].ingredients[ingKey],
              id: ingKey,
            });
          }
          fetchedMeals.push({
            id: key,
            name: response.data[key].name,
            ingredients: fetchedIngredients,
          });
        }
        dispatch(fetchMealsSuccess(fetchedMeals));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchMealsFailed(error));
      });
  };
};

export const fetchMealsLocal = () => {
  return {
    type: actionTypes.FETCH_MEALS_LOCAL,
  };
};
