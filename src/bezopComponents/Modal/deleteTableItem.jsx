import React from 'react';
import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
// @material-ui/icons
import Close from "@material-ui/icons/Close";

import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";
import Button from "../../components/CustomButtons/Button.jsx";


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DeleteTableItemModal extends React.Component {

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
    const { classes, itemName, numberOfItems, onDeleteItem } = this.props;
    return (
      <div>
        <Tooltip title="Delete">
            <IconButton aria-label="Delete">
            <DeleteIcon onClick={this.handleClickOpen}/>
            </IconButton>
        </Tooltip>
        <Dialog
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
            <h4 className={classes.modalTitle}>Delete {numberOfItems === 1 ? itemName.single : itemName.plural}</h4>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}>
            <h5>You are about to delete {numberOfItems} {numberOfItems === 1 ? itemName.single : itemName.plural}</h5>
            
          </DialogContent>
          <DialogActions
            className={classes.modalFooter +" " +classes.modalFooterCenter}>
            <Button color="primary"
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button color="danger"
              onClick={onDeleteItem}
              >
              Delete {numberOfItems} {numberOfItems === 1 ? itemName.single : itemName.plural}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  }
  
  export default withStyles(modalStyle)(DeleteTableItemModal);