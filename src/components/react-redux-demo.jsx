/**
 *@desc
 *Created by yd on 2019-08-03
 */
import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux/es/redux';

class ReactReduxDemo extends React.Component {
	count=0;
	#cou=0;
	constructor(props) {
		super(props);

		this.state = {};

	}

	render() {
		return (
			<div>
				{this.count}
			</div>
		);
	}
}

ReactReduxDemo.propTypes = {};

function mapStateToProps(state){
	return {
		...state
	}
}

function mapDispatchToProps(dispatchs){
	return bindActionCreators({

	},dispatchs)
}

export default connect(mapStateToProps,mapDispatchToProps)(ReactReduxDemo);
