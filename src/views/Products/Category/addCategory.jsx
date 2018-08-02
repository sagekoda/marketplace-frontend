/**
 * 
 * @desc This is the 'product details' form a vendor fills when adding products. 
 * @require This form requires the stepper.jsx(A stepper). It is the first step in adding new products
 * @author Odewale Ifeolwa
 */
import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
import { withStyles } from '@material-ui/core/styles';
import _ from "lodash";
import 'react-select/dist/react-select.css';


import GridItem from "../../../components/Grid/GridItem.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardFooter from "../../../components/Card/CardFooter.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import validator from "../../../helpers/validator";
import Snackbar from '@material-ui/core/Snackbar';
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

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      categoryDetails: {
        name:"",
        description: "",
        parent: "0",
        kind: "",
      },
      categoryDetailsError: {
        name:false,
        description: false,
        parent: false,
        kind: false,
      },
      selectedCategoryKind: null,
      categoryKindSelect: "react-select-label-hidden",
      selectedCategoryParent: null,
      categoryParentSelect: "react-select-label-hidden",
      snackBarOpen: true,
      snackBarOpenSuccess: false,
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
      case "kind":
          output = validator.isEmpty(value) || validator.contained(value, ['physical', 'digital']);
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

  onCloseHandlerSuccess = () => {
    this.setState({ snackBarOpenSuccess: false });
  }

  //Setting the state of all input feilds
  setCategoryDetails = (type, value) => {
    let newcategoryDetails = JSON.parse(JSON.stringify(this.state.categoryDetails));
    newcategoryDetails[type] = value;
    this.setState({
        categoryDetails: newcategoryDetails,
    });

    this.setCategoryDetailsSpecialError(type, value);
  }


  //Setting the state every fields that have error
  setCategoryDetailsSpecialError(type, value){
    let newValue = value === null ? "" : value;
    let newCategoryDetailsError = JSON.parse(JSON.stringify(this.state.categoryDetailsError));
    newCategoryDetailsError[type] = this.inputErrorValidation(type, newValue);
    this.setState({
        categoryDetailsError: newCategoryDetailsError
    });
    this.changeSubmitButton();
  }

  changeSubmitButton(){
    let newCategoryDetailsError = JSON.parse(JSON.stringify(this.state.categoryDetailsError));
    let newCategoryDetails = JSON.parse(JSON.stringify(this.state.categoryDetails));
    if(!newCategoryDetailsError.name && !newCategoryDetailsError.description && !newCategoryDetailsError.kind){
        if(!validator.isEmpty(newCategoryDetails.name) && !validator.isEmpty(newCategoryDetails.description) && !validator.isEmpty(newCategoryDetails.kind)){
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
    this.setCategoryDetails(event.target.name, event.target.value);
    
  };
  //This handles the categoryy select element
  handleCategoryKindChange = (selectedCategoryKind) => {
    this.setState({ selectedCategoryKind });
    if(selectedCategoryKind !== null){
      this.setCategoryDetails("kind", selectedCategoryKind.value);
      this.setState({
        categoryKindSelect: "react-select-label-visible"
      })
    }else{
      this.setState({
        categoryKindSelect: "react-select-label-hidden",
      })
      this.setCategoryDetails("kind", "")
      this.setCategoryDetailsSpecialError("kind", null);
    }
  }

  handleCategoryParentChange = (selectedCategoryParent) => {
    this.setState({ selectedCategoryParent });
    if(selectedCategoryParent !== null){
      this.setCategoryDetails("parent", selectedCategoryParent.value);
      this.setState({
        categoryParentSelect: "react-select-label-visible"
      })
    }else{
      this.setState({
        categoryParentSelect: "react-select-label-hidden",
      })
      this.setCategoryDetails("parent", "0");
    }
  }

  //Create new Category
  createNewCategory = () => {
    let newCategoryDetails = JSON.parse(JSON.stringify(this.state.categoryDetails));
    if(!validator.minStrLen(newCategoryDetails.name, 3) && !validator.minStrLen(newCategoryDetails.description, 15) && !validator.isEmpty(newCategoryDetails.kind) && !validator.contained(newCategoryDetails.kind, ['physical', 'digital'])){
      this.props.addProductCategory(this.state.categoryDetails);
    }else{
      this.setState({
        snackBarMessage: "All fields are required",
        snackBarOpen: true
      })
    }
    
  }


  componentWillReceiveProps(newProps){
    if(newProps.productCategory.hasOwnProperty("addCategory") && (_.isEqual(this.props.productCategory.addCategory, newProps.productCategory.addCategory) === false)){
        this.setState({
          categoryDetails: {
            name:"",
            description: "",
            parent: "0",
            kind: "",
          },
          snackBarOpenSuccess: true,
          selectedCategoryKind: null,
          categoryKindSelect: "react-select-label-hidden",
          selectedCategoryParent: null,
          categoryParentSelect: "react-select-label-hidden",
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
    const {classes, categories} = this.props;
    const {categoryDetails,
           categoryKindSelect,
           selectedCategoryKind,
           categoryParentSelect,
           selectedCategoryParent,
           categoryDetailsError,
           snackBarOpen,
           snackBarMessage,
           submitButtonDeactive
          } = this.state;
    return (
      <div>
        
        <Card>
            <CardHeader color="primary">
              <div>
                <h4>Add New Product Category</h4>
              </div>
              <div>
                <p>Product Category Details</p>
              </div>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={categoryDetailsError.name === false? "Category Name" : "The length of Category must not be less than 3 characters"}
                    id="name"
                    error={categoryDetailsError.name}
                    inputProps={{
                      value: categoryDetails.name,
                      name:"name",
                      onChange: this.handleChange
                    }}
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedCategoryKind" className={categoryKindSelect}>Type or Select Category Kind</InputLabel>
                    <Select2 
                      id="selectedCategoryKind"
                      name="selectedCategoryKind"
                      value={selectedCategoryKind}
                      placeholder="Type or Select Category Kind"
                      onChange={this.handleCategoryKindChange}
                      options={[
                        {value: "digital", label: "Digital"},
                        {value: "physical", label: "Physical"}
                      ]}
                      className={categoryDetailsError.kind === true ? "select-menu-error": null}
                      />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedCategoryParent" className={categoryParentSelect}>Type or Select Parent Category</InputLabel>
                    <Select2 
                      id="selectedCategoryParent"
                      name="selectedCategoryParent"
                      value={selectedCategoryParent}
                      placeholder="Type or Select Parent Category"
                      onChange={this.handleCategoryParentChange}
                      options={categories.map(category => {
                        return {value: category.id, label: category.name}
                      })}
                      />
                  </FormControl>
                </GridItem>
              </Grid>
              <Grid container>
                <GridItem xs={12}>

                <CustomInput
                    error={categoryDetailsError.description}
                    labelText={categoryDetailsError.description === false ? "Description" : "The length of Category must not be less than 15 characters"}
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      name: "description",
                      onChange: this.handleChange,
                      value: categoryDetails.description,
                    }}
                  />
                </GridItem>
                
              </Grid>
            </CardBody>
            <CardFooter>
                    <Grid container>
                      <GridItem xs={12}>
                        <Button variant="contained" color="primary" component="span" disabled={!submitButtonDeactive} className={classes.fluidButton} onClick={this.createNewCategory}>
                          Create Product Category
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

export default withStyles(styles)(AddCategory);
