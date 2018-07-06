//desc vendors can set keywords and descriptions for their store
//@author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Notes from "@material-ui/icons/NoteAdd";
import Note from "@material-ui/icons/Note";
// core components;
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";

import loginPageStyle from "../../assets/jss/material-kit-react/views/loginPage.jsx";
class SEO extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.cardAnimation = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  //This is use to stop setTimeout 
  //in case user leave the page before the setTimout occur
  //This prevent memory leakage
  componentWillUnmount(){
    clearTimeout(this.cardAnimation);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem >
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Search Engine Optimization</h4>
                    </CardHeader>
                    <p className={classes.divider}>Increase Your Store Visibility</p>
                    <CardBody>
                      <CustomInput
                        labelText="Keywords"
                        id="keywords"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "textArea",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Notes className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Description"
                        id="description"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "textArea",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Note
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
  
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                    
                    <Button color="primary">Update</Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
    );
  }
}

export default withStyles(loginPageStyle)(SEO);
