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
	Component lifecycle - creation:
	1. constructor()
	2. getDerivedStateFromProps(props, state)	-- invoked right before calling the render method
	3. render()
	4. render child components and execute their lifecycle hooks
	5. componentDidMount()
*/

/*
	Component lifecycle - update:
	1. getDerivedStateFromProps(props, state)
	2. shouldComponentUpdate(nextProps, nextState)	-- may cancel updating process
	3. render()
	4. Update child components props
	5. getSnapshoBeforeUpdate(prevProps, prevSate)	-- last-minute DOM operations
	6. componentDidUpdate()
*/

/*
	shouldComponentUpdate(nextProps, nextState)
	Purpose:
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