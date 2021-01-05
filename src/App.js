import './App.css';

import Layout from './containers/Layout/Layout';

import Selector from './components/Selector/Selector';

let initialMeals = [
  {'name': 'curry', 'ingredients': ['rice', 'spice']},
  {'name': 'soup', 'ingredients': ['vegetables', 'stock']},
  {'name': 'burger', 'ingredients': ['patty', 'bun']},
  {'name': 'eggs', 'ingredients': ['egg', 'bread']},
  {'name': 'salad', 'ingredients': ['lettuce', 'gin']},
  {'name': 'pasta', 'ingredients': ['pasata', 'tomato']}
];

function App() {
  return (
    <div className="App">
      <Layout>
        <Selector meals={initialMeals}/>
      </Layout>
    </div>
  );
}

export default App;
