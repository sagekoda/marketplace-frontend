//@desc this is the admin's profile
//@author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import countries from "country-list";
import Snackbar from '@material-ui/core/Snackbar';
import InputLabel from "@material-ui/core/InputLabel";
import Select2 from "react-select";
import FormControl from "@material-ui/core/FormControl";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import validator from "../../helpers/validator";
import CardFooter from "../../components/Card/CardFooter.jsx";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import CardAvatar from "../../components/Card/CardAvatar.jsx";

class AdminProfile extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      adminProfile: {
        fullname:"",
        description: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        phone: "",
        email: ""
      },
      adminProfileError: {
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
      adminID: "5b50cac169bc14dcf81d401f",
      company: "BEZOP DEMO STORE",
      avatar: `${process.env.REACT_APP_DEV_API_URL}/assets/img/faces/marc.jpg`,
      snackBarMessageSuccess: "",
      snackBarOpenSuccess: false,
    }
  }
  //Input Validation
  checkAdminProfileValidation = (type, value) => {
    let newAdminProfileError = JSON.parse(JSON.stringify(this.state.adminProfileError));
    
    switch(type){
      case "fullname":
        newAdminProfileError[type] = validator.minStrLen(value, 3);
      break;
      case "description":
        newAdminProfileError[type] = validator.minStrLen(value, 15);
      break;
      case "country":
        newAdminProfileError[type] = validator.contained(value.replace(/^\w/, c => c.toUpperCase()), countries().getNames());
      break;
      case "city":
        newAdminProfileError[type] = validator.minStrLen(value, 3);
      break;
      case "state":
        newAdminProfileError[type] = validator.minStrLen(value, 3);
      break;
      case "zip":
        newAdminProfileError[type] = validator.minStrLen(value, 2);
      break;
      case "phone":
        newAdminProfileError[type] = validator.minStrLen(value, 8);
      break;
      default:
        
      break;
    }

    this.setState({
      adminProfileError: newAdminProfileError
    })
  }

  handleChange = (e) => {
    this.setAdminProfile(e.target.name, e.target.value);
  }  

  handleCountryChange = (selectedCountry) => {
    this.setState({ selectedCountry });
    if(selectedCountry !== null){
      this.setAdminProfile("country", selectedCountry.value);
      this.setState({
        countrySelect: "react-select-label-visible"
      })
    }else{
      this.setState({
        countrySelect: "react-select-label-hidden",
      })
      this.setAdminProfile("country", "")
    }
  }

  setAdminProfile = (type, value) => {
    let newAdminProfile = JSON.parse(JSON.stringify(this.state.adminProfile));
    newAdminProfile[type] = value;
    this.setState({
      adminProfile: newAdminProfile,
    });

    this.checkAdminProfileValidation(type, value);
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

    this.props.fetchAdminProfile(this.state.adminID);


  }

  updateAdminProfile = () => {
    
    this.props.updatedAdminProfile(this.state.adminProfile, this.state.adminID)
  }

  componentWillReceiveProps(newProps){

    if(newProps.adminProfile.hasOwnProperty('updateProfile')){

      let newAdminProfile = Object.assign({}, this.state.adminProfile, newProps.adminProfile.updateProfile)
      this.setState({
        adminProfile: newAdminProfile,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated your profile"
      });
      
    }

    if(newProps.adminProfile.hasOwnProperty('getProfile')){
        let newAdminProfile = Object.assign({}, this.state.adminProfile, newProps.adminProfile.getProfile)
        
        this.setState({
          adminProfile: newAdminProfile,
          selectedCountry: {value: newAdminProfile.country, label: newAdminProfile.country.replace(/^\w/, c => c.toUpperCase())}
        });
      }
    }

  onCloseHandlerSuccess = () =>{
    this.setState({
      snackBarOpenSuccess: false
    })
  }

  render () {
    const { classes } = this.props;
    const {adminProfile, selectedCountry, countrySelect, avatar, snackBarMessageSuccess, snackBarOpenSuccess} = this.state;
  return (
    <div>
      <Grid container>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4>Edit Profile</h4>
              <p>Complete your profile</p>
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
                        value : adminProfile.fullname,
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
                        value : adminProfile.email,
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
                        className={adminProfile.country === true ? "select-menu-error": null}
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
                        value : adminProfile.state,
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
                        value : adminProfile.city,
                        name:"city",
                        onChange:this.handleChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Zip"
                      id="zip"
                      value={adminProfile.zip}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps= {{ 
                        value : adminProfile.zip,
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
                        value : adminProfile.phone,
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
                      value={adminProfile.description}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        value : adminProfile.description,
                        name:"description",
                        onChange:this.handleChange
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.updateAdminProfile}>Update Profile</Button>
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
                <h4 className={classes.cardTitle}>{adminProfile.fullname}</h4>
                <p className={classes.description}>{adminProfile.description}</p>
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
export default AdminProfile;
