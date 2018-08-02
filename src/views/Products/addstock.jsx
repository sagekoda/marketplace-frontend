//@desc this is a modal that opens when vendors click 'Create new stock"
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
import CreateStock from "./createstock.jsx"
import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class AddStock extends React.Component{
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
          color="primary"
          onClick={this.handleClickOpen}>
          Create New Stock
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
              onClick={() => this.handleClose("modal")}>
              <Close className={classes.modalClose} />
            </IconButton>
            <h4 className={classes.modalTitle}>Create New Stock</h4>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}>
            <CreateStock />
          </DialogContent>
          <DialogActions
            className={classes.modalFooter +" " +classes.modalFooterCenter}>
            <Button
              onClick={() => this.handleClose("modal")}
              color="primary">
             Create Stock
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(AddStock);