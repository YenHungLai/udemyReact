// ReactDOM.render()
const MyComp = (props) => {
    return(
        <div>
            <h1>Hello {props.name}</h1>
        </div>
    )
}

ReactDOM.render(<MyComp name='Jacob' />, document.querySelector('#id'))

// ES6 features

// Rest operator
const func = (...args) => {
    console.log(args);
}

func(1,2,3, 'a')

// Primitive type vs Reference type

// number, string, boolean are primitive types.

// object and array are reference types.
const obj = {
    name: 'Jacob'
}

// obj2 will be a pointer to the obj
const obj2 = obj;

// This will also change obj2
obj.name = 'Amber';
console.log(obj2);

// export and import

// If you use export default, then import NAME is up to you, no {}
// Can only have ONE export default

// When use regular imports, need to use {}
import {NAME} from 'PATH'
import {NAME as ALIAS} from 'PATH'

// Bundle imports
import * as bundled from 'PATH'
bundled.function()
bundled.whateve()

// Use React.createElement instead of JSX
// This is what JSX gets compiled to
return React.createElement('div', {className: 'App'}, 'h1', 'Hello World');

// Component file name is capitalized
// When importing a component, capitalize its name
import Person from 'PATH';

// React Hooks

// useState()
import React, {useState} from 'react';

// useState() returns an array with two elements
const [state, setstate] = useState(initialState)
// The 1st element is always the current state
// The 2nd element is always a function that allows you to set state

// The setState from react hooks does not merge new state with old state,
// it replaces it instead. IMPORTANT!!

// setState() with prevState
setPersonsState(prevState => {
    return {
        persons: [
            { name: "Jacob", age: prevState.persons[0].age + num },
            { name: "Amber", age: prevState.persons[1].age + num }
        ]
    };
});

// User multiple useState()
const [personsState, setPersonsState] = useState({
    persons: [{ name: "Jacob", age: 22 }, { name: "Amber", age: 18 }]
});

const [animalState, setAnimalState] = useState({
    animals: [
        { type: "Dog", Sound: "Oof" },
        { type: "Cat", Sound: "Meoww" }
    ]
});

// A stateless component is also called representational component 

// Use as least stateful components as possible.

// Pass method from parent component to children to set parent's state

// Pass params inside onClick

// Wrap function you want to call inside a function, not recommended
<button onClick={() => growOld(10)}>Grow old</button>

// Use bind(this, PARAM) in parent component, recommended    ??? 
<Person mySetState={this.mySetState.bind(this, 'Bitches')} />

// In-line CSS, local to component
// Put this in render()
const style = {
    backgroundColor: 'red';
}

<div style={style}></div>

// Conditional rendering

// if statement
Obvious, do it in render() before return()

// Ternary operator
{
    this.state.showPersons ?
    this.state.persons.map((item, index) => (
        <Person name={item.name} age={item.age} key={index} />
    )) : null
}

// && operator
{this.state.showPersons &&
    this.state.persons.map((item, index) => (
        <Person name={item.name} age={item.age} key={index} />
    ))}

// CSS display property, does not work on your own components
style={{
    display: this.state.showPersons ? "block" : "none"
}}

// prevState
// Wrapping expression in () so no return statement ????
this.setState(prevState => ({ showPersons: !prevState.showPersons }));

// Delete element from array by index, not recommended.
temp.splice(index, 1);

// slice() without args copys the array whereas splice modifies the original array.
const temp = this.state.persons.slice();

or 

const temp = [...this.state.persons]

// React key property optimizes performance
// Use key property so react does not re-render everything, only the ones that changed
// Has to be an unique value 
// Usually use index of array but it is not the best
// Include an id property in your data source.
const persons: [{ id: 'qwdqwef', name: "Jacob", age: 22 }, { id: 'adqwdqw', name: "Amber", age: 18 }]

// It is best practice to not modify state directly, make a copy of it then use setState()

// Function that gets executed by an event will get an 'event' param.
changeName = (id, event) => {
    const personIndex = this.state.persons.findIndex(
        item => item.id === id
    );

    // Copy the data cuz it is best practice.
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons });
};

// Code snippets up till lecture 60

// App.js
import React, { Component } from "react";
import Person from "./Person/Person";

export default class App extends Component {
	state = {
		persons: [
			{ id: "qwdqwef", name: "Jacob", age: 22 },
			{ id: "adqwdqw", name: "Amber", age: 18 }
		],
		showPersons: false
	};

	toggleShowPerson = () => {
		this.setState(prevState => ({ showPersons: !prevState.showPersons }));
	};

	deletePerson = index => {
		const temp = this.state.persons.slice();
		// Delete element from array by index.
		temp.splice(index, 1);
		this.setState({ persons: temp });
	};

	changeName = (id, event) => {
		const personIndex = this.state.persons.findIndex(
			item => item.id === id
		);

		// Copy the data cuz it is best practice.
		const person = { ...this.state.persons[personIndex] };
		person.name = event.target.value;

		const persons = [...this.state.persons];
		persons[personIndex] = person;

		this.setState({ persons });
	};

	render() {
		return (
			<div>
				<button onClick={this.toggleShowPerson}>Show persons</button>
				{this.state.showPersons &&
					this.state.persons.map((item, index) => (
						<Person
							name={item.name}
							age={item.age}
							key={item.id}
							delete={this.deletePerson.bind(this, index)}
							changeName={this.changeName.bind(this, item.id)}
						/>
					))}
			</div>
		);
	}
}

// Persons.js
import React, { useState } from "react";
import "./style.css";

const Person = props => {
	return (
		<div className="persons">
			<h1 onClick={props.delete}>{props.name} is {props.age}</h1>
			<input type="text" onChange={props.changeName}/>
		</div>
	);
};

export default Person;


/*
	Create folder for components, assets(imgs, txt...), containers
	Each component needs to have a clear focus.
*/

// One line expression can omit return statement
const func = () => (

);


/*
	Component lifecycle - creation(initial render):
	1. constructor()
	2. getDerivedStateFromProps(props, state)	-- invoked right before calling the render method
	3. render()
	4. render child components and execute their lifecycle hooks
	5. componentDidMount()
*/

/*
	Component lifecycle - update(re-render, when props or state changes):
	1. getDerivedStateFromProps(props, state)
	2. shouldComponentUpdate(nextProps, nextState)	-- may cancel updating process
	3. render()
	4. Update child components props
	5. getSnapshoBeforeUpdate(prevProps, prevSate)	-- last-minute DOM operations
	6. componentDidUpdate()
*/

/* 
	constructor(props)
	Purpose: initialize state
	Do not cause side-effect (ex: http request...)
*/
constructor(props) {
	super(props);
	state = {
		name: 'Jacob'
	}
}

/*
	getDerivedStateFromProps(props, state)
	Purpose: update state when props change
	Do not cause side-effect (ex: http request...)
	Not used very often
*/

// Need to return updated state
static getDerivedStateFromProps(props, state) {
	return state;
}

/*
	componentDidMount()
	Purpose: cause side-effect here
	Do not update state because it will trigger re-render cycle
	unless you do it in a then block of a promise
*/ 

/*
	shouldComponentUpdate(nextProps, nextState)
	Purpose: may cancel updating process for performance optimization
	Do not cause side-effect (ex: http request...)
*/

// Return true to update, false to not
shouldComponentUpdate(nextProps, nextState) {
	console.log('nextProps :', nextProps);
	console.log('nextState', nextState)
	if (nextProps.name === 'Bitch')
		return true;
	else
		return false
}

/*
	getSnapshotBeforeUpdate(prevProps, prevState)
	Purpose: last-minute DOM operation(ex: get scrolling position from user)
	Do not cause side-effect (ex: http request...)
*/
getSnapshotBeforeUpdate(prevProps, prevState) {
	console.log('		getSnapShotBeforeUpdate!!!');
	console.log('prevProps', prevProps)
	console.log('prevState', prevState)
	console.log('--------------------');
	return {'msg': 'I am the snapshot'};
}

/*
	componentDidUpdate()
	Purpose: 
	Cause side-effect here
	Do not update state
*/

// Snapshot from getSnapshotBeforeUpdate is passed to here 
componentDidUpdate(prevProps, prevState, snapshot) {
	console.log('CDU!!!');
	console.log('prevProps :', prevProps);
	console.log('prevState :', prevState);
	console.log(snapshot);
}

// If the parent component gets re-rendered, all of its child components will get re-rendered
// Because they are all in the same render() function.

/*
	Optimization
	Use shouldComponentUpdate()
	Use PureComponent which is a component that implements shouldComponentUpdate() to check all props
	export default React.memo(COMPONENT_NAME) 	-- for functional components
		- React takes a snapshot of the component and only re-render when inputs change
	Pass props that do not change often
	It is not wise to use shouldComponentUpdate() on all components because they take time too
		- Evaluate how often the component updates
*/ 

// You can create an array and render it
const jsx = [
	<div>Hello</div>
]

render() {
	return jsx
}

// Use Aux component (Higher Order Component) to wrap around all components to avoid react key requirements
import React from 'react';

const aux = props => props.children;

export default aux;

// App.js
import Aux from 'PATH'

<Aux>
	EVERYTHING...
</Aux>

// React.Fragment does the same thing
<React.Fragment>
	...
</React.Fragment>

// Higher Order Component takes in a component and returns a component.
// A component that wraps around other components
// It is convention to name HOC like this "WithClass.js"

// Example
import React from 'react'

const withClass = props => {
	<div className={props.classes}>
		{props.children}
	</div>
}

// App.js 
import WithClass from 'PATH'

return(
	<WithClass classes={...}>
		...
	</WithClass>
)

// Example type 2
import React from 'react'

// component parameter needs to be capitalized
const withClass = (WrappedComponent, className) => {
	// Returns a functional component
	return props => (
		<div className={className}>
			<WrappedComponent />
		</div>
	)
}

// App.js
export default withClass(App, classes.App)

// Spread Attributes, these two are equivalent
function App1() {
	return <Greeting firstName="Ben" lastName="Hector" />;
}
  
function App2() {
	const props = {firstName: 'Ben', lastName: 'Hector'};
	return <Greeting {...props} />;
}

// Ternary operator in assignment
const x = 10;
const temp = x === 10 ? 1 : 2;

// setState() is not guaranteed to execute right away.
this.setState({
	// Do not do this, it might retrieve the wrong state.
	changeCounter: this.state.changeCounter + 1
})

// Use prevState
this.setState((prevState, props) => (
	{ changeCounter: prevState.changeCounter + 1 }
))

/* 
	PropTypes 
	...
*/

/*
	Refs
	Reference to an element e.g buttons, inputs or React components
	You may not use the ref attribute on function components because they don’t have instances.
*/ 

// ref in element
<button ref={btnEl => {this.btnEl = btnEl}} >
	Show persons
</button>

// Initialize ref in constructor
constructor(props) {
	super(props)
	this.inputElementRef = React.createRef()
}

<input type='text' ref={this.inputElementRef} />

// Access element like this
this.inputElementRef.current

// Context API

// Changing something in the context object will not trigger re-render

// Context.Consumer takes a function as child
// The function takes in context as argument
<Context.Consumer>
{context => (
	<div>
		I am a {this.props.type}, my name is {this.props.name}
		<input
			type="text"
			onChange={this.props.changeAnimalName}
		/>
		{context.msg}
	</div>
)}
</Context.Consumer>