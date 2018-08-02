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
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import Validator from "../../helpers/validator";

class UserProfile extends React.Component{


  constructor (props){
    super(props);
    this.state = {
      userProfile: {
        fullname : "",
        email: "",
        phone: "",
        address: {
          country:   "",
          state:  "",
          city:  "",
          zip:  "",
          street: "",
          building: "",
        }
      },
      selectedCountry: null,
      countrySelect: "react-select-label-hidden",
      vendorID: "5b50cac169bc14dcf81d401f",
      company: "BEZOP DEMO STORE",
      avatar: `${process.env.REACT_APP_DEV_API_URL}/assets/img/faces/marc.jpg`,
      snackBarMessageSuccess: "",
      snackBarOpenSuccess: false,
      snackBarVariant: "success",
    }
  }



  handleChange = (e) => {
    this.setUserProfile(e.target.name, e.target.value);
  }  

  handleCountryChange = (selectedCountry) => {
    this.setState({ selectedCountry });
    if(selectedCountry !== null){
      this.setUserProfile("country|address", selectedCountry.value);
      this.setState({
        countrySelect: "react-select-label-visible"
      })
    }else{
      this.setState({
        countrySelect: "react-select-label-hidden",
      })
      this.setUserProfile("country|address", "")
    }
  }

  setUserProfile = (type, value) => {
    let names = type.split("|");
    let newUserProfile = JSON.parse(JSON.stringify(this.state.userProfile));
    switch(names.length){
      case 1:
        newUserProfile[names[0]] = value;
      break;
      case 2:
        newUserProfile[names[1]][names[0]] = value;
      break;
      case 3:
        newUserProfile[names[2]][names[1]][names[0]] = value;
      break;
      default:
        return false
    }
    
    this.setState({
      userProfile: newUserProfile,
    });
  }

  componentDidMount(){
    
    this.props.fetchUserProfile(this.state.vendorID);
  }

  updateUserProfile = () => {
    this.props.updatedVendorProfile(this.state.userProfile, this.state.vendorID)
  }

  componentWillReceiveProps(newProps){

    if(newProps.vendorProfile.hasOwnProperty('updateProfile')){
      if(typeof newProps.vendorProfile.updateProfile === "string"){
        this.setState({
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: newProps.vendorProfile.updateProfile,
          snackBarVariant: "error",
        });
        return false;
      }

      let newUserProfile = Object.assign({}, this.state.userProfile, newProps.vendorProfile.updateProfile)
      this.setState({
        userProfile: newUserProfile,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated your profile",
        snackBarVariant: "success",
      });
      
    }

    if(newProps.vendorProfile.hasOwnProperty('getProfile')){

      if(typeof newProps.vendorProfile.getProfile === "string"){
        return false;
      }

      let newUserProfile = JSON.parse(JSON.stringify(this.state.userProfile));
      newUserProfile.fullname = newProps.vendorProfile.getProfile.fullname;
      newUserProfile.email = newProps.vendorProfile.getProfile.email;
      newUserProfile.phone = newProps.vendorProfile.getProfile.phone; 
      newUserProfile.address.country = newProps.vendorProfile.getProfile.address.country;     
      newUserProfile.address.state = newProps.vendorProfile.getProfile.address.state;     
      newUserProfile.address.city = newProps.vendorProfile.getProfile.address.city;     
      newUserProfile.address.zip = newProps.vendorProfile.getProfile.address.zip;     
      newUserProfile.address.street = newProps.vendorProfile.getProfile.address.street;     
      newUserProfile.address.building = newProps.vendorProfile.getProfile.address.building;
        
        this.setState({
          userProfile: newUserProfile,
          selectedCountry: Validator.propertyExist(newUserProfile.address.country, "country", "address") ? {value: newUserProfile.address.country, label: newUserProfile.address.country.replace(/^\w/, c => c.toUpperCase())} : null,
          countrySelect :  `react-select-label-${Validator.propertyExist(newUserProfile.address.country, "country", "address") ? "visible" : "hidden"}`
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
    const {userProfile, selectedCountry, countrySelect, avatar, snackBarMessageSuccess, snackBarOpenSuccess, snackBarVariant} = this.state;
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
                        value : userProfile.address.state,
                        name: "state|address",
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
                        value : userProfile.address.city,
                        name:"city|address",
                        onChange:this.handleChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Zip"
                      id="zip"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps= {{ 
                        value : userProfile.address.zip,
                        name: "zip|address",
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
              variant={snackBarVariant}
              message={snackBarMessageSuccess}
              />
            </Snackbar>
      </div>

    );
  }
}

export default UserProfile;
