/**
 *@desc
 *Created by yd on 2019-11-24
 */
import 'deepmerge';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import deepmerge from 'deepmerge';

/**
 *@desc
 *Created by yd on 2019-11-21
 */

const theme=
{
	overrides:{
		MuiInputBase:{
			input:{
				fontSize: '2rem',
			},
		},
	},
	typography: {
		button: {
			fontSize: '4rem',
		},
	},
};
const darkTheme={
	overrides:{
		MuiInputBase:{
			input:{
				backgroundColor: 'white',
			},

		},
	},
};

const merge =deepmerge(theme,darkTheme);

console.log(merge);

export default createMuiTheme(theme);


