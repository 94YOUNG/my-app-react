import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import useTheme from '@material-ui/core/styles/useTheme';
import {SignalCellular0Bar} from '@material-ui/icons';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	selected: {
		color: '#2196f3',
		fontWeight: 500,
	},
}));

const getStyles = (theme) => {
	return {
		paddingLeft: theme.spacing(3),
	};
};

function TreeNode(props) {
	return <ListItem button{...props.listItemProps}>
		{props.ListItemIconProps ? <ListItemIcon {...props.ListItemIconProps}>
			{props.ListItemIconProps.children}
		</ListItemIcon> : null}
		<ListItemText primary={props.text} {...props.listItemTextProps} />
		{props.listItemProps.children}
	</ListItem>
}


export default function RenderTree(props) {
	console.log(props.menuData)
	let needOpenCount = -1;
	let menuItemIndex = 0;
	const classes = useStyles();
	const theme = useTheme();

	const [open, setOpen] = React.useState([]);
	const [selectItem, setSelectItem] = React.useState(-1);
	const [selectItemData, setSelectItemData] = React.useState({});

	const {menuLabelKey, ...restProps} = props

	useEffect(() => {
		setOpen(new Array(needOpenCount + 1).fill(false))
	}, [needOpenCount]);

	function handleClick(clickIndex) {
		setOpen(open.map((value, index) => {
			return index === clickIndex ? !value : value
		}));
		console.log(open)
	}

	function clickItem(curMenuSelectIndex, clickFun = () => {
	}) {
		setSelectItem(curMenuSelectIndex);
		clickFun();

	}

	function recursive(value) {
		console.log('render tree', value);
		if (!value) return;
		if (value.children) {
			needOpenCount++;
			console.log('needOpenCount', needOpenCount);
			let openIndex = needOpenCount;
			return (
				<React.Fragment>
					<TreeNode listItemProps={{
						style: getStyles(theme),
						// className: clsx(selectItem === menuItemIndex ? classes.selected : ''),
						onClick(e) {
							handleClick(openIndex)
						},
						children: open[openIndex] ? <ExpandLess/> : <ExpandMore/>
					}} text={value[menuLabelKey]} listItemTextProps={value.listItemTextProps} ListItemIconProps={{
						children:<SignalCellular0Bar />
					}}
					/>

					<Collapse style={getStyles(theme)} in={open[openIndex]} timeout="auto" unmountOnExit>

						<List component="div" disablePadding>
							{
								value.children.map(recursive)
							}
						</List>
					</Collapse>
				</React.Fragment>)

		} else {
			menuItemIndex++;
			let curMenuIndex = menuItemIndex;
			let clickFun = value.onClick;
			return (
				<TreeNode listItemProps={{
					key: menuItemIndex,
					style: getStyles(theme),
					className: clsx(selectItem === menuItemIndex ? classes.selected : ''),
					onClick(e) {
						clickItem(curMenuIndex, e=>selectItemData=>clickFun(e,selectItemData))
					}
				}} text={value[menuLabelKey]} listItemTextProps={value.listItemTextProps}
				/>)
		}
	}

	return (
		<List
			component="nav"
			aria-labelledby="nested-list-subheader"
			className={classes.root}
		>
			{
				props.menuData.map(recursive)
			}
		</List>
	);
}

RenderTree.defaultProps = {
	menuData: [],
	listItemText: 'primary',
	menuLabelKey: 'key'
};

RenderTree.propTypes = {
	/**
	 * menu item data
	 */
	menuData: PropTypes.array.isRequired,
	/**
	 * menu's label's key
	 */
	menuLabelKey: PropTypes.string,

	onSelected: PropTypes.func,

	onExpand: PropTypes.func,

};
/*[
    {
        title: value,
        downIcon: value,
        upIcon: value,
        position: value,
        nodeData: {

        },
        onClick () {
        },
        children: []
    }
]*/
