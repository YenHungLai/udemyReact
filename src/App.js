import React, { Component } from "react";
import Person from "./Person/Person";
import Animal from "./Animal/Animal";
import "./App.css";

export const Context = React.createContext({ msg: "Hello" });

export default class App extends Component {
	constructor(props) {
		super(props);
		console.log("		App constructor!!!");
		console.log("props :", props);
		console.log("--------------------");
	}

	state = {
		persons: [
			{ id: "qwdqwef", name: "Jacob", age: 22 },
			{ id: "adqwdqw", name: "Amber", age: 18 }
		],
		showPersons: false,
		animals: [
			{ id: "asdwdq", name: "Fido", type: "Dog" },
			{ id: "fwewef", name: "Alice", type: "Cat" }
		]
	};

	toggleShowPerson = () => {
		this.setState(prevState => ({ showPersons: !prevState.showPersons }));
	};

	deletePerson = index => {
		console.log(index);
		// Copy persons array
		const persons = this.state.persons.slice();
		// Delete element from array by index.
		persons.splice(index, 1);
		this.setState({ persons });
		console.log(this.state);
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

	changeAnimalName = (id, e) => {
		console.log(e.target.value);
		console.log(id);
		const index = this.state.animals.findIndex(item => item.id === id);
		console.log(index);
		const animals = [...this.state.animals];
		console.log(animals);
		animals[index].name = e.target.value;
		this.setState({ animals });
	};

	static getDerivedStateFromProps(props, state) {
		console.log("		getDerivedStateFromProps!!!");
		console.log("props", props);
		console.log("state", state);
		console.log("--------------------");
		return state;
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	componentDidMount() {
		console.log("		CDM!!!");
		console.log("--------------------");
		this.btnEl.style.backgroundColor = "red";
	}

	render() {
		console.log("		render!!!");
		const jsx = [<div key="1">Hello world</div>];
		return (
			<div className="App">
				<button
					onClick={this.toggleShowPerson}
					ref={btnEl => {
						this.btnEl = btnEl;
					}}
				>
					Show persons
				</button>
				<Context.Provider value={{ msg: "Hello" }}>
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
					{this.state.animals.map((item, index) => (
						<Animal
							name={item.name}
							type={item.type}
							key={index}
							changeAnimalName={this.changeAnimalName.bind(
								this,
								item.id
							)}
						/>
					))}
				</Context.Provider>
				{jsx}
			</div>
		);
	}
}
