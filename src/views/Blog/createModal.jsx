/**
 * @author Odewale Ifeoluwa
 */
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
import CreateBlog from "./createBlog.jsx";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";
import DialogActions from "@material-ui/core/DialogActions";
import { Grid, Snackbar } from '../../../node_modules/@material-ui/core';
import GridItem from '../../components/Grid/GridItem';
import Validator from '../../helpers/validator';
import BezopSnackBar from '../../assets/jss/bezop-mkr/BezopSnackBar';
import Edit from '@material-ui/icons/Edit';




function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class NewPost extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      blogDetails : this.props.blogDetails,
      snackBarOpen: false,
      snackBarMessage: "",
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

  onCloseHandler = () => {
    this.setState({ snackBarOpen: false });
  }

  setParentBlogDetails = (blogDetails) => {
    this.setState({
      blogDetails: blogDetails
    })
  }


  componentWillReceiveProps(newProps){
    if(Validator.propertyExist(newProps, "blog", "addBlog")){
        if(typeof newProps.blog.addBlog === "string"){
          this.setState({
            snackBarOpen: true,
            snackBarMessage: newProps.blog.addBlog,
          })
            return false;
        }
      
      this.setState({
          blogDetails: this.props.blogDetails
      });
      this.handleClose()

    }

    if(Validator.propertyExist(newProps, "blog", "updateBlog")){
      if(typeof newProps.blog.updateBlog === "string"){
        this.setState({
          snackBarOpen: true,
          snackBarMessage: newProps.blog.updateBlog,
        })
          return false;
      }

    this.handleClose()

  }
  }

  addBlogPost = () => {
    this.props.postBlogDetails(this.state.blogDetails)
  }

  updateBlogPost = () => {
    this.props.putBlogDetails(this.state.blogDetails, this.props.eachData.id)
  }


  render(){
    const { classes, type, blog, blogDetails, eachData} = this.props;
    const {snackBarOpen,snackBarMessage} = this.state;
    let header;
    let content;
    let submitButton;
    switch(type){
      case "add":
        header = (<Button
          color="primary"
          onClick={this.handleClickOpen}>
          Create New Post
        </Button>)
        content=(
          <CreateBlog 
          blogDetails={blogDetails}
          setParentBlogDetails={this.setParentBlogDetails}
          blog={blog}
        />
        )
        submitButton = (<Button variant="contained" color="primary" component="span" style={{width:"100%"}} onClick={this.addBlogPost}>
        Create Blog Post
      </Button>)

      break;
      case "edit":
      header = (<Edit
        color="primary"
        onClick={this.handleClickOpen}/>)
          content=(
            <CreateBlog 
            blogDetails={blogDetails}
            setParentBlogDetails={this.setParentBlogDetails}
            blog={blog}
            eachData={eachData}
          />
          )
          submitButton = (<Button variant="contained" color="primary" component="span" style={{width:"100%"}} onClick={this.updateBlogPost}>
          Update Blog Post
        </Button>)
      break;
      default:
       return false;
    }
    return (
      <div>
        {header}
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
           {content}
          </DialogContent>
          <DialogActions>
          <Grid container>
            <GridItem xs={12}>
              {submitButton}
            </GridItem>
          </Grid>
          </DialogActions>
          <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={snackBarOpen}
            onClose={this.onCloseHandler}
          >
              <BezopSnackBar
              onClose={this.onCloseHandler}
              variant="error"
              message={snackBarMessage}
              />
            </Snackbar>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(NewPost);