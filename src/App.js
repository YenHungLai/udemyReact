import React, { Component } from "react";
import Person from "./Person/Person";
import "./App.css";

export default class App extends Component {
	constructor(props) {
		super(props);
		console.log('		App constructor!!!');
		console.log("props :", props);
		console.log('--------------------');
	}

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

	static getDerivedStateFromProps(props, state) {
		console.log("		getDerivedStateFromProps!!!");
		console.log('props', props)
		console.log('state', state)
		console.log('--------------------');
		return state;
	}

	componentDidMount() {
		console.log("		CDM!!!");
	}

	render() {
		console.log("		render!!!");
		return (
			<div className="App">
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
