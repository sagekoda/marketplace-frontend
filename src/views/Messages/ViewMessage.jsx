//@desc This is the message content that pops up when the user clicks 'view' button. It is contained in the ReadMore.jsx component
//@author Sylvia Onwukwe
//co author Odewale Ifeoluwa
import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Note from "@material-ui/icons/Note";
import People from "@material-ui/icons/People";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";

class ViewMessage extends React.Component {
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
    return (
      <div>
          <div>
            <GridContainer justify="center">
              <GridItem>
                <Card>
                  <form>
                  <CardHeader color="primary">
              <h4>View Message</h4>
              <p>From Anne Barley</p>
            </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Sender"
                        id="sender"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: "Anne Barley",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          value: "annebarley@example.com",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Subject"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: "Black Jeans",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Note
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Message Content"
                        id="content"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          value: "The jean sent to me is not pure denim as I saw on the picture and the color is faded",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Note
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
    );
  }
}

export default ViewMessage;
