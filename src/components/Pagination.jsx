import React from 'react';
import {makeStyles,withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    toggleContainer: {
        margin: theme.spacing(2, 0),
    },
}));

const PaginationItem=withStyles(theme=>({
    root:{
        marginRight:theme.spacing(2),
        '&:not(:first-child)':{
            // borderLeft:root.border,
        }
    }
}))(ToggleButton);

export default function Pagination () {
    const [alignment, setAlignment] = React.useState('left');
    const [formats, setFormats] = React.useState(() => ['bold']);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
                <div className={classes.toggleContainer}>
                    <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
                        <PaginationItem value="left">
                            1
                        </PaginationItem>
                        <PaginationItem value="center">
                            2
                        </PaginationItem>
                        <PaginationItem value="right">
                            3
                        </PaginationItem>
                        <PaginationItem value="justify" disabled>
                            4
                        </PaginationItem>
                    </ToggleButtonGroup>
                </div>
            </Grid>
        </Grid>
    );
}

Pagination.defaultProps = {};

Pagination.propTypes = {
    /**
     * current page number
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
     * if true,you can jump to a certain pages directly
     */
    showQuickJumper: PropTypes.bool,
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
     * callback function that page size is changed
     * signature:
     * function(current,size)
     */
    onShowSizeChange:PropTypes.func,





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
    showTotal:PropTypes.func,
    // size,simple
};
