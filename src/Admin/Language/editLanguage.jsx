/**
 * 
 * @desc This is the 'edit Language' component on Languages page (Admin Frontend MarketPlace)
 * @author Sylvia Onwukwe
 */
import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import 'react-select/dist/react-select.css';
import _ from "lodash";


import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Snackbar from '@material-ui/core/Snackbar';
import validator from "../../helpers/validator";
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

class EditLanguage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      storeLanguage: {
        word: this.props.eachData.word,
        english: this.props.eachData.english,
        french: this.props.eachData.french,
        bangla: this.props.eachData.bangla,
        chinese: this.props.eachData.chinese,
        arabic: this.props.eachData.arabic,
        spanish: this.props.eachData.spanish,
      },
      storeLanguageError: {
        word:false,
        english: false,
        french: false,
        bangla: false,
        chinese: false,
        arabic: false,
        spanish: false
      },
      snackBarOpen: true,
      snackBarMessage: "",
      snackBarOpenSuccess: false,
      
    };
    this.fileInput = React.createRef();
    this.thumbnail = React.createRef();
  }
  inputErrorValidation(type, value, value2 = null){
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
    this.setState({ snackBarOpen: false });
  }

  //Setting the state of all input feilds
  setStoreLanguage = (type, value) => {
    let newstoreLanguage = JSON.parse(JSON.stringify(this.state.languages));
    newstoreLanguage[type] = value;
    this.setState({
        storeLanguage: newstoreLanguage,
    });
    this.setStoreLanguageSpecialError(type, value);
  }

  onCloseHandlerSuccess = () => {
    this.setState({ snackBarOpenSuccess: false });
  }


  //Setting the state every fields that have error
  setStoreLanguageSpecialError(type, value, value1 = null){
    let newStoreLanguageError = JSON.parse(JSON.stringify(this.state.storeLanguageError));
    newStoreLanguageError[type] = this.inputErrorValidation(type, value, value1);
    this.setState({
        storeLanguageError: newStoreLanguageError
    })
  }
  //Get the value of Input Element
  handleChange =  (event) => {
    this.setStoreLangage(event.target.name, event.target.value);
  };



  //Create new Category
  updateLanguage = () => {
    this.props.specialMethod(this.state.stireLanguage, this.props.eachData._id);
  }

  componentWillReceiveProps(newProps){
    if(newProps.adminLanguage.hasOwnProperty("updateLanguage") && (_.isEqual(this.props.adminLanguage.updateLanguage, newProps.adminLanguage.updateLanguage) === false)){
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
    const {storeLanguage,
           storeLanguageError,
           snackBarOpen,
           snackBarMessage,
          } = this.state;

    return (
      <div>
        
        <Card>
            <CardHeader color="info">
              <div>
                <h4>Edit Language</h4>
              </div>
              <div>
                <p>Language Details</p>
              </div>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    id="word"
                    error={storeLanguageError.word}
                    inputProps={{
                      value: storeLanguage.word,
                      name:"word",
                      onChange: this.handleChange
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                
    
              </Grid>
            </CardBody>
            <CardFooter>
                    <Grid container>
                      <GridItem xs={12}>
                        <Button variant="contained" color="primary" component="span" className={classes.fluidButton} onClick={this.updateLanguage}>
                          Update Product Category
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

export default withStyles(styles)(EditLanguage);
