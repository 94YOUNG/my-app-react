/**
 *@desc
 *Created by yd on 2019-11-23
 */
import React, { PureComponent } from 'react';

export class IndexPage extends React.Component{
	constructor() {
		super();
		this.state = {
			isShow: false
		};
		console.log('constructor');
	}
	changeState = () => {
		this.setState({
			isShow: true
		})
	};
	render() {
		console.log('render');
		return (
			<div>
				<button onClick={this.changeState}>点击</button>
				<div>{this.state.isShow.toString()}</div>
			</div>
		);
	}
}
