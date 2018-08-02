/**
 * 
 * @desc This is the 'product details' form a vendor fills when adding products. 
 * @require This form requires the stepper.jsx(A stepper). It is the first step in adding new products
 * @author Odewale Ifeolwa
 */
import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import _ from "lodash";
import 'react-select/dist/react-select.css';
import Snackbar from '@material-ui/core/Snackbar';

import GridItem from "../../../components/Grid/GridItem.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardFooter from "../../../components/Card/CardFooter.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import validator from "../../../helpers/validator";
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";
import Button from "../../../components/CustomButtons/Button.jsx";

//The component Style
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  input:{
    display: "none"
  },
  fluidButton: {
    ...theme.button,
    width: "100%"
  }
});

class AddBrand extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      brandDetails: {
        name:"",
        description: "",
      },
      brandDetailsError: {
        name:false,
        description: false,
      },
      selectedBrandKind: null,
      brandKindSelect: "react-select-label-hidden",
      snackBarOpen: true,
      snackBarMessage: "",
      submitButtonDeactive: false
      
    };
  }

  //Check the imput Error
  inputErrorValidation(type, value, value2 = null){
    let output = false;
    switch(type){
      case "name":
          output = validator.minStrLen(value, 3);
      break;
      case "description":
          output = validator.minStrLen(value, 15);
      break;
      default:
        output = false;
      break
    }

    return output;
  }

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  //Setting the state of all input feilds
  setBrandDetails = (type, value) => {
    let newbrandDetails = JSON.parse(JSON.stringify(this.state.brandDetails));
    newbrandDetails[type] = value;
    this.setState({
        brandDetails: newbrandDetails,
    });

    this.setBrandDetailsSpecialError(type, value);
  }


  //Setting the state every fields that have error
  setBrandDetailsSpecialError(type, value){
    let newValue = value === null ? "" : value;
    let newBrandDetailsError = JSON.parse(JSON.stringify(this.state.brandDetailsError));
    newBrandDetailsError[type] = this.inputErrorValidation(type, newValue);
    this.setState({
        brandDetailsError: newBrandDetailsError
    });
    this.changeSubmitButton();
  }

  changeSubmitButton(){
    let newBrandDetailsError = JSON.parse(JSON.stringify(this.state.brandDetailsError));
    let newBrandDetails = JSON.parse(JSON.stringify(this.state.brandDetails));
    if(!newBrandDetailsError.name && !newBrandDetailsError.description){
        if(!validator.isEmpty(newBrandDetails.name) && !validator.isEmpty(newBrandDetails.description)){
          this.setState({
            submitButtonDeactive: true
          })
        }else{
          this.setState({
            submitButtonDeactive: false
          })
        }
    }else{
      this.setState({
        submitButtonDeactive: false
      })
    }
  }
  //Get the value of Input Element
  handleChange =  (event) => {
    this.setBrandDetails(event.target.name, event.target.value);
    
  };

  //Create new Brand
  createNewBrand = () => {
    let newBrandDetails = JSON.parse(JSON.stringify(this.state.brandDetails));
    if(!validator.minStrLen(newBrandDetails.name, 3) && !validator.minStrLen(newBrandDetails.description, 15) ){
      this.props.addProductBrand(this.state.brandDetails);
    }else{
      this.setState({
        snackBarMessage: "All fields are required",
        snackBarOpen: true
      })
    }
    
  }


  componentWillReceiveProps(newProps){
    if(newProps.productBrand.hasOwnProperty("addBrand") && (_.isEqual(this.props.productBrand.addBrand, newProps.productBrand.addBrand) === false)){
        this.setState({
          brandDetails: {
            name:"",
            description: "",
          },
          snackBarOpen: false,
        });
        this.props.onHandleModalClose();
    }
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.cardAnimationSetTimeout = setTimeout(
        this.setState({ cardAnimaton: "" }),
      700
    );

  }
  //Clear the slider when moving to another page
  componentWillUnmount(){
    clearTimeout(this.cardAnimationSetTimeout);
  }
  render(){
    const {classes} = this.props;
    const {brandDetails,
           brandDetailsError,
           snackBarOpen,
           snackBarMessage,
           submitButtonDeactive
          } = this.state;
        
          
    return (
      <div>
        
        <Card>
            <CardHeader color="primary">
              <div>
                <h4>Add New Product Brand</h4>
              </div>
              <div>
                <p>Product Brand Details</p>
              </div>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText={brandDetailsError.name === false? "Brand Name" : "The length of Brand must not be less than 3 characters"}
                    id="name"
                    error={brandDetailsError.name}
                    inputProps={{
                      value: brandDetails.name,
                      name:"name",
                      onChange: this.handleChange
                    }}
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  />
                </GridItem>
              </Grid>
              <Grid container>
                <GridItem xs={12}>

                <CustomInput
                    error={brandDetailsError.description}
                    labelText={brandDetailsError.description === false ? "Description" : "The length of Brand must not be less than 15 characters"}
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      name: "description",
                      onChange: this.handleChange,
                      value: brandDetails.description,
                    }}
                  />
                </GridItem>
                
              </Grid>
            </CardBody>
            <CardFooter>
                    <Grid container>
                      <GridItem xs={12}>
                        <Button variant="contained" color="primary" component="span" disabled={!submitButtonDeactive} className={classes.fluidButton} onClick={this.createNewBrand}>
                          Create Product Brand
                        </Button>
                      </GridItem>
                    </Grid>
            </CardFooter>
          </Card>
          <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={snackBarOpen}
            onClose={this.onCloseHandler}
          >
              <BezopSnackBar
              onClose={this.onCloseHandler}
              variant="error"
              message={snackBarMessage}
              />
            </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles)(AddBrand);
