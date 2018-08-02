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

import Edit from "@material-ui/icons/Edit";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "../../components/CustomButtons/Button.jsx";
import AddCoupon from "./createcoupon.jsx";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";
import { Snackbar } from '../../../node_modules/@material-ui/core';
import BezopSnackBar from '../../assets/jss/bezop-mkr/BezopSnackBar';


function Transition(props) {
  return <Slide direction="down" {...props} />;
}



class CreateCoupon extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      couponDetails: this.props.couponDetails,
      snackBarOpenSuccess : false,
      variantSnackBar: "error",
      snackBarMessageSuccess: "SnackBar Messager",
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

  setParentCouponDetails = (couponDetails) => {
    this.setState({
      couponDetails: couponDetails
    })
  }

  handleCreateCoupon = () => {
    this.props.postCouponDetails(this.state.couponDetails);
  }

  handleUpdateCoupon = () => {
    //console.log(this.props.eachData.id)
    this.props.putCouponDetails(this.state.couponDetails,this.props.eachData.id);
  }

  componentWillReceiveProps(newProps){
    //Check if the action is to create coupon
    if(newProps.coupon.hasOwnProperty("addCoupon")){
      //Check if the coupon was created successfuly
        if(typeof newProps.coupon.addCoupon === "string"){
            this.setState({
              snackBarOpenSuccess : true,
              variantSnackBar: "error",
              snackBarMessageSuccess: newProps.coupon.addCoupon,
            })
            return false;
        }
        //Clear the inputted value after creating coupon
        this.setState({
          couponDetails: this.props.couponDetails,
        })
        //Close modal after creating modal
        this.handleClose()

    }

    if(newProps.coupon.hasOwnProperty("updateCoupon")){
      //Check if the coupon was created successfuly
        if(typeof newProps.coupon.updateCoupon === "string"){
            this.setState({
              snackBarOpenSuccess : true,
              variantSnackBar: "error",
              snackBarMessageSuccess: newProps.coupon.updateCoupon,
            })
            return false;
        }
        //Close modal after creating modal
        this.handleClose()

    }
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  } 

  render(){
    console.log(this.state.couponDetails);
    const { classes, coupon } = this.props;
    const {couponDetails,snackBarOpenSuccess,
      variantSnackBar,
      snackBarMessageSuccess} = this.state;
    let header;
    let submitButton;
    switch(this.props.type){
      case "add":
        header = (<Button
          color="primary"
          onClick={this.handleClickOpen}>
          Create New Coupon
        </Button>)

        submitButton = (<Button
          style={{width: "100%"}}
          onClick={this.handleCreateCoupon}
          color="primary">
         Create Discount Coupon
        </Button>);
      break;
      case "edit":
        header =(<Edit onClick={this.handleClickOpen} />)

        submitButton = (<Button
          style={{width: "100%"}}
          onClick={this.handleUpdateCoupon}
          color="primary">
         Update Discount Coupon
        </Button>);
      break;
      default:
        return false
    }
    
    return (
      <div>
        {header}
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
           <AddCoupon  
           setParentCouponDetails={this.setParentCouponDetails}
           couponDetails={couponDetails}
           coupon={coupon}
           
           />
          </DialogContent>
          <DialogActions
            >
            {submitButton}
          </DialogActions>
        </Dialog>
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={snackBarOpenSuccess}
            onClose={this.onCloseHandlerSuccess}
          >
              <BezopSnackBar
              onClose={this.onCloseHandlerSuccess}
              variant={variantSnackBar}
              message={snackBarMessageSuccess}
              />
            </Snackbar>
      </div>
    );
  }
}

export default withStyles(modalStyle)(CreateCoupon);