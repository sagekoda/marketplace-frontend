//@desc this is the add new currency modal
//@author Sylvia Onwukwe
import React from 'react';
// material-ui components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from '@material-ui/core/Snackbar';
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Grid from "@material-ui/core/Grid";
import Select2 from "react-select";

import _ from "lodash";
import 'react-select/dist/react-select.css';
// core components
import Button from "../../components/CustomButtons/Button.jsx";
import validator from "../../helpers/validator";
import CustomInput from "../../components/CustomInput/CustomInput.jsx"

class AddCurrency extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden",
      storeCurrency: {
        name:"",
        description: "",
        kind: "",
        code: "",
        symbol: "",
        exchange: "",
        icon: ""
      },
      storeCurrencyError: {
        name:false,
        description: false,
        kind: false,
        code: false,
        symbol: "",
        exchange: "",
        icon: false
      },
      selectedCurrencyKind: null,
      currencyKindSelect: "react-select-label-hidden",
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
          output = validator.isEmpty(value) || validator.contained(value, ['fiat', 'digital']);
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
  setStoreCurrency = (type, value) => {
    let newstoreCurrency = JSON.parse(JSON.stringify(this.state.storeCurrency));
    newstoreCurrency[type] = value;
    this.setState({
      storeCurrency: newstoreCurrency,
    });

    this.setStoreCurrencySpecialError(type, value);
  }

  //Setting the state every fields that have error
  setStoreCurrencySpecialError(type, value){
    let newValue = value === null ? "" : value;
    let newStoreCurrencyError = JSON.parse(JSON.stringify(this.state.storeCurrencyError));
    newStoreCurrencyError[type] = this.inputErrorValidation(type, newValue);
    this.setState({
      storeCurrencyError: newStoreCurrencyError
    });
    this.changeSubmitButton();
  }

  changeSubmitButton(){
    let newStoreCurrencyError = JSON.parse(JSON.stringify(this.state.storeCurrencyError));
    let newStoreCurrency = JSON.parse(JSON.stringify(this.state.storeCurrency));
    if(!newStoreCurrencyError.name && !newStoreCurrencyError.description && !newStoreCurrencyError.kind){
        if(!validator.isEmpty(newStoreCurrency.name) && !validator.isEmpty(newStoreCurrency.description) && !validator.isEmpty(newStoreCurrency.kind)){
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
    this.setStoreCurrency(event.target.name, event.target.value);
    
  };
  //This handles the currency select element
  handleCurrencyKindChange = (selectedCurrencyKind) => {
    this.setState({ selectedCurrencyKind });
    if(selectedCurrencyKind !== null){
      this.setStoreCurrency("kind", selectedCurrencyKind.value);
      this.setState({
        currencyKindSelect: "react-select-label-visible"
      })
    }else{
      this.setState({
        currencyKindSelect: "react-select-label-hidden",
      })
      this.setStoreCurrency("kind", "")
      this.setStoreCurrencySpecialError("kind", null);
    }
  }

  //Create new Currency
  createNewCurrency = () => {
    let newStoreCurrency = JSON.parse(JSON.stringify(this.state.storeCurrency));
    if(!validator.minStrLen(newStoreCurrency.name, 3) && !validator.minStrLen(newStoreCurrency.description, 15) && !validator.contained(newStoreCurrency.kind, ['fiat', 'digital'])){
      this.props.addStoreCurrency(this.state.storeCurrency);
    }else{
      this.setState({
        snackBarMessage: "All fields are required",
        snackBarOpen: true
      })
    }
    
  }

  componentWillReceiveProps(newProps){
    if(newProps.adminCurrency.hasOwnProperty("addCurrency") && (_.isEqual(this.props.adminCurrency.addCurrency, newProps.adminCurrency.addCurrency) === false)){
        this.setState({
          storeCurrency: {
            name:"",
            description: "",
            kind: "",
            code: "",
            symbol: "",
            exchange: "",
            icon: ""
          },
          snackBarOpenSuccess: true,
          selectedCurrencyKind: null,
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
    console.log(this.props)
    const {storeCurrency,
      currencyKindSelect,
      selectedCurrencyKind,
      storeCurrencyError,
      snackBarOpen,
      snackBarMessage,
      submitButtonDeactive
     } = this.state;
    return (
      <div>
        <Card>
            <CardHeader color="primary">
              <div>
                <h4>Add New Store Currency</h4>
              </div>
              <div>
                <p>All Currencies</p>
              </div>
            </CardHeader>
            <CardBody>
              <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
          <CustomInput
                    labelText={storeCurrencyError.name === false? "Currency Name" : "The length of Currency must not be less than 3 characters"}
                    id="name"
                    error={storeCurrencyError.name}
                    inputProps={{
                      value: storeCurrency.name,
                      name:"name",
                      onChange: this.handleChange
                    }}
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
      
                    <InputLabel htmlFor="selectedCurrencyKind" className={currencyKindSelect}>Type or Select Currency Kind</InputLabel>
                    <Select2 
                      id="selectedCurrencyKind"
                      name="selectedCurrencyKind"
                      value={selectedCurrencyKind}
                      placeholder="Type or Select Currency Kind"
                      onChange={this.handleCurrencyKindChange}
                      options={[
                        {value: "fiat", label: "Fiat"},
                        {value: "digital", label: "Digital"}
                      ]}
                      className={storeCurrencyError.kind === true ? "select-menu-error": ""}
                      />
                
                </GridItem>
                
                
                </Grid>
                <Grid container>
                <GridItem xs={12}>
                <CustomInput
                    error={storeCurrencyError.description}
                    labelText={storeCurrencyError.description === false ? "Description" : "The length of Currency must not be less than 15 characters"}
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "description",
                      onChange: this.handleChange,
                      value: storeCurrency.description,
                    }}
                  />
                </GridItem>
                <CustomInput
                    labelText="Currency Code"
                    id="code"
                    error={storeCurrencyError.code}
                    inputProps={{
                      name:"code",
                      onChange: this.handleChange,
                      value: storeCurrency.code
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                   <CustomInput
                    labelText="Currency Symbol"
                    id="symbol"
                    
                    inputProps={{
                      name:"symbol",
                      onChange: this.handleChange,
                      value: storeCurrency.symbol
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />

                   <CustomInput
                    labelText="Exchange"
                    id="exchange"
                   
                    inputProps={{
                      name:"exchange",
                      onChange: this.handleChange,
                      type: "number",
                      value: storeCurrency.exchange
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </Grid>
            </CardBody>
            <CardFooter>
                    <Grid container>
                      <GridItem xs={12}>
                        <Button variant="contained" color="primary" component="span" disabled={!submitButtonDeactive} onClick={this.createNewCurrency}>
                          Create Currency
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
export default AddCurrency;