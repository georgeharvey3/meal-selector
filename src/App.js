import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import Selector from './components/Selector/Selector';

import * as actions from './store/actions/index';

let initialMeals = [
  {'name': 'curry', 'ingredients': ['rice', 'spice']},
  {'name': 'soup', 'ingredients': ['vegetables', 'stock']},
  {'name': 'burger', 'ingredients': ['patty', 'bun']},
  {'name': 'eggs', 'ingredients': ['egg', 'bread']},
  {'name': 'salad', 'ingredients': ['lettuce', 'gin']},
  {'name': 'pasta', 'ingredients': ['pasata', 'tomato']}
];

class App extends Component {

  componentDidMount = () => {
    this.props.onTryAutoSignin();
  }

  render () {
    return (
      <div className="App">
        <Layout>
          <Selector meals={initialMeals}/>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
