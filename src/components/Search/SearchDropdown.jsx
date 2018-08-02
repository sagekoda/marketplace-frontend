/**
 * @description The search dropdown for the sidebar, it's the component responsible for detail search of products in the store.
 * @author Mohammed Odunayo
 * @class SearchDropdown
 * @name SearchDropdown
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem, Checkbox, ListItemText, Avatar, ListItemSecondaryAction } from '../../../node_modules/@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '50%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class SearchDropdown extends React.Component {
  state = {
    expanded: null,
    checkedCategories: [],
    categories: [],
    checkedVendors: [],
    vendors: [],
    checkedBrands: [],
    brands: []
  };

  componentWillReceiveProps(newProps) {
    const { categories, vendors, brands } = newProps.data;
    const { checkedCategories, checkedVendors, checkedBrands } = newProps.filters;
    this.setState({ categories, checkedCategories, vendors, checkedVendors, brands, checkedBrands });
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleChecks = ({type, index}) => {
    const { events } = this.props.filters
    switch(type) {
      case 'categories':
        events.emit('handleCategories', index);
        break;
      case 'vendors':
        events.emit('handleVendors', index);
        break;
      case 'brands':
        events.emit('handleBrands', index);
        break;
      default:
    }
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Categories</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {this.state.categories.map((value, index) => (
                <ListItem key={index} dense button className={classes.listItem} onClick={() => this.handleChecks({type:'categories', index})}>
                  <Avatar alt="Image" src={value.image} />
                  <ListItemText primary={value.name} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      onClick={() => this.handleChecks({type:'categories', index})}
                      checked={this.state.checkedCategories.indexOf(index) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Vendors</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {this.state.vendors.map((value, index) => (
                <ListItem key={index} dense button className={classes.listItem} onClick={() => this.handleChecks({type:'vendors', index})}>
                  <Avatar alt="Image" src={value.image} />
                  <ListItemText primary={value.name} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      onClick={() => this.handleChecks({type:'vendors', index})}
                      checked={this.state.checkedVendors.indexOf(index) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Brands</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              {this.state.brands.map((value, index) => (
                <ListItem key={index} dense button className={classes.listItem} onClick={() => this.handleChecks({type:'brands', index})}>
                  <Avatar alt="Image" style={{height: "auto", borderRadius: "0px"}} src={value.image} />
                  <ListItemText primary={value.name} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      onClick={() => this.handleChecks({type:'brands', index})}
                      checked={this.state.checkedBrands.indexOf(index) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

SearchDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchDropdown);
