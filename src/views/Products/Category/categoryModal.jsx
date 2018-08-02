import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

//import DialogContentText from '@material-ui/core/DialogContentText';
import Edit from "@material-ui/icons/Edit";
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";

import AddCategory from "./addCategory";
import EditCategory from "./editCategory";


import modalStyle from "../../../assets/jss/material-kit-react/modalStyle.jsx";
import Button from "../../../components/CustomButtons/Button.jsx";



function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CategoryModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render(){
    const { classes, type } = this.props;
    let modalContent;
    let modalTitle;
    switch(type){
      case "add": 
          modalContent  = <AddCategory onHandleModalClose={this.handleClose} addProductCategory={this.props.addProductCategory} productCategory={this.props.productCategory} categories={this.props.categories}/>
          modalTitle = (<Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleClickOpen}
                          style={{marginBottom: "10px"}}>
                            Add New Product Category
                          </Button>);
        break;
      case "edit":
          modalContent = <EditCategory onHandleModalClose={this.handleClose} eachData={this.props.eachData} specialMethod={this.props.specialMethod} productCategory={this.props.productCategory}
          categories={this.props.categories}/>;
          modalTitle = <Edit onClick={this.handleClickOpen} />;
        break;
      default:
          modalContent = "Sorry pnale not available";
          modalTitle = "..Thinking"
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
          open={this.state.open}
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
  
  export default withStyles(modalStyle)(CategoryModal);