//@desc this is the the language list modal
//@author Sylvia Onwukwe
import React from 'react';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "../../components/CustomButtons/Button.jsx";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx"
import { InputAdornment } from '../../../node_modules/@material-ui/core';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ViewWord extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  handleClickOpen = () =>  {
    this.setState({
      modal: true
    });
  }
  handleClose = () => {
    this.setState({
      modal: false
    })
  }
  render(){
    const { classes } = this.props;
    return (
      <div>
        <Button
          color="primary"
          round
          onClick={this.handleClickOpen}>
          View All Active Translations
        </Button>
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={this.state.modal}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description">
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}>
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}>
              <Close className={classes.modalClose} />
            </IconButton>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}>
           <GridItem>
                  <form>
                      <CustomInput
                        labelText="Hello"
                        id="Word"
                        formControlProps={{
                          fullWidth: true,
                          required: true
                        }}
                        inputProps={{
                          type: "text",
                        }}
                      />
                      <InputAdornment> Word or Sentence (in Englsih) </InputAdornment>
                        <CustomInput
                        labelText="Bonjour"
                        id="french"
                        formControlProps={{
                          fullWidth: true,
                          required: true
                        }}
                        inputProps={{
                          type: "text",
                        }}
                      />
                       <InputAdornment> French </InputAdornment>
                      <CustomInput
                        labelText="Nǐ hǎo"
                        id="chinese"
                        formControlProps={{
                          fullWidth: true,
                          required: true
                        }}
                        inputProps={{
                          type: "text",
                        }}
                      />
                       <InputAdornment> Chinese) </InputAdornment>
                      <CustomInput
                        labelText="Spanish"
                        id="spanish"
                        formControlProps={{
                          fullWidth: true,
                          required: true
                        }}
                        inputProps={{
                          type: "text",
                        }}
                      />
                      <CustomInput
                        labelText="مرحبا"
                        id="arabic"
                        formControlProps={{
                          fullWidth: true,
                          required: true
                        }}
                        inputProps={{
                          type: "text",
                        }}
                      />
                       <InputAdornment> Arabic </InputAdornment>
            
                        <GridItem>
                      <Button color="primary"> Add </Button>
                      </GridItem>
                      </form>
                      </GridItem>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(ViewWord);