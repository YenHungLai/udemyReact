import React, { useState } from "react";
import "./person.css";

class Person extends React.Component {
	state = {
		hello: 'world'
	}

	static getDerivedStateFromProps(props, state) {
		console.log("		getDerivedStateFromProps!!!");
		console.log('props', props)
		console.log('state', state)
		console.log('--------------------');
		return state;
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('		shouldComponentUpdate!!!');
		console.log('nextProps :', nextProps);
		console.log('nextState', nextState)
		console.log('--------------------');
		if (nextProps.name === 'Bitch')
			return true;
		else
			return false
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log('		getSnapShotBeforeUpdate!!!');
		console.log('prevProps', prevProps)
		console.log('prevState', prevState)
		console.log('--------------------');
		return null;
	}
	
	render() {
		console.log('		Person render!!!');
		return (
			<div className="persons">
				<h1 onClick={this.props.delete}>
					{this.props.name} is {this.props.age}
				</h1>
				<input type="text" onChange={this.props.changeName} />
			</div>
		);
	}
}

export default Person;
