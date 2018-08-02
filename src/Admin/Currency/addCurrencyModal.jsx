//@desc this is the currency modal
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
import Edit from "@material-ui/icons/Edit";
// core components
import Button from "../../components/CustomButtons/Button.jsx";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";
import AddCurrency from "./addCurrency.jsx"
import EditCurrency from "./editCurrency.jsx"


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class NewCurrency extends React.Component{
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
    const { classes, type } = this.props;
    let modalContent;
    let modalTitle;
    switch(type){
      case "add": 
      modalContent  = <AddCurrency onHandleModalClose={this.handleClose} addStoreCurrency={this.props.addStoreCurrency} adminCurrency={this.props.adminCurrency}/>
      modalTitle = (<Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleClickOpen}
                      style={{marginBottom: "10px"}}>
                        Add New Currency
                      </Button>);
    break;
    case "edit":
    modalContent = <EditCurrency onHandleModalClose={this.handleClose} eachData={this.props.eachData} specialMethod={this.props.specialMethod} adminCurrency={this.props.adminCurrency}/>;
    modalTitle = <Edit onClick={this.handleClickOpen} />;
  break;
default:
    modalContent = "";
    modalTitle = ""
  break
}
    return (
      <div>
        {modalTitle}
        <Dialog
        fullScreen={false}
        fullWidth={true}
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
            {modalContent}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(NewCurrency);