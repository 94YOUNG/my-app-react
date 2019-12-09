/**
 * Created by 10061658 on 2019/6/11
 * support TextField API https://material-ui.com/zh/api/text-field/
 */
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Checkbox, Chip, ListItemText, MenuItem, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';

//input padding
const inputPadding = (size) => {
	let value;
	switch (size) {
		case ComboBox.Size.small:
			value = 0.25;
			break;
		case ComboBox.Size.large:
			value = 1;
			break;
		default:
			value = 0.6875;

	}
	return value;
};

const useStyles = ({size}) => makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		width: '100%',
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: theme.spacing(0.25),
	},
	input: {
		padding: theme.spacing(inputPadding(size), 0),
		fontSize: size === ComboBox.Size.large ? '1rem' : '',
	},
	menuItemSelected: {
		fontWeight: theme.typography.fontWeightMedium,
	},
	menuItem: {
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function ComboBox(props) {
	const myClasses = useStyles({...props})();

	const [selectedItems, setSelectedItems] = useState([]);
	// const [selectedIndex, setSelectedIndex] = useState();
	const {onChange, dataSource, propertyName, propertyValue, className, children, optionPlaceholder, placeholder, renderStyle, SelectProps, ...rest} = props;

	const {MenuProps, classes, ...SelectPropsRest} = SelectProps;

	useEffect(() => {
		//when the last selected click, clear the selectedItems
		(!props.value || props.value.length === 0) && setSelectedItems([]);
	}, [props.value]);

	//check selected
	function checkSelected(value) {
		//multiple
		if (SelectProps.multiple) {
			if (propertyName) {//option's value is object
				for (let i = 0, length = selectedItems.length; i < length; i++) {
					if (JSON.stringify(value) === JSON.stringify(selectedItems[i])) {
						return true;
					}
				}
				return false
			}
			return selectedItems.includes(value);
		} else {
			//single
			return JSON.stringify(value) === JSON.stringify(selectedItems)
		}
	}

	function createOptionsRender() {
		let optionRender;
		if (SelectProps.native) {
			optionRender = (value, key) => {
				let optionValue = value[propertyValue] || value;
				if (typeof optionValue === 'object') {
					optionValue = JSON.stringify(optionValue);
				}
				return (<option key={key} value={optionValue}>
					{value[propertyName] || value}
				</option>)
			}
		} else if (SelectProps.multiple) {
			optionRender = (value, key) => (<MenuItem key={key} value={value}>
				<Checkbox checked={checkSelected(value)}/>
				<ListItemText primary={value[propertyName] || value}/>
			</MenuItem>)
		} else {
			optionRender = (value, key) => (
				<MenuItem
					key={key}
					value={value}
					classes={{
						root: myClasses.menuItem,
						selected: myClasses.menuItemSelected,
					}}
				>
					{value[propertyName] || value}
				</MenuItem>
			)
		}
		return optionRender;
	}

	//handleChange
	function handleChange(event) {
		let value = event.target.value;
		//selected index
		let selectedItem;
		if(SelectProps.native){
			selectedItem = dataSource[event.target.selectedIndex - 1];
		}
		onChange(value, selectedItem, event);
	}

	function renderValue(selected) {
		setSelectedItems(selected);
		if (!(selected instanceof Array)) {
			selected = [selected]
		}
		if (placeholder && selected.length === 0) {
			return <em>{placeholder}</em>;
		}
		switch (renderStyle) {
			case 'chip':
				return (<div className={myClasses.chips}>
					{selected.map(value => (
						<Chip key={value} label={value} className={myClasses.chip}/>
					))}
				</div>);
			case 'other':
				return;
			default:
				if (propertyName) {//when value is object
					selected = selected.map(value => value[propertyName]);
				}
				return selected.join(',')
		}
	}

	//option's value is only primitive values
	let itemRender = createOptionsRender();

	return (
		<TextField
			className={clsx(myClasses.root, className)}
			select
			{...rest}
			onChange={handleChange}
			SelectProps={{
				MenuProps: {//Properties applied to the Menu element.
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'left',
					},
					PaperProps: {
						style: {
							maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
							// width: 200,
						},
					},
					transformOrigin: {
						vertical: 'top',
						horizontal: 'left',
					},
					getContentAnchorEl: () => {
					},
					...MenuProps
				},
				classes: {
					select: myClasses.input,
					...classes,
				},
				//Render the selected value. You can only use it when the native property is false (default).
				renderValue: SelectProps.native ? null : SelectProps.renderValue || renderValue,
				...SelectPropsRest
			}}
		>
			{optionPlaceholder && <MenuItem disabled value="">
				<em>{optionPlaceholder}</em>
			</MenuItem>}
			{/*if native select the options must contain a empty option,because native select element would display the first option label */}
			{!children && SelectProps.native ? <option value=""/> : null}
			{children || dataSource.map(itemRender)}
		</TextField>
	);
}

/**
 *
 * @type {{small: string, normal: string, large: string}}
 */
ComboBox.Size = {
	small: 'small',
	normal: 'normal',
	large: 'large',
};

ComboBox.defaultProps = {
	dataSource: [],
	value: [],
	variant: 'outlined',
	// propertyValue:'value',//the default value key is 'value'
	SelectProps: {
		multiple: false,//option can display the checkbox
		native: true,
	},
	size: ComboBox.Size.normal,
	onChange: () => {
	},
};

ComboBox.propTypes = {
	/**  Properties applied to the Select element.contain multiple option*/
	SelectProps: PropTypes.shape({
		native: PropTypes.bool,//display native option
		multiple: PropTypes.bool,//if true ,can multi select
		classes: PropTypes.object,//refer to https://material-ui.com/zh/api/select/
	}),
	/**  option data   */
	dataSource: PropTypes.array.isRequired,
	/** if dataSource include object,must provide a key and when dataSource include string,can't set this key */
	propertyName: PropTypes.string,
	/** only when dataSource include object and SelectProps.native is true,
	 *  must provide a key to getting value of the selected option and when dataSource include string,can't set this key */
	propertyValue: PropTypes.string,
	/** placeholder */
	placeholder: PropTypes.string,
	/** optionPlaceholder */
	optionPlaceholder: PropTypes.string,
	/** selected values. especially when multiple selection the value must be a array */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
	/*
	*Signature:
	*function(value: any) => ReactElement
	*value: The value provided to the component.
	*  */
	/** enum:'chip'.  selected style sheet */
	renderStyle: PropTypes.string,//
	/** /invoke when select item. */
	onChange: PropTypes.func,
	/*
	* other prop reference TextField API https://material-ui.com/zh/api/text-field/
	* */
};

export default ComboBox;
