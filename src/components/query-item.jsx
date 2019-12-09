import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {ConditionType, TIME_FORMAT} from '@cabis/communication/converter';
import IconButton from '@material-ui/core/IconButton';
import intl from 'react-intl-universal';

import MomentUtils from '@date-io/moment';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import {InputField, ComboBox} from '@cogent/components';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@cabis/style/img/icon/icon24/Icon24_delete_normal.png';
import {CriteriaDataType} from '@cabis/toolkit/parser/criteria-expression-parser';
import {ControlType} from './convert';

const styles = theme => ({
    /*    queryItem: {
            marginBottom: theme.spacing(0.625),
        },*/
    queryItemGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyItems: 'center',
    },
    queryDelDiv: {
        width: '40px',
    },
    queryCondition: {
        minWidth: 110,
        margin: theme.spacing(0,1.25),
        // marginRight:0,
    },
    queryName: {
        width: '150px',
        textAlign: 'right',
        padding: theme.spacing(1.25),
    },
    queryValue: {
        flex: 1,
    },
    queryItemDiv: {
        display: 'flex',
        flexDirection: 'row',
    },
    formControl: {
        display: 'block',
        width: '100%',
        color: '#555555',
        backgroundColor: theme.palette.common.white,
        backgroundImage: 'none',
        WebkitTransition: 'border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s',
        transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
    },
    inputOutlineRoot: {
        width: '100%',
    },
    del: {
        width: 48,
        // height: 48,
    },
});

const itemPropsDefault = {
    labelKey: 'label',
    controlTypeKey: 'controlType',
};

class QueryItem extends React.PureComponent {

    constructor (props) {
        super(props);
        this.state = {
            value: null,
            valueTo: null,
            condition: ConditionType.Equal,
        };
    }

    componentDidMount () {
        if (this.props.item) {
            this.setState({
                value: this.props.item.type === CriteriaDataType.DateTime && this.props.item.value ?
                    moment(this.props.item.value, TIME_FORMAT) : this.props.item.value,
                condition: this.props.item.condition || ConditionType.Equal
            });
        }
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        if (this.props.item !== prevProps.item) {
            this.setState({
                value: this.props.item.type === CriteriaDataType.DateTime && this.props.item.value ?
                    moment(this.props.item.value, TIME_FORMAT) : this.props.item.value,
                condition: this.props.item.condition || ConditionType.Equal
            });
        }
    }

    componentWillUnmount () {
    }

    //input value change
    handleInputChange = (event, isToValue) => {
        const target = event.target;
        const value = target.type === 'checkbox' ?
            target.checked : target.value;

        if (isToValue) {
            this.setState({
                valueTo: value
            });
        } else {
            this.setState({
                value
            });
        }

    };

    //data & between value change
    handleValueChanged = (value, isToValue) => {
        let item = this.props.item;
        if (isToValue) {
            item.valueTo = value;
            if (this.props.item.type === CriteriaDataType.DateTime) {
                item.valueTo = item.valueTo ? `${item.valueTo.format(TIME_FORMAT)}T00:00:00` : null
            }
            this.setState({valueTo: value});
        } else {
            item.value = value;
            if (this.props.item.type === CriteriaDataType.DateTime) {
                item.value = item.value ? `${item.value.format(TIME_FORMAT)}T00:00:00` : null
            }
            this.setState({value});
        }

        this.props.updateItem(this.props.item, {
            condition: this.state.condition,
            value: item.value,
            valueTo: item.valueTo
        });
    };

    //select value change
    selectChange = (value) => {
        // this.setState({value});
        this.props.updateItem(this.props.item, {
            condition: this.state.condition,
            value,
        });
    };

    //condition select option change
    conditionChange = (value) => {
        this.setState({condition: value});
        this.props.updateItem(this.props.item, {
            condition: value,
            value: this.props.item.value,
            valueTo: this.props.item.valueTo
        });
    };

    render () {
        const {classes, item, valueOptionsProps, operationOptionsProps} = this.props;

        const itemProps = {...itemPropsDefault,...this.props.itemProps};

        return (
            <form name="itemForm" className={classes.queryItemGroup} id={'query-item'}>
                {/*delete item*/}
                <div className={classes.del}>
                    {this.props.type === QueryItem.Type.others &&
                    <Tooltip title={intl.get('Delete')}>
                        <IconButton
                            id="delete-tab-query-item-btn"
                            onClick={e => {
                                e.stopPropagation();
                                e.preventDefault();
                                this.props.delItem(item);
                            }}
                        >
                            <img src={DeleteIcon} alt={'delete'} />
                        </IconButton>
                    </Tooltip>
                    }
                </div>
                {/*condition label*/}
                <div className={classes.queryName}>
                    <Typography
                        variant={'subtitle2'}
                    >{item[itemProps.labelKey]}</Typography>
                </div>
                {/*condition option*/}
                <div className={classes.queryCondition} id={item.label}>
                    <ComboBox
                        value={this.state.condition || ''}
                        SelectProps={{
                            native: true
                        }}

                        dataSource={item.options}
                        propertyName={'label'}
                        propertyValue={'value'}

                        {...operationOptionsProps}
                        onChange={this.conditionChange}

                    />
                </div>
                {/*condition value*/}
                <div className={classes.queryValue}
                     data-toggle="tooltip"
                >
                    {/*select component*/}
                    {item[itemProps.controlTypeKey] === ControlType.ComboBox &&
                    <ComboBox
                        value={item.value || ''}
                        SelectProps={{
                            native: true
                        }}

                        dataSource={item.valueOptions}
                        onChange={this.selectChange}
                        propertyName={'label'}
                        propertyValue={'value'}
                        {...valueOptionsProps}
                    />
                    }
                    {/*input component*/}
                    {item[itemProps.controlTypeKey] === ControlType.TextBox &&
                    <div className={classes.queryItemDiv}>
                        <InputField id="query-item-input-div" type="text" value={this.state.value}
                                    placeholder={item.comment}
                                    onChange={this.handleInputChange}
                                    onBlur={e => this.handleValueChanged(this.state.value)}
                                    className={classes.formControl}
                                    InputProps={{
                                        classes: {
                                            root: classes.inputOutlineRoot,
                                        }
                                    }}
                        />
                        {this.state.condition === ConditionType.Between &&
                        <InputField id="query-item-input-between-div" type="text"
                                    value={this.state.valueTo}
                                    placeholder={item.comment}
                                    onChange={e => this.handleInputChange(e, true)}
                                    onBlur={e => this.handleValueChanged(this.state.valueTo, true)}
                                    className={classes.formControl}
                        />
                        }
                    </div>
                    }
                    {/*DateTime component*/}
                    {item[itemProps.controlTypeKey] === ControlType.DateTime &&
                    <div className={classes.queryItemDiv} id={'query-item-datepicker-div'}>

                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            {/*<Grid container justify="space-around">*/}
                            <React.Fragment>
                                <KeyboardDatePicker
                                    clearable
                                    margin="normal"
                                    inputVariant={'outlined'}
                                    id="mui-pickers-date"
                                    value={this.state.value === undefined ? null : this.state.value}
                                    format={TIME_FORMAT}
                                    onChange={(value) => this.handleValueChanged(value)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    emptyLabel={'Select Data'}
                                />
                                {this.state.condition === ConditionType.Between &&
                                <KeyboardDatePicker
                                    clearable
                                    margin="normal"
                                    id="mui-pickers-date"
                                    inputVariant={'outlined'}
                                    value={this.state.valueTo === undefined ? null : this.state.valueTo}
                                    format={TIME_FORMAT}
                                    onChange={(value) => this.handleValueChanged(value, true)}
                                />
                                }
                            </React.Fragment>
                            {/*</Grid>*/}
                        </MuiPickersUtilsProvider>
                    </div>
                    }

                </div>
            </form>
        );
    }
}

QueryItem.Type = {
    basic: 'basic',
    others: 'others'
};

QueryItem.defaultProps = {
    delItem: () => {
    },
    itemProps: {
        labelKey: 'label',
        controlTypeKey: 'controlType',
        maxLength:'maxLength',
    }
};

QueryItem.propTypes = {
    /**
     *
     */
    operationOptionsProps: PropTypes.shape({
        dataSource: PropTypes.array,
        onChange: PropTypes.func,
        propertyName: PropTypes.string,
        propertyValue: PropTypes.string,
    }),
    /**
     *
     */
    valueOptionsProps: PropTypes.shape({
        dataSource: PropTypes.array,
        onChange: PropTypes.func,
        propertyName: PropTypes.string,
        propertyValue: PropTypes.string,
    }),
    /**
     * state map
     */
    itemProps: PropTypes.shape({
        labelKey: PropTypes.string,
        controlTypeKey: PropTypes.string,
    }),
    item: PropTypes.shape({
        label: PropTypes.string,
        controlType: PropTypes.oneOf([...Object.values(ControlType)]),
        options: PropTypes.array,
        /**
         * if controlType is comBox,select options
         */
        valueOptions: PropTypes.array,
        /**
         * placeholder
         */
        comment: PropTypes.string,
    }),
    /**
     * change item
     */
    updateItem: PropTypes.func,
    /**
     * remove item
     */
    delItem: PropTypes.func,
    /**
     * item type
     */
    type: PropTypes.oneOf(['basic', 'others'])
};

export const QueryItemType = QueryItem.Type;
export default withStyles(styles)(QueryItem);
