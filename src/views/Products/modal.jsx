//@desc this is the modal that pops up when vendor clicks 'Add new product' in product.jsx
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
import ProductStepper from "./stepper.jsx";
import ProductStepperEdit from "./stepperEdit.jsx"
import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";
import ImagePanel from '../../bezopComponents/Images/ImagePanel';
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class AddNew extends React.Component{
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
    const { 
      classes,
      fetchProductBrands,
      fetchProductCategories,
      product,
      postProductDetails,
      putProductDetails,
      type,
    } = this.props;

   let modalButton;
   let modalContent;

   switch(type){
      case "add":
          modalButton = (<Button
              color="primary"
              onClick={this.handleClickOpen}>
              Add New Product
            </Button>)
          modalContent = ( 
          <ProductStepper 
            onCloseModal={this.handleClose}
            fetchProductBrands={fetchProductBrands} fetchProductCategories={fetchProductCategories}
            product={product}
            postProductDetails={postProductDetails}
            modalStatus={this.state.modal}
            />
          )
      break;
      case "edit":
          modalButton = (<Edit onClick={this.handleClickOpen} />)
          modalContent = ( 
          <ProductStepperEdit
            onCloseModal={this.handleClose}
            eachData={this.props.eachData} 
            fetchProductBrands={fetchProductBrands} fetchProductCategories={fetchProductCategories}
            product={product}
            putProductDetails={putProductDetails}
            />)
      break
      case "imageUpload":
          modalButton = (<Button
            color="primary"
            onClick={this.handleClickOpen}>
            Upload Product Images
          </Button>)
          modalContent = (
            
          <ImagePanel
            imgObj = {this.props.imgObj}
            eachData={this.props.eachData}
            collection={this.props.collection}
            postImage={this.props.postImage}
            product={this.props.product}
            />)
      break;
      default:
      break;


   }
    return (
      <div>
        {modalButton}
        <Dialog
        fullScreen={true}
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

export default withStyles(modalStyle)(AddNew);