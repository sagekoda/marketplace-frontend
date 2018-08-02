/**
 * @description The search component for the sidebar, it's the component responsible for searching of products in the store.
 * @author Mohammed Odunayo
 * @class MinSearch
 * @name MinSearch
 */

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Hidden, InputAdornment } from "@material-ui/core";
import Search from '@material-ui/icons/Search';
import CustomInput from "../../components/CustomInput/CustomInput.jsx";

const styles = theme => ({
  rootSidebar: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: "-19px",
    fontSize: "2em"
  },
  rootStage: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: "-1px",
    fontSize: "2em"
  },
  header:{
    width: "100%",
    marginBottom: "0px"
  }
});

class MinSearch extends React.Component {

  getByLocation (location, classes) {
    if(location === "sidebar") {
        return(
            <div className={classes.rootSidebar}>
                <Hidden smDown>
                    <h4 className={classes.header}>What are you looking for?</h4>
                    <CustomInput
                        labelText="Search Store"
                        id="search"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment: (<InputAdornment position="end"><Search/></InputAdornment>),
                            type: 'search'
                        }}
                    />
                </Hidden>
            </div>
        );
    }
    if(location === "stage") {
        return(
            <div className={classes.rootStage}>
                <Hidden mdUp>
                    <h3 className={classes.header}>What are you looking for?</h3>
                    <CustomInput
                        labelText="Search Store"
                        id="search"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            endAdornment: (<InputAdornment position="end"><Search/></InputAdornment>),
                            type: 'search'
                        }}
                    />
                </Hidden>
            </div>
        );
    }
    };

    render() {
        const { classes, location } = this.props;

        const search = this.getByLocation(location, classes);
        
        return (
            <div>{search}</div>
        );
    }
}

MinSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MinSearch);