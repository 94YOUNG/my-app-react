/**
 *@desc
 *Created by yd on 2019-07-04
 */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import RenderTree from './render-tree';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));
export default function RenderTreeDemo() {
	const data= [{
		title: 'level1',
		index: 1,
		listItemTextProps:{
			primary:'level1'
		},
		children: [
			{
				title: 'level2',
				index: 2,
				listItemTextProps:{
					primary:'level2'
				},
				children: [{
					title: 'level3',
					listItemTextProps:{
						primary:'level3'
					},
					index: 3,
				}, {
					title: 'level3',
					index: 4,
				}
				]
			}
		]
	}, {
		title: 'level1',
		index: 5,
		children: [
			{
				title: 'level2',
				index: 6,
			}, {
				title: 'level2',
				index: 7,
			}
		]
	}
	];
	return (<RenderTree
		menuData={
			Object.assign(data,{})
		}
	/>)
}
