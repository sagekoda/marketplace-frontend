/**
 * @desc this component displays the list of the blog posts from a vendor
 * @author Odewale Ifeoluwa
 */
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import NewPost from "./createModal"
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
import Validator from "../../helpers/validator";
import { Snackbar, TableCell } from "../../../node_modules/@material-ui/core";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";

const columnData = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Blog Title' },
  { id: 'kind', numeric: false, disablePadding: true, label: 'Blog Kind' },
  { id: 'summary', numeric: false, disablePadding: true,  label: 'Blog Summary' },
  { id: 'image', numeric: false, disablePadding: true,  label: 'Featured Image' },
];

const properties = [{name: "title", component: true, padding: true, numeric: false},
{name: "kind", component: false, padding: false, numeric: false},
{name: "summary", component: false, padding: false, numeric: false},
{name: "image", component: false, padding: false, numeric: false, imgArr: true, width: 1024, height: 576, widthSize: "200px"}
];

const blogDetails = {
  kind: "",
  title: "",
  summary: "",
  content: "",
  tag: [],
}

class Blog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      snackBarOpenSuccess: false,
      variantSnackBar: "success",
      snackBarMessageSuccess: "SnackBar message",
    }
  }

  onCloseHandlerSuccess = () => {
    this.setState({ snackBarOpenSuccess: false });
  }

  componentDidMount(){
    this.props.fetchBlogs();
  }

  componentWillReceiveProps(newProps){
    if(Validator.propertyExist(newProps, "blog", "getBlog")){
        if(typeof newProps.blog.getBlog === "string"){
            return false;
        }
        this.setState({
          data: newProps.blog.getBlog
        })
    }

    if(Validator.propertyExist(newProps, "blog", "addBlog")){
      if(typeof newProps.blog.addBlog === "string"){
          return false;
      }
      
        //Stringify and parsing all blogs
        let newBlogs = JSON.parse(JSON.stringify(this.state.data));
        //Added the new blog as the first element
        newBlogs.unshift(newProps.blog.addBlog);
        this.setState({
          data: newBlogs,
          snackBarOpenSuccess: true,
          variantSnackBar: "success",
          snackBarMessageSuccess: "You have successfully added a new Blog",
        })
    }

    if(Validator.propertyExist(newProps, "blog", "updateBlog")){
      if(typeof newProps.blog.updateBlog === "string"){
          return false;
      }
      
        //Stringify and parsing all blogs
        let updatedBlogs = JSON.parse(JSON.stringify(this.state.data));
        //Added the new blog as the first element
        updatedBlogs.map(blog => {
            if(newProps.blog.updateBlog.id === blog.id){
                return newProps.blog.updateBlog;
            }else{
                return blog;
            }
        });
        this.setState({
          data: updatedBlogs,
          snackBarOpenSuccess: true,
          variantSnackBar: "success",
          snackBarMessageSuccess: "You have successfully updated the Blog",
        })
    }

    if(newProps.blog.hasOwnProperty("updateImage")){
      if(typeof newProps.blog.hasOwnProperty("updateImage") === "string"){
        this.setState({
          snackBarOpenSuccess: true,
          variantSnackBar: "error",
          snackBarMessageSuccess: "There was an error uploading the image",
        })
        return false;
      }
      
      let newData = this.state.data.map(datum => {
        if(datum.id === newProps.blog.updateImage.id){
          return newProps.blog.updateImage
        }else{
          return datum
        }
      })
      this.setState({
          data: newData
      })
  }

}

editButtonDisplay = (n) => {
  let updatedBlog = {
    kind: n.kind,
    title: n.title,
    summary: n.summary,
    content: n.content,
    tag: Validator.propertyExist(n, "tag") ? n.tag :  [],
  }
  return (<TableCell>
  <NewPost
  type="edit"
  putBlogDetails={this.props.putBlogDetails}
  blog={this.props.blog}
  eachData={n}
  blogDetails={updatedBlog}
/>
</TableCell>)
}

handleDeleteClick = (blogIDs) => {
  let counter = 0;
  for(const blogID of blogIDs){
    this.props.deleteBlog(blogID);
    counter++;
    if(counter === blogIDs.length){
      let newData = this.state.data.filter( datum =>  blogIDs.indexOf(datum.id)  === -1) 
      this.setState({
        data: newData,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: `You have successfully deleted ${counter} ${counter === 1 ? "blog" : "blogs"}`,
      })
    }
  }
}
render () {
 const {data,snackBarOpenSuccess,variantSnackBar,snackBarMessageSuccess } = this.state;
 const {postBlogDetails, blog, postImage} = this.props;
  return (
    <Grid container>
    <GridItem xs={12} md={10}>
    </GridItem>
    <GridItem xs={6} md={2}>
        <NewPost
          type="add"
          postBlogDetails={postBlogDetails}
          blog={blog}
          blogDetails={blogDetails}
        />
    </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4>Blog Posts</h4>
            <p>
              View Blog Post
            </p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
                 orderBy="title"
                 columnData={columnData}
                 data={data}
                 tableTitle="All Blog Post"
                 properties={properties}
                 editButton={this.editButtonDisplay}
                 onDeleteClickSpec={this.handleDeleteClick}
                 currentSelected = {[]}
                 collection="blog"
                 postImage={postImage}
                 itemName={{single : "Blog", plural: "Blogs"}}
              />
          </CardBody>
        </Card>
      </GridItem>
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
    </Grid>
  );
}
}
export default Blog;
