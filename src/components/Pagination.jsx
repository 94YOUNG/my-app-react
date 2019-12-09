import React, {useEffect, useRef} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
// import CoNumberInput from '../input/number-input';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import {TextField} from '@material-ui/core';
// import InputField from '../input/input-field';
// import {ControlKeyCode} from '@cabis/utility';

const useStyles = makeStyles(theme => ({
    toggleContainer: {
        margin: theme.spacing(1.4375, 0),
        justifyContent:'center',
        display: 'flex',
    },
    disabled: {
        cursor: 'not-allowed',
    },
/*    inputRoot: {
        marginRight: theme.spacing(1.4375),
        display: 'inline',
    },*/
    input: {
        height: 24,
        minWidth: 17,
        textAlign: 'center',
        padding: theme.spacing(0.75, 1)
    },
    notchedOutline: {
        border: 'none',
        paddingLeft: 0,
    },
    inputField: {
        width: 35,
        height: 35,
        backgroundColor: theme.palette.common.white,
        // border: `1px solid ${theme.palette.colors.greyC}`
    },
    totalPage:{
        // width:35,
        display:'inline-flex',
        height:35,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:theme.spacing(0.375),
        marginRight:theme.spacing(1),
    },
    operationIcon:{
        width:35,
    }
}));

const PaginationItem = withStyles(theme => {
    // const {blueE, greyC, blackA} = theme.palette.colors;
    return ({
        root: {
            marginRight: theme.spacing(1),
            minWidth: 35,
            height: 35,
            // border: `1px solid ${greyC}`,
            // color: blackA,
            // backgroundColor: (prop) => (prop.selected ? blueE : theme.palette.common.white),
        },
        /*        disabled:{
                    cursor: 'not-allowed',
                },*/
    });
})(Button);

export default function Pagination (props) {

    const classes = useStyles();

    const {total, pageSize,showQuickJump, maxPerPageNum, className, disabled, defaultCurrent, current, onChange} = props;
    //page num
    const pageTotal = Math.ceil(total / pageSize);

    //current page
    const [currentPage, setCurrentPage] = React.useState(defaultCurrent);
    //input page
    const [inputPage, setInputPage] = React.useState(defaultCurrent);
    //current round
    const [base, setBase] = React.useState(0);

    const [maxPageItemNum, setMaxPageItemNum] = React.useState(maxPerPageNum);

    useEffect(() => {
        setMaxPageItemNum(maxPerPageNum);
    }, [maxPerPageNum]);

    const measuredRef = useRef(null);
    // measuredRef.current.getBoundingClientRect().width / 43
    /*    const measuredRef = useCallback(node => {
            if (node !== null) {
                setMaxPageItemNum(Math.floor(node.getBoundingClientRect().width / 43));
            }
        }, []);*/

    //create disabled status
    /**
     * @desc when argument length equal 1,set all,if 2,set front and back,other set fir pre next last order value
     * @param rest
     * @return disableArr
     */
    function createDisable (...rest) {
        let obj = {};
        switch (rest.length) {
            case 1:
                obj = {
                    fir: rest[0],
                    pre: rest[0],
                    next: rest[0],
                    last: rest[0],
                };
                break;
            case 2:
                obj = {
                    fir: rest[0],
                    pre: rest[0],
                    next: rest[1],
                    last: rest[1],
                };
                break;
            default:
                obj = {
                    fir: rest[0],
                    pre: rest[1],
                    next: rest[2],
                    last: rest[3],
                };
                break;
        }
        return obj;

    }

    const [disableArr, setDisableArr] = React.useState({});
    //control pagination disabled
    useEffect(() => {
        //when prop is disabled,all is disabled
        if (disabled) {
            setDisableArr(createDisable(disabled));
            return;
        }
        /*
            when pageTotal is 0,disabled all
         */
        if (pageTotal === 0 || !pageTotal) {
            setDisableArr(createDisable(true));
        } else {
            switch (currentPage) {
                case 0:
                    if (currentPage === pageTotal - 1) {//pageTotal equal 0
                        setDisableArr(createDisable(true));
                    } else {
                        setDisableArr(createDisable(true, false));
                    }
                    break;
                case pageTotal - 1:
                    setDisableArr(createDisable(false, true));
                    break;
                default:
                    setDisableArr(createDisable(false));
            }
        }
    }, [pageTotal, currentPage, disabled]);

    //watch current prop
    useEffect(() => {
        if (typeof current === 'number') {
            setCurrentPage(current);
        }
    }, [current]);

    /**
     * input logic
     */
    //onChange
    function handleClickPage (currentPage, resetBase) {
        if (0 <= currentPage && currentPage < pageTotal) {
            setCurrentPage(currentPage);
            onChange(currentPage, pageSize);
            if (resetBase !== undefined) {//first or last
                setBase(resetBase);
            } else if (currentPage >= (base + 1) * maxPageItemNum) {
                setBase(base + 1);//next circlr
            } else if (currentPage < base * maxPageItemNum) {
                setBase(base - 1);//pre circle
            }
        }


    }

    //jump page
    function handleJumpPage (e) {
        const page = e.target.value;
        if (page && e.keyCode === 'Enter') {
            handleClickPage(page - 1);
        }
    }

    //handleInputChange
    function handleInputChange (e) {
        setInputPage(e.target.value);
    }

    /**
     * keep input page = current page
     */
    useEffect(() => {
        if(Number.isInteger(pageTotal)&&pageTotal!==0){
            setInputPage(currentPage + 1);
        }else {
            setInputPage(0)
        }
    }, [currentPage]);


    //page item
    function getItems () {
        let renderItems = [];
        for (let i = base * maxPageItemNum; i < pageTotal && i - (base * maxPageItemNum) < maxPageItemNum; i++) {
            renderItems.push(
                <PaginationItem disabled={disabled} id={`page-index-${i}`} key={i} onClick={e => handleClickPage(i)}
                                selected={currentPage === i}
                >
                    {i + 1}
                </PaginationItem>
            )
        }
        return renderItems;
    }

    return (
        <div className={clsx(classes.toggleContainer, className, {
            [classes.disabled]: disabled
        })}
             ref={measuredRef}
        >
            {
                showQuickJump&&getItems()
            }
            <PaginationItem className={classes.operationIcon} value="left" id={'first'} disabled={disableArr.fir} onClick={e => handleClickPage(0, 0)}>
                <svg t="1567664992921" className="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="7946" width="32" height="32"
                     style={{width: 24, height: 24}}
                >
                    <path
                        d="M326 164h-64c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V172c0-4.4-3.6-8-8-8zM770 236.4V164c0-6.8-7.9-10.5-13.1-6.1L335 512l421.9 354.1c5.2 4.4 13.1 0.7 13.1-6.1v-72.4c0-9.4-4.2-18.4-11.4-24.5L459.4 512l299.2-251.1c7.2-6.1 11.4-15.1 11.4-24.5z"
                        p-id="7947" fill="#808495"
                    />
                </svg>
            </PaginationItem>
            <PaginationItem className={classes.operationIcon} value="left" id={'pre'} disabled={disableArr.pre}
                            onClick={e => handleClickPage(currentPage - 1)}
            >
                <svg t="1567666545497" className="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="8710" width="16" height="16"
                     style={{width: 24, height: 24}}
                >
                    <path
                        d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
                        p-id="8711" fill="#808495"
                    />
                </svg>
            </PaginationItem>

            {showQuickJump&&(
            <>
            <TextField
                    // type={'number'}
                    disabled={Number.isNaN(pageTotal)}
                    className={classes.inputField} value={inputPage}
                            InputProps={{classes: {input: classes.input, notchedOutline: classes.notchedOutline}}}
                            onChange={handleInputChange} onKeyUp={handleJumpPage} />
                <span className={classes.totalPage}>
                           /{Number.isNaN(pageTotal)?'0':pageTotal}

                </span>
                </>)}

            {
                !showQuickJump&&getItems()
            }
            <PaginationItem className={classes.operationIcon} value="justify" id={'next'} disabled={disableArr.next}
                            onClick={e => handleClickPage(currentPage + 1)}
            >
                <svg t="1567666486467" className="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="8523" width="32" height="32"
                     style={{width: 24, height: 24}}
                >
                    <path
                        d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"
                        p-id="8524" fill="#808495"
                    />
                </svg>
            </PaginationItem>
            <PaginationItem className={classes.operationIcon} value="justify" id={'last'} disabled={disableArr.last}
                            onClick={e => handleClickPage(pageTotal - 1, Math.ceil(pageTotal / maxPageItemNum) - 1)}
            >
                <svg t="1567665964157" className="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="8302" width="32" height="32"
                     style={{width: 24, height: 24}}
                >
                    <path
                        d="M762 164h-64c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V172c0-4.4-3.6-8-8-8zM254 164v72.4c0 9.5 4.2 18.4 11.4 24.5L564.6 512 265.4 763.1c-7.2 6.1-11.4 15-11.4 24.5V860c0 6.8 7.9 10.5 13.1 6.1L689 512 267.1 157.9c-5.2-4.4-13.1-0.7-13.1 6.1z"
                        p-id="8303" fill="#808495"
                    />
                </svg>
            </PaginationItem>
        </div>

    );
}

Pagination.defaultProps = {
    defaultCurrent: 0,
    maxPerPageNum: 10,
    showQuickJump:true,
};

Pagination.propTypes = {
    /**
     * current page Index,start with 0
     */
    current: PropTypes.number,
    /**
     * default initial pages number
     */
    defaultCurrent: PropTypes.number,
    /**
     * default number of data that per page show
     */
    defaultPageSize: PropTypes.number,
    /**
     * disable Pagination
     */
    disabled: PropTypes.bool,
    /**
     *per page size
     */
    pageSize: PropTypes.number,
    /**
     * the number of the data
     */
    total: PropTypes.number,
    /**
     * callback function of changing current page
     * signature:
     * function(page,pageSize)
     */
    onChange: PropTypes.func,
    /**
     * max page item number
     */
    maxPerPageNum: PropTypes.number,
    /**
     * className to root element
     */
    className: PropTypes.string,

    /*
    temporary don't add prop
     */
    /**
     * callback function that page size is changed
     * signature:
     * function(current,size)
     */
    onShowSizeChange: PropTypes.func,
    /**
     * if true,you can jump to a certain pages directly
     */
    showQuickJumper: PropTypes.bool,

    /**
     * if true,it will hide pagination when the page size is one
     */
    hideOnSinglePage: PropTypes.bool,
    /**
     * control page size of per page
     */
    pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
    /**
     *
     */
    showSizeChanger: PropTypes.bool,
    /**
     * signature:function(total,range)
     */
    showTotal: PropTypes.func,
};
