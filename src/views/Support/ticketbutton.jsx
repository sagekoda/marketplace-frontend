//@desc This is the modal that pops up when user clicks 'Create Ticket'
//@author Sylvia Onwukwe
//@co author Odewale Ifeoluwa
import React from 'react';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "../../components/CustomButtons/Button.jsx";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";
import CreateTicket from './createticket.jsx';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class TicketButton extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  handleClickOpen = () => {
    this.setState({
      modal: true
    });
  }
  handleClose = () => {
    this.setState({
      modal: false
    });
  }
  render(){
    const { classes } = this.props;
    return (
      <div>
        <Button
        round
          color="primary"
          onClick={this.handleClickOpen}>
          Create Ticket
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
            <CreateTicket />
          </DialogContent>
          <DialogActions>
            <Button color="primary"
              onClick={this.handleClose}
            >
             Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(TicketButton);