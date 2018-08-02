/**
 * @description The Vendor Profile Setup Component.
 * @author Mohammed Odunayo
 * @class ProfileSetup
 * @name ProfileSetup
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import CustomInput from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButtons/Button';
import { Typography } from '../../../../node_modules/@material-ui/core';
import { AccountCircle, FastForward } from "@material-ui/icons";
import {
    validateEmail,
    validateFullName,
    validatePhoneNumber
} from "../../../components/Auth/DataValidation.jsx";
import {getUsersToken} from "../../../components/Auth/AccessControl.jsx";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  error: {
    margin: "0px",
    marginTop: "-15px",
  },
});

const API_URL = (process.env.NODE_ENV === "development")?
    process.env.REACT_APP_DEV_API_URL
    :
    process.env.REACT_APP_PROD_API_URL;

class ProfileSetup extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        fullName: {
            value: "",
            valid: true,
        },
        email: {
            value: "",
            valid: true,
        },
        phoneNumber: {
            value: "",
            valid: true,
        },
        loading: false,
      };
  }

  setValue = event => {
    const value = event.target["value"];
    const field = event.target["id"];
    switch(field){
        case 'fullName':
            this.setState(...this.state, {fullName: {value: value, valid: validateFullName(value)}});
            break;
        case 'email':
            this.setState(...this.state, {email: {value: value, valid: validateEmail(value)}});
            break;
        case 'phoneNumber':
            this.setState(...this.state, {phoneNumber: {value: value, valid: validatePhoneNumber(value)}});
            break;
        default:
    }
  };

  validate = () => {
    const {fullName, email, phoneNumber} = this.state;
    if(!fullName.valid && fullName.value.length === 0) return false;
    if(!email.valid && email.value.length === 0) return false;
    if(!phoneNumber.valid && phoneNumber.value.length === 0) return false;
    return true;
  };

  submit = () => {
    this.setState(...this.state, {loading: true});
    let isValid = this.validate();
    const {email} = this.state;
    const {accessToken} = getUsersToken("vendor");

    if(isValid){
        fetch(`${API_URL}/vendors/verify/email/${email.value}`, {
            headers: {
              "Authorization": "Bearer "+accessToken
            },
            method: "GET"
          })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON.data);
            this.setState(...this.state, {loading: false});
        })
        .catch((ex) => {
            console.log(ex.message)
        });
    } else {
        this.setState(...this.state, {loading: false});
    }
  }

  render() {
    const { classes } = this.props;
    const {fullName, email, phoneNumber, loading} = this.state;

    return (
        <div className={classes.root}>
            <Typography variant={"headline"} align={"center"} >
                <AccountCircle style={{marginBottom: "-10px", fontSize: "1.5em"}} /> Profile Information
            </Typography>
            <GridContainer >
                <GridItem sm={12}>
                    <CustomInput labelText="Full Name" id="fullName"
                    formControlProps={{
                        fullWidth: true,
                        onChange: event => this.setValue(event),
                        required: true,
                    }}
                    />
                    {(!fullName.valid)?
                        <Typography className={classes.error} color="secondary" variant={"caption"}>
                            * Invalid name supplied.
                        </Typography>
                        :
                        null
                    }
                </GridItem>
                <GridItem sm={6}>
                    <CustomInput labelText="Email Address" id="email"
                    formControlProps={{
                        fullWidth: true,
                        onChange: event => this.setValue(event),
                        required: true,
                    }}
                    />
                    {(!email.valid)?
                        <Typography className={classes.error} color="secondary" variant={"caption"}>
                            * Invalid email address.
                        </Typography>
                        :
                        null
                    }
                </GridItem>
                <GridItem sm={6}>
                    <CustomInput labelText="Phone Number" id="phoneNumber"
                    formControlProps={{
                        fullWidth: true,
                        onChange: event => this.setValue(event),
                        required: true,
                    }}
                    />
                    {(!phoneNumber.valid)?
                        <Typography className={classes.error} color="secondary" variant={"caption"}>
                            * Invalid phone number.
                        </Typography>
                        :
                        null
                    }
                </GridItem>
                <GridItem xs={12}>
                    <Button onClick={() => this.submit()} color="primary" disabled={loading}>
                        {(loading)?
                            <span>Loading...<i className={"fas fa-spinner fa-spin"} >&nbsp;</i></span>
                            :
                            <span>Verify Email&nbsp;<FastForward /></span>
                        }
                    </Button>
                </GridItem>
            </GridContainer>
        </div>
    );
  }
}

export default withStyles(styles)(ProfileSetup);