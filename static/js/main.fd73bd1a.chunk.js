(this["webpackJsonpmeal-selector"]=this["webpackJsonpmeal-selector"]||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports={MealCard:"MealCard_MealCard__26Yvk",Selected:"MealCard_Selected__2PPtQ",Hidden:"MealCard_Hidden__1pzE-",Title:"MealCard_Title__R-MOE",Add:"MealCard_Add__24PAG",RMHolder:"MealCard_RMHolder__Bsk2Y",RemoveMeal:"MealCard_RemoveMeal__3eLZ7"}},,,,function(e,t,n){e.exports={Selector:"Selector_Selector__J2pJn",Button:"Selector_Button__3iUmT"}},,,,,,function(e,t,n){e.exports={Content:"Layout_Content__PrDi6"}},function(e,t,n){e.exports={RemoveButton:"RemoveButton_RemoveButton__1uEds"}},function(e,t,n){e.exports={Button:"Button_Button__3gFiX"}},function(e,t,n){e.exports={Modal:"Modal_Modal__1-5dN"}},function(e,t,n){e.exports={Backdrop:"Backdrop_Backdrop__3j6VK"}},function(e,t,n){e.exports={ShoppingList:"ShoppingList_ShoppingList__1dlPf"}},,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(1),s=n.n(r),c=n(11),i=n.n(c),o=n(5),l=n(9),d=(n(36),n(37),n(3)),u=n(4),m=n(7),h=n(6),j=function(e){return e.children},g=n(18),p=n.n(g),b=function(e){Object(m.a)(n,e);var t=Object(h.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(a.jsxs)(j,{children:[Object(a.jsx)("main",{className:p.a.Content,children:this.props.children}),Object(a.jsxs)("footer",{children:[Object(a.jsx)("hr",{style:{width:"90%"}}),Object(a.jsx)("p",{children:"George Harvey 2020"})]})]})}}]),n}(r.Component),O="ADD_MEAL",f="REMOVE_MEAL",M="ADD_INGREDIENT",v="REMOVE_INGREDIENT",_="SELECT_MEAL",x="DESELECT_MEAL",S="FETCH_MEALS",y=n(19),N=n.n(y),k=function(e){return Object(a.jsx)("button",{className:N.a.RemoveButton,onClick:e.clicked,children:e.children})},w=n(20),C=n.n(w),I=function(e){return Object(a.jsx)("button",{className:C.a.Button,onClick:e.clicked,children:e.children})},E=n(8),A=n.n(E),L=function(e){Object(m.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(d.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={selected:!1,addingIngredient:!1,showIngredients:Boolean(e.props.new)},e.componentDidMount=function(){e.props.meal&&0===e.props.meal.ingredients.length&&e.setState({showIngredients:!0})},e.onAddIngredientClicked=function(){e.setState({addingIngredient:!0})},e.toggleShowIngredients=function(){e.setState((function(e){return{showIngredients:!e.showIngredients}}))},e.toggleSelectMeal=function(){e.props.new||(e.state.selected?e.props.onDeselectMeal(e.props.meal.name):e.props.onSelectMeal(e.props.meal.name),e.setState((function(e){return{selected:!e.selected}})))},e.onAddIngredientKeyPress=function(t){"Enter"===t.key&&(e.setState({addingIngredient:!1}),e.props.onAddIngredient(e.props.meal.name,t.target.value))},e}return Object(u.a)(n,[{key:"render",value:function(){var e=this,t=[A.a.MealCard];this.state.selected&&t.push(A.a.Selected);var n,r=null;this.state.addingIngredient&&(r=Object(a.jsx)("input",{onKeyPress:this.onAddIngredientKeyPress,autoFocus:!0,onBlur:function(){e.setState({addingIngredient:!1})}}));var s=[];this.props.new?n=Object(a.jsx)("input",{onKeyPress:this.props.addMealKeyPress,autoFocus:!0}):(n=Object(a.jsxs)(j,{children:[Object(a.jsx)("h3",{children:this.props.meal.name}),Object(a.jsx)(I,{clicked:this.toggleShowIngredients,children:this.state.showIngredients?"Hide Ingredients":"Show Ingredients"})]}),s=this.props.meal.ingredients.map((function(t,n){return Object(a.jsxs)("li",{children:[Object(a.jsx)(k,{className:A.a.Remove,clicked:function(){return e.props.onRemoveIngredient(e.props.meal.name,t)},children:"X"}),Object(a.jsx)("p",{children:t})]},n)})));var c=Object(a.jsxs)(j,{children:[Object(a.jsx)("hr",{}),Object(a.jsx)("ul",{children:s}),r,Object(a.jsx)("button",{className:A.a.Add,onClick:this.onAddIngredientClicked,children:"+"})]});this.state.showIngredients||(c=null);var i=this.state.selected?"rgb(112, 112, 112)":"rgb(53, 110, 53)",o="1";return this.props.new&&(i="rgb(112, 112, 112)",o=.5),Object(a.jsxs)("div",{className:t.join(" "),children:[Object(a.jsxs)("div",{className:A.a.RMHolder,children:[Object(a.jsx)("button",{className:i,style:{backgroundColor:i,opacity:o},onClick:this.toggleSelectMeal,children:this.state.selected?"Deselect":"Select"}),Object(a.jsx)("button",{style:{backgroundColor:"rgb(180, 66, 66)"},onClick:this.props.removeMealClicked,children:"Delete"})]}),Object(a.jsx)("div",{className:A.a.Title,children:n}),c]})}}]),n}(r.Component),B=Object(o.b)((function(e){return{selectedMeals:e.selectedMeals}}),(function(e){return{onAddIngredient:function(t,n){return e(function(e,t){return{type:M,mealName:e,ingredientName:t}}(t,n))},onRemoveIngredient:function(t,n){return e(function(e,t){return{type:v,mealName:e,ingredientName:t}}(t,n))},onSelectMeal:function(t){return e(function(e){return{type:_,mealName:e}}(t))},onDeselectMeal:function(t){return e(function(e){return{type:x,mealName:e}}(t))}}}))(L),R=n(21),D=n.n(R),P=n(22),T=n.n(P),J=function(e){return e.show?Object(a.jsx)("div",{className:T.a.Backdrop,onClick:e.clicked}):null},K=function(e){return Object(a.jsxs)(j,{children:[Object(a.jsx)(J,{show:e.show,clicked:e.modalClosed}),Object(a.jsx)("div",{className:D.a.Modal,style:{transform:e.show?"translateY(0)":"translateY(-100vh)",display:e.show?"block":"none",opactiy:e.show?"1":"0"},children:e.children})]})},H=n(23),F=n.n(H),Y=function(e){Object(m.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(d.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).getIngredients=function(e){for(var t={},n=0;n<e.length;n++)for(var a=e[n],r=0;r<a.ingredients.length;r++)a.ingredients[r]in t?t[a.ingredients[r]]+=1:t[a.ingredients[r]]=1;return t},e}return Object(u.a)(n,[{key:"render",value:function(){var e=this.getIngredients(this.props.selectedMeals);return Object(a.jsxs)("div",{className:F.a.ShoppingList,children:[Object(a.jsx)("h3",{children:"Your Shopping List:"}),Object(a.jsx)("ul",{children:Object.keys(e).map((function(t){var n="";if(e[t]>1){n+=" ";for(var r=0;r<e[t];r++)n+="*"}return Object(a.jsx)("li",{children:Object(a.jsx)("p",{children:t+n})},t)}))})]})}}]),n}(r.Component),G=Object(o.b)((function(e){return{selectedMeals:e.selectedMeals}}))(Y),V=n(12),X=n.n(V),U=function(e){Object(m.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(d.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={addingMeal:!1,showList:!1,showErrorModal:!1,errorMessage:""},e.componentDidMount=function(){e.props.onFetchMeals()},e.onAddMealClicked=function(){e.setState({addingMeal:!0})},e.onAddMealKeyPress=function(t){if("Enter"===t.key){for(var n=!1,a=0;a<e.props.meals.length;a++)e.props.meals[a].name===t.target.value&&(n=!0);n?e.setState({showErrorModal:!0,errorMessage:"You already have a meal named ".concat(t.target.value,"!")}):(e.setState({addingMeal:!1}),e.props.onAddMeal(t.target.value))}},e.onShowList=function(){e.setState({showList:!0})},e.onDismissModal=function(){e.setState({showList:!1,showErrorModal:!1})},e}return Object(u.a)(n,[{key:"render",value:function(){var e=this,t=null;return this.state.addingMeal&&(t=Object(a.jsx)(B,{new:!0,addMealKeyPress:function(t){return e.onAddMealKeyPress(t)},removeMealClicked:function(){return e.setState({addingMeal:!1})}},0)),Object(a.jsxs)(j,{children:[Object(a.jsx)("h1",{children:"Meal Selector"}),Object(a.jsx)("button",{className:X.a.Button,onClick:this.onAddMealClicked,children:"Add Meal"}),Object(a.jsx)("button",{className:X.a.Button,onClick:this.onShowList,children:"See List"}),Object(a.jsxs)("div",{className:X.a.Selector,children:[this.props.meals.map((function(t,n){return Object(a.jsx)(B,{meal:t,removeMealClicked:function(){return e.props.onRemoveMeal(t.name)}},n)})),t]}),Object(a.jsx)(K,{show:this.state.showList,modalClosed:this.onDismissModal,children:Object(a.jsx)(G,{})}),Object(a.jsx)(K,{show:this.state.showErrorModal,modalClosed:this.onDismissModal,children:Object(a.jsx)("p",{children:this.state.errorMessage})})]})}}]),n}(r.Component),z=Object(o.b)((function(e){return{meals:e.meals}}),(function(e){return{onAddMeal:function(t){return e(function(e){return{type:O,mealName:e}}(t))},onRemoveMeal:function(t){return e(function(e){return{type:f,mealName:e}}(t))},onFetchMeals:function(){return e({type:S})}}}))(U),Q=[{name:"curry",ingredients:["rice","spice"]},{name:"soup",ingredients:["vegetables","stock"]},{name:"burger",ingredients:["patty","bun"]},{name:"eggs",ingredients:["egg","bread"]},{name:"salad",ingredients:["lettuce","gin"]},{name:"pasta",ingredients:["pasata","tomato"]}];var Z=function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(b,{children:Object(a.jsx)(z,{meals:Q})})})},q=n(24),W=n(10),$=n(2),ee={meals:[{name:"curry",ingredients:["rice","spice"]},{name:"soup",ingredients:["vegetables","stock"]},{name:"burger",ingredients:["patty","bun"]},{name:"eggs",ingredients:["egg","bread"]},{name:"salad",ingredients:["lettuce","gin"]},{name:"pasta",ingredients:["pasata","tomato"]}],selectedMeals:[]},te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O:var n={name:t.mealName,ingredients:[]},a=e.meals.concat(n);return localStorage.setItem("meals",JSON.stringify(a)),Object($.a)(Object($.a)({},e),{},{meals:a});case f:for(var r,s=Object(W.a)(e.meals),c=0;c<s.length;c++)if(s[c].name===t.mealName){r=c;break}var i=s.slice(0,r).concat(s.slice(r+1,s.length));return localStorage.setItem("meals",JSON.stringify(i)),Object($.a)(Object($.a)({},e),{},{meals:i});case M:var o=Object(W.a)(e.meals),l=o.filter((function(e){return e.name===t.mealName}))[0],d=Object(W.a)(l.ingredients),u=d.concat(t.ingredientName);return l.ingredients=u,localStorage.setItem("meals",JSON.stringify(o)),Object($.a)(Object($.a)({},e),{},{meals:o});case v:for(var m,h=Object(W.a)(e.meals),j=h.filter((function(e){return e.name===t.mealName}))[0],g=Object(W.a)(j.ingredients),p=0;p<g.length;p++)g[p]===t.ingredientName&&(m=p);var b=g.slice(0,m).concat(g.slice(m+1,g.length));return j.ingredients=b,localStorage.setItem("meals",JSON.stringify(h)),Object($.a)(Object($.a)({},e),{},{meals:h});case _:var y=e.meals.filter((function(e){return e.name===t.mealName}))[0];return Object($.a)(Object($.a)({},e),{},{selectedMeals:e.selectedMeals.concat(y)});case x:for(var N,k=0;k<e.selectedMeals.length;k++)if(e.selectedMeals[k].name===t.mealName){N=k;break}var w=e.selectedMeals.slice(0,N).concat(e.selectedMeals.slice(N+1,e.selectedMeals.length));return Object($.a)(Object($.a)({},e),{},{selectedMeals:w});case S:var C=JSON.parse(localStorage.getItem("meals"));return C||(C=[],localStorage.setItem("meals","[]")),Object($.a)(Object($.a)({},e),{},{meals:C});default:return e}},ne=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||l.c,ae=Object(l.d)(te,ne(Object(l.a)(q.a))),re=Object(a.jsx)(o.a,{store:ae,children:Object(a.jsx)(Z,{})});i.a.render(Object(a.jsx)(s.a.StrictMode,{children:re}),document.getElementById("root"))}],[[38,1,2]]]);
//# sourceMappingURL=main.fd73bd1a.chunk.js.map