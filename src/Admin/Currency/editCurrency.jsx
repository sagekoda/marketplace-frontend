//@desc this is the edit currency modal
//@author Sylvia Onwukwe
import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
import { withStyles } from '@material-ui/core/styles';
import 'react-select/dist/react-select.css';
import _ from "lodash";


import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import validator from "../../helpers/validator";
import Snackbar from '@material-ui/core/Snackbar';
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import Button from "../../components/CustomButtons/Button.jsx";

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

class EditCurrency extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      storeCurrency: {
        name: this.props.eachData.name,
        description: this.props.eachData.description,
        kind: this.props.eachData.kind,
        code: this.props.eachData.code,
        icon: this.props.eachData.icon
      },
      storeCurrencyError: {
        name:false,
        description: false,
        kind: false,
        code: false,
        icon: false
      },
      selectedCurrencyKind: {value: this.props.eachData.kind, label: this.props.eachData.kind.replace(/^\w/, c => c.toUpperCase())},
      currencyKindSelect: "react-select-label-hidden",
      snackBarOpen: true,
      snackBarMessage: "",
      snackBarOpenSuccess: false,
      
    };
    this.fileInput = React.createRef();
    this.thumbnail = React.createRef();
  }

  //Check the imput Error
  inputErrorValidation(type, value, value2 = null){
    let output = false;
    switch(type){
      case "name":
          output = validator.minStrLen(value, 3);
      break;
      case "kind":
          output = validator.isEmpty(value);
      break;
      case "description":
          output = validator.minStrLen(value, 5);
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
  setStoreCurrency = (type, value) => {
    let newstoreCurrency = JSON.parse(JSON.stringify(this.state.storeCurrency));
    newstoreCurrency[type] = value;
    this.setState({
        storeCurrency: newstoreCurrency,
    });
    this.setStoreCurrencySpecialError(type, value);
  }

  onCloseHandlerSuccess = () => {
    this.setState({ snackBarOpenSuccess: false });
  }


  //Setting the state every fields that have error
  setStoreCurrencySpecialError(type, value, value1 = null){
    let newStoreCurrencyError = JSON.parse(JSON.stringify(this.state.storeCurrencyError));
    newStoreCurrencyError[type] = this.inputErrorValidation(type, value, value1);
    this.setState({
        storeCurrencyError: newStoreCurrencyError
    })
  }
  //Get the value of Input Element
  handleChange =  (event) => {
    this.setStoreCurrency(event.target.name, event.target.value);
  };

  //This handles the country select element
  handleCurrencyKindChange = (selectedCurrencyKind) => {

    this.setState({ selectedCurrencyKind });
    if(selectedCurrencyKind !== null){
      this.setStoreCurrency("kind", selectedCurrencyKind.value);
      this.setState({
        currencyKindSelect: "react-select-label-visible"
      })
    }else{
      this.setState({
        currencyKindSelect: "react-select-label-hidden"
      })
      this.setCurrencySpecialError("kind", "");
    }
  }

  //Create new Category
  updateCurrency = () => {
    this.props.specialMethod(this.state.storeCurrency, this.props.eachData._id);
  }

  componentWillReceiveProps(newProps){
    if(newProps.adminCurrency.hasOwnProperty("updateCurrency") && (_.isEqual(this.props.adminCurrency.updateCurrency, newProps.adminCurrency.updateCurrency) === false)){
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
    const {storeCurrency,
           currencyKindSelect,
           selectedCurrencyKind,
           storeCurrencyError,
           snackBarOpen,
           snackBarMessage,
          } = this.state;

    return (
      <div>
        
        <Card>
            <CardHeader color="info">
              <div>
                <h4>Edit Store Currency</h4>
              </div>
              <div>
                <p>Store Currency Details</p>
              </div>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText={storeCurrencyError.name === false? "Currency Name" : "The Currency name must not be less than 3 characters"}
                    id="name"
                    error={storeCurrencyError.name}
                    inputProps={{
                      value: storeCurrency.name,
                      name:"name",
                      onChange: this.handleChange
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedCurrencyKind" className={currencyKindSelect}>Type or Select Category Kind</InputLabel>
                    <Select2 
                      id="selectedCurrencyKind"
                      name="selectedCurrencyKind"
                      value={selectedCurrencyKind}
                      placeholder="Type or Select Currency Kind"
                      onChange={this.handleCurrencyKindChange}
                      options={[
                        {value: "digital", label: "Digital"},
                        {value: "fiat", label: "Fiat"}
                      ]}
                      className={storeCurrencyError.kind === true ? "select-menu-error": ""}
                      />
                  </FormControl>
                </GridItem>
              </Grid>
              <Grid container>
                <GridItem xs={12}>

                <CustomInput
                    error={storeCurrencyError.description}
                    labelText={storeCurrencyError.description === false ? "Description" : "The length of Currency description must not be less than 5 characters"}
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 1,
                      name: "description",
                      value: storeCurrency.description,
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                
              </Grid>
            </CardBody>
            <CardFooter>
                    <Grid container>
                      <GridItem xs={12}>
                        <Button variant="contained" color="primary" component="span" className={classes.fluidButton} onClick={this.updateCurrency}>
                          Update Store Currency
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

export default withStyles(styles)(EditCurrency);