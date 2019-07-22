/**
 *@desc
 *Created by yd on 2019-07-13
 */
import React, {Component} from 'react';

class CustomForm extends Component {

	constructor(props){
		super(props)
		this.buttonRef=React.createRef();
	}
	handleSubmit = () => {
		console.log("Input Value: ", this.input.value)
		console.log("button ref: ", this.buttonRef)
	}
	render () {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					type='text'
					ref={(input) => this.input = input} />
				<button ref={this.buttonRef} type='submit'>Submit</button>
			</form>
		)
	}
}
export {CustomForm}
