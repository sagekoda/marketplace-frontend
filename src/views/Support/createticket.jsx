//@desc Tickets are created here once vendor clicks 'Create Ticket' and delivers to Admin
//@author Sylvia Onwukwe
//@co author Odewale Ifeoluwa
import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Note from "@material-ui/icons/Note";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";

class CreateTicket extends React.Component {
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
              <h4>Support Ticket</h4>
              <p>Create A New Support Ticket</p>
            </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Subject"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
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

export default CreateTicket;
