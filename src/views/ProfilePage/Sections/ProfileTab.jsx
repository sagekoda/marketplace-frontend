import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import CustomInput from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButtons/Button';
import Countries from 'country-list';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '../../../../node_modules/@material-ui/core';

function TabContainer(props) {
  return (
    <div style={{ padding: 8 * 3 }}>
      {props.children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0,
    country: "",
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  countryChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    
    return (
      <div className={classes.root}>
        <Paper>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            fullWidth
            scrollButtons="auto"
          >
            <Tab label="Profile" />
            <Tab label="Shipment" />
            <Tab label="Reset Password" />
          </Tabs>
        </Paper>
        {value === 0 && <TabContainer>
            <form>
              <Typography variant={"headline"} align={"left"} >
                Profile Information
              </Typography>
              <GridContainer >
                <GridItem md={12}>
                  <CustomInput
                    labelText="Full Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem md={12}>
                  <CustomInput
                    labelText="Email Address"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem md={12}>
                  <CustomInput
                    labelText="Phone Number"
                    id="tel"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem md={12}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem md={12}>
                  <CustomInput
                    labelText="Wallet Address"
                    id="wallet"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridContainer justify="center">
                  <GridItem
                    xs={10}
                    className={classes.textCenter}
                  >
                    <Button color="primary">Update</Button>
                  </GridItem>
                </GridContainer>
              </GridContainer>
            </form>
        </TabContainer>}
        {value === 1 && <TabContainer>
            <form>
              <Typography variant={"headline"} align={"left"} >
                Shipment Information
              </Typography>
              <GridContainer >
                <GridItem md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="country">Country</InputLabel>
                    <Select
                      value={this.state.country}
                      onChange={this.countryChange}
                      placeholder={"Country"}
                      inputProps={{
                        name: 'country',
                        id: 'country',
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {Countries().getData().map(country => <MenuItem key={country.code} value={country.name.toLowerCase()}>{country.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem md={6}>
                  <CustomInput
                    labelText="State"
                    id="state"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem md={6}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem md={6}>
                  <CustomInput
                    labelText="Street"
                    id="street"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem md={6}>
                  <CustomInput
                    labelText="Building"
                    id="building"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem md={6}>
                  <CustomInput
                    labelText="Zip Code"
                    id="zip"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridContainer justify="center">
                  <GridItem
                    xs={10}
                    className={classes.textCenter}
                  >
                    <Button color="primary">Update</Button>
                  </GridItem>
                </GridContainer>
              </GridContainer>
            </form>
        </TabContainer>}
        {value === 2 && <TabContainer>
          <form>
            <Typography variant={"headline"} align={"left"} >
              Reset Password
            </Typography>
            <GridContainer >
              <GridItem md={12}>
                <CustomInput
                  id="old-password"
                  labelText="Old Password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "password"
                  }}
                />
              </GridItem>
              <GridItem md={6}>
                <CustomInput
                  id="new-password"
                  labelText="New Password"
                  inputProps={{
                    type: "password"
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem md={6}>
                <CustomInput
                  id="confirm-password"
                  labelText="Confirm Password"
                  inputProps={{
                    type: "password"
                  }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridContainer justify="center">
                <GridItem
                  xs={10}
                  className={classes.textCenter}
                >
                  <Button color="primary">Reset Password</Button>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </form>
        </TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);