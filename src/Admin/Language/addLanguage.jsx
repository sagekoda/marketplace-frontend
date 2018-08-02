//@desc this is the add new language modal
//@author Sylvia Onwukwe
import React from 'react';
// material-ui component
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import Snackbar from '@material-ui/core/Snackbar';
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Grid from "@material-ui/core/Grid";

import _ from "lodash";
import 'react-select/dist/react-select.css';
// core components
import Button from "../../components/CustomButtons/Button.jsx";
import validator from "../../helpers/validator";
import CustomInput from "../../components/CustomInput/CustomInput.jsx"

class AddLangauge extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden",
      storeLanguage: {
        word: "",
        english:"",
        french: "",
        bangla: "",
        chinese: "",
        arabic: "",
        spanish: ""
   },
    storeLanguageError: {
      word: false,
      english: false,
      french: false,
      bangla: false,
      chinese: false,
      arabic: false,
      spanish: false
    },
      snackBarOpen: true,
      snackBarOpenSuccess: false,
      snackBarMessage: "",
      submitButtonDeactive: false
      
    };
  }

  //Input Error
  inputErrorValidation (type, value, value2 = null){
    let output = false;
    switch(type){
      case "word":
        output = validator.minStrLen(value, 1);
      break;
      default:
        output = false;
      break
    }
    return output;
  }
  onCloseHandler = () => {
    this.setState ({ snackBarOpen: false});
  }
  onCloseHandlerSuccess = () => {
    this.setState ({ snackBarOpenSuccess: false});
  }
  //Setting the state of all input feilds
  setStoreLanguage = (type, value) => {
    let newstoreLanguage = JSON.parse(JSON.stringify(this.state.storeLanguage));
    newstoreLanguage[type] = value;
    this.setState({
      storeLanguage: newstoreLanguage,
    });
    this.setStoreLanguageSpecialError(type, value);
  }

  //Set the state of every field with error
  setStoreLanguageSpecialError(type, value){
    let newValue = value == null ? "" : value;
    let newStoreLanguageError = JSON.parse(JSON.stringify(this.state.storeLanguageError));
    newStoreLanguageError[type] = this.inputErrorValidation(type, newValue);
    this.setState({
      storeLanguageError: newStoreLanguageError
    });
    this.changeSubmitButton();
  }

  changeSubmitButton(){
    let newStoreLanguageError = JSON.parse(JSON.stringify(this.state.storeLanguageError));
    let newStoreLanguage = JSON.parse(JSON.stringify(this.state.storeLanguage));
    if(!newStoreLanguageError.word){
      if(!validator.isEmpty(newStoreLanguage.word)){
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
    this.setStoreLanguage(event.target.name, event.target.value);
    
  };

  //Create new Language
  createNewLanguage = () => {
    let newStoreLanguage = JSON.parse(JSON.stringify(this.state.storeLanguage));
    console.log(newStoreLanguage)
    if(!validator.minStrLen(newStoreLanguage.word, 1) ){
      this.props.addStoreLanguage(this.state.storeLanguage);
    }else{
      this.setState({
        snackBarMessage: "All fields are required",
        snackBarOpen: false
      })
    }
    
  }

  componentWillReceiveProps(newProps){
    if(newProps.adminLanguage.hasOwnProperty("addLanguage") && (_.isEqual(this.props.adminLanguage.addLanguage, newProps.adminLanguage.addLanguage) === false)){
        this.setState({
          storeLanguage: {
            word: "",
            english:"",
            french: "",
            bangla: "",
            chinese: "",
            arabic: "",
            spanish: ""
          },
          snackBarOpenSuccess: true,
          selectedLanguageKind: null,
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

    const {storeLanguage,
      storeLanguageError,
      snackBarOpen,
      snackBarMessage,
      submitButtonDeactive
     } = this.state;
    return (
      <div>
        <Card>
            <CardHeader color="primary">
              <div>
                <h4>Add New Language</h4>
              </div>
              <div>
                <p>All Language Lists</p>
              </div>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText={storeLanguageError.word === false? "Language Name" : "The length of the word must not be less than 1 character"}
                    id="word"
                    error={storeLanguageError.word}
                    inputProps={{
                      value: storeLanguage.word,
                      name:"word",
                      onChange: this.handleChange
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
          <CustomInput
                    labelText= "English"
                    id="english"
                    inputProps={{
                      value: storeLanguage.english,
                      name:"english",
                      onChange: this.handleChange
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                </Grid>
            </CardBody>
            <CardFooter>
                    <Grid container>
                      <GridItem xs={12}>
                        <Button variant="contained" color="primary" component="span" disabled={!submitButtonDeactive} onClick={this.createNewLanguage}>
                          Create Language
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
export default AddLangauge;