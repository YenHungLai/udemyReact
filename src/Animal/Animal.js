import React, { Component } from "react";
import { Context } from "../App";

export default class Animal extends Component {
	// shouldComponentUpdate(nextProps, nextState) {
	//     return nextProps.name !== this.props.name
	// }

	componentDidUpdate(prevProps, prevState) {
		console.log("CDU!!!!");
	}

	render() {
		return (
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
		);
	}
}
