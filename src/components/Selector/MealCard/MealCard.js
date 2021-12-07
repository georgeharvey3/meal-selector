import React, { Component } from "react";
import { connect } from "react-redux";

import * as mealActions from "../../../store/actions/index";

import RemoveButton from "../../UI/Button/RemoveButton/RemoveButton";
import Button from "../../UI/Button/Button";

import Aux from "../../../hoc/Aux";

import classes from "./MealCard.module.css";

class MealCard extends Component {
  state = {
    selected: false,
    addingIngredient: false,
    showIngredients: Boolean(this.props.new),
    editIngredient: "",
  };

  componentDidMount = () => {
    if (this.props.meal && this.props.meal.ingredients.length === 0) {
      this.setState({
        showIngredients: true,
      });
    }
  };

  onAddIngredientClicked = () => {
    this.setState((prevState) => {
      return {
        addingIngredient: !prevState.addingIngredient,
      };
    });
  };

  toggleShowIngredients = () => {
    this.setState((prevState) => {
      return {
        showIngredients: !prevState.showIngredients,
        editIngredient: "",
      };
    });
  };

  toggleSelectMeal = () => {
    if (this.props.new) {
      return;
    }
    if (!this.state.selected) {
      this.props.onSelectMeal(this.props.meal.name);
    } else {
      this.props.onDeselectMeal(this.props.meal.name);
    }

    this.setState((prevState) => {
      return {
        selected: !prevState.selected,
      };
    });
  };

  onAddIngredientKeyPress = (e) => {
    if (e.key === "Enter") {
      this.setState({
        addingIngredient: false,
      });
      let ingredient = { ingredientName: e.target.value };
      if (this.props.isAuthenticated) {
        this.props.onAddIngredient(
          this.props.meal.id,
          ingredient,
          this.props.token
        );
      } else {
        this.props.onAddIngredientLocal(this.props.meal.name, ingredient);
      }
    }
  };

  removeIngredientClicked = (ingId) => {
    if (this.props.isAuthenticated) {
      this.props.onRemoveIngredient(
        this.props.meal.id,
        ingId,
        this.props.token
      );
    }
  };

  onAddIngredientSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const ingredientObj = Object.fromEntries(data.entries());

    this.setState({
      addingIngredient: false,
    });
    if (this.props.isAuthenticated) {
      this.props.onAddIngredient(
        this.props.meal.id,
        ingredientObj,
        this.props.token
      );
    } else {
      this.props.onAddIngredientLocal(this.props.meal.name, ingredientObj);
    }
  };

  onIngredientClick = (ingredientName) => {
    this.setState({
      editIngredient: ingredientName,
    });
  };

  onUpdateIngredientSubmit = (event, ingredientId) => {
    event.preventDefault();
    const data = new FormData(event.target);

    let ingredientObj = Object.fromEntries(data.entries());

    ingredientObj = { ...ingredientObj, id: ingredientId };

    this.setState({
      addingIngredient: false,
    });
    if (this.props.isAuthenticated) {
      this.props.onUpdateIngredient(
        this.props.meal.id,
        ingredientObj,
        this.props.token
      );
    }
    this.setState({
      editIngredient: "",
    });
  };

  render() {
    let cardClasses = [classes.MealCard];

    if (this.state.selected) {
      cardClasses.push(classes.Selected);
    }

    let addInput = null;

    if (this.state.addingIngredient) {
      addInput = (
        <form onSubmit={this.onAddIngredientSubmit}>
          <input
            name="ingredientName"
            placeholder="Ingredient Name"
            autoFocus={true}
          />
          <input name="quantity" placeholder="Quantity (g)" />
          <input name="protein" placeholder="Protein per 100g" />
          <input type="submit" />
        </form>
      );
    }

    let header;
    let ingredients = [];

    if (this.props.new) {
      header = (
        <input onKeyPress={this.props.addMealKeyPress} autoFocus={true} />
      );
    } else {
      let protein =
        this.props.meal.ingredients.reduce(
          (acc, val) =>
            acc + Number((val.protein || 0) * (val.quantity / 100 || 1)),
          0
        ) || null;

      if (protein) {
        protein = "Protein: " + protein + "g";
      }
      header = (
        <Aux>
          <h3>{this.props.meal.name}</h3>
          <h4>{protein}</h4>
          <Button clicked={this.toggleShowIngredients}>
            {this.state.showIngredients
              ? "Hide Ingredients"
              : "Show Ingredients"}
          </Button>
        </Aux>
      );
      if (
        this.props.meal.ingredients &&
        this.props.meal.ingredients.length > 0
      ) {
        ingredients = this.props.meal.ingredients.map((ing, index) => {
          if (ing.ingredientName !== this.state.editIngredient) {
            return (
              <li key={index}>
                <RemoveButton
                  className={classes.Remove}
                  clicked={() => this.removeIngredientClicked(ing.id)}
                >
                  X
                </RemoveButton>
                <p onClick={() => this.onIngredientClick(ing.ingredientName)}>
                  {ing.ingredientName}
                </p>
              </li>
            );
          } else {
            return (
              <form
                key={index}
                onSubmit={(event) =>
                  this.onUpdateIngredientSubmit(event, ing.id)
                }
              >
                <input
                  name="ingredientName"
                  placeholder="Ingredient Name"
                  autoFocus={true}
                  defaultValue={ing.ingredientName}
                />
                <input
                  name="quantity"
                  placeholder="Quantity (g)"
                  defaultValue={ing.quantity}
                />
                <input
                  name="protein"
                  placeholder="Protein per 100g"
                  defaultValue={ing.protein}
                />
                <input type="submit" />
              </form>
            );
          }
        });
      }
    }

    let total = (
      <Aux>
        <hr />
        <ul>{ingredients}</ul>
        {addInput}
        <button className={classes.Add} onClick={this.onAddIngredientClicked}>
          {this.state.addingIngredient ? "-" : "+"}
        </button>
      </Aux>
    );

    if (!this.state.showIngredients) {
      total = null;
    }

    let selectColour = this.state.selected
      ? "rgb(112, 112, 112)"
      : "rgb(53, 110, 53)";
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
            style={{ backgroundColor: selectColour, opacity: selectOpacity }}
            onClick={this.toggleSelectMeal}
          >
            {this.state.selected ? "Deselect" : "Select"}
          </button>
          <button
            style={{ backgroundColor: "rgb(180, 66, 66)" }}
            onClick={this.props.removeMealClicked}
          >
            Delete
          </button>
        </div>
        <div className={classes.Title}>{header}</div>
        {total}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedMeals: state.meals.selectedMeals,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (mealId, ingredient, token) =>
      dispatch(mealActions.addIngredient(mealId, ingredient, token)),
    onAddIngredientLocal: (mealName, ingredient) =>
      dispatch(mealActions.addIngredientLocal(mealName, ingredient)),
    onUpdateIngredient: (mealId, ingredient, token) =>
      dispatch(mealActions.updateIngredient(mealId, ingredient, token)),
    onRemoveIngredient: (mealId, ingredientId, token) =>
      dispatch(mealActions.removeIngredient(mealId, ingredientId, token)),
    onRemoveIngredientLocal: (mealName, ingredientName) =>
      dispatch(mealActions.removeIngredientLocal(mealName, ingredientName)),
    onSelectMeal: (mealName) => dispatch(mealActions.selectMeal(mealName)),
    onDeselectMeal: (mealName) => dispatch(mealActions.deSelectMeal(mealName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealCard);
