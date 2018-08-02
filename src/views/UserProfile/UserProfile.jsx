import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select2 from "react-select";
import FormControl from "@material-ui/core/FormControl";
import countries from "country-list";
import Snackbar from '@material-ui/core/Snackbar';
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardAvatar from "../../components/Card/CardAvatar.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import validator from "../../helpers/validator";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";

class UserProfile extends React.Component{


  constructor (props){
    super(props);
    this.state = {
      userProfile: {
        fullname:"",
        description: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        phone: "",
        email: ""
      },
      userProfileError: {
        fullname: false,
        description: false,
        country: false,
        city: false,
        zip: false,
        phone: false,
        email: false
      },
      selectedCountry: null,
      countrySelect: "react-select-label-hidden",
      vendorID: "5b50cac169bc14dcf81d401f",
      company: "BEZOP DEMO STORE",
      avatar: `${process.env.REACT_APP_DEV_API_URL}/assets/img/faces/marc.jpg`,
      snackBarMessageSuccess: "",
      snackBarOpenSuccess: false,
    }
  }

  //Input Validation
  checkUserProfileValidation = (type, value) => {
    let newUserProfileError = JSON.parse(JSON.stringify(this.state.userProfileError));
    
    switch(type){
      case "fullname":
        newUserProfileError[type] = validator.minStrLen(value, 3);
      break;
      case "description":
        newUserProfileError[type] = validator.minStrLen(value, 15);
      break;
      case "country":
        newUserProfileError[type] = validator.contained(value.replace(/^\w/, c => c.toUpperCase()), countries().getNames());
      break;
      case "city":
        newUserProfileError[type] = validator.minStrLen(value, 3);
      break;
      case "state":
        newUserProfileError[type] = validator.minStrLen(value, 3);
      break;
      case "zip":
        newUserProfileError[type] = validator.minStrLen(value, 2);
      break;
      case "phone":
        newUserProfileError[type] = validator.minStrLen(value, 8);
      break;
      default:
        
      break;
    }

    this.setState({
      userProfileError: newUserProfileError
    })
  }

  handleChange = (e) => {
    this.setUserProfile(e.target.name, e.target.value);
  }  

  handleCountryChange = (selectedCountry) => {
    this.setState({ selectedCountry });
    if(selectedCountry !== null){
      this.setUserProfile("country", selectedCountry.value);
      this.setState({
        countrySelect: "react-select-label-visible"
      })
    }else{
      this.setState({
        countrySelect: "react-select-label-hidden",
      })
      this.setUserProfile("country", "")
    }
  }

  setUserProfile = (type, value) => {
    let newUserProfile = JSON.parse(JSON.stringify(this.state.userProfile));
    newUserProfile[type] = value;
    this.setState({
      userProfile: newUserProfile,
    });

    this.checkUserProfileValidation(type, value);
  }

  componentDidMount(){
    if(this.state.selectedCountry !== null){
      this.setState({
        countrySelect: "react-select-label-visible"
      })
    }else{
      this.setState({
        countrySelect: "react-select-label-hidden",
      })
    }

    this.props.fetchUserProfile(this.state.vendorID);


  }

  updateUserProfile = () => {
    
    this.props.updatedVendorProfile(this.state.userProfile, this.state.vendorID)
  }

  componentWillReceiveProps(newProps){

    if(newProps.vendorProfile.hasOwnProperty('updateProfile')){

      let newUserProfile = Object.assign({}, this.state.userProfile, newProps.vendorProfile.updateProfile)
      this.setState({
        userProfile: newUserProfile,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated your profile"
      });
      
    }

    if(newProps.vendorProfile.hasOwnProperty('getProfile')){
        let newUserProfile = Object.assign({}, this.state.userProfile, newProps.vendorProfile.getProfile)
        
        this.setState({
          userProfile: newUserProfile,
          selectedCountry: {value: newUserProfile.country, label: newUserProfile.country.replace(/^\w/, c => c.toUpperCase())}
        });
      }
    }

  onCloseHandlerSuccess = () =>{
    this.setState({
      snackBarOpenSuccess: false
    })
  }



  render(){
    const { classes } = this.props;
    const {userProfile, selectedCountry, countrySelect, avatar, snackBarMessageSuccess, snackBarOpenSuccess} = this.state;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} >
                    <CustomInput
                      labelText="Fullname"
                      id="fullname"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps= {{ 
                        value : userProfile.fullname,
                        name: "fullname",
                        onChange:this.handleChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps= {{ 
                        value : userProfile.email,
                        name: "email",
                        onChange:this.handleChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl} style={{marginLeft: "0px"}}>
                      <InputLabel htmlFor="selectedCountry" className={countrySelect}>Type or Select Country</InputLabel>
                      <Select2 
                        id="selectedCountry"
                        name="selectedCountry"
                        value={selectedCountry}
                        placeholder="Type or Select Country"
                        onChange={this.handleCountryChange}
                        options={
                          countries().getNames().map(country => {
                            return {value: country.toLowerCase(), label: country}
                          })
                          }
                        className={userProfile.country === true ? "select-menu-error": null}
                        />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="State"
                      id="state"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps= {{ 
                        value : userProfile.state,
                        name: "state",
                        onChange:this.handleChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps= {{ 
                        value : userProfile.city,
                        name:"city",
                        onChange:this.handleChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Zip"
                      id="zip"
                      value={userProfile.zip}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps= {{ 
                        value : userProfile.zip,
                        name: "zip",
                        onChange:this.handleChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Phone Number"
                      id="phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps= {{ 
                        value : userProfile.phone,
                        name: "phone",
                        onChange:this.handleChange
                      }}
                    />
                  </GridItem>
                </Grid>
                
                
                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                    <CustomInput
                      labelText="About me"
                      id="about-me"
                      value={userProfile.description}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        value : userProfile.description,
                        name:"description",
                        onChange:this.handleChange
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.updateUserProfile}>Update Profile</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody>
                <h6 className={classes.cardCategory}>{this.state.company}</h6>
                <h4 className={classes.cardTitle}>{userProfile.fullname}</h4>
                <p className={classes.description}>{userProfile.description}</p>
                <Button color="primary" round>
                  Change Profile Picture
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Manage Password</h4>
                <p className={classes.cardCategoryWhite}>Update Your Password</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem >
                    <CustomInput
                      labelText="Current Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem>
                    <CustomInput
                      labelText="New Password"
                      id="password_new"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Confirm New Password"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                 </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary">Update Password</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={snackBarOpenSuccess}
            onClose={this.onCloseHandlerSuccess}
          >
              <BezopSnackBar
              onClose={this.onCloseHandlerSuccess}
              variant="success"
              message={snackBarMessageSuccess}
              />
            </Snackbar>
      </div>

    );
  }
}

export default UserProfile;
