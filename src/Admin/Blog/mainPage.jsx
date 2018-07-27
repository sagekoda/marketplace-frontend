//@desc this is the main blog component on the admin dashboard displaying all blog and blog categories.
//@author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search"
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Snackbar from '@material-ui/core/Snackbar';
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";

const columnData = [
  { id: 'title', numeric: false, disablePadding: true, label: "Title"},
  { id: 'vendor_id', numeric: false, disablePadding: true, label: 'Vendor ID' },
  { id: 'standing', numeric: false, disablePadding: true, label: 'Standing' },
];

const properties = [{name: "title", component: true, padding: true, numeric: false, img: false},
{name: "vendor_id", component: true, padding: true, numeric: false, img: false},
{name: "standing", component: true, padding: true, numeric: false, img: false},
];


class AdminBlog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        blogs: [],
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "",
        deletedBlogs: 0,
    }
  }

  componentDidMount(){
    this.props.fetchBlog();
  }


  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  }

  handleDeleteClick = (blogIDs) => {
    let counter = 0;
    for(const blogID of blogIDs){
      this.props.deleteBlog(blogID);
      counter++;
      if(counter === blogIDs.length){
        let newData = this.state.data.filter( datum =>  blogIDs.indexOf(datum._id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted this blog`
        })
      }
    }
  }

  
  render() {
  const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
  
  return (
    <Grid container>
    <GridItem xs={12} md={10}>
    </GridItem>
    <GridItem xs={6} md={2}>
    <CustomInput
          labelText="Search..."
          id="blog_search"
          primary
          formControlProps={{
              fullWidth: false
          }}
          inputProps={{
              endAdornment: (<InputAdornment position="end"><Search/></InputAdornment>)
          }}
        />
    </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4>All Blogs</h4>
            <p>List of All Blogs</p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Blogs"
              properties={properties}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              itemName={{single : "Blog", plural: "Blogs"}}
            />
          </CardBody>
        </Card>
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={snackBarOpenSuccess}
            onClose={this.onCloseHandlerSuccess}
          >
              <BezopSnackBar
              onClose={this.onCloseHandlerSuccess}
              variant="success"
              message={snackBarMessageSuccess}
              />
            </Snackbar>
      </GridItem>
    </Grid>
  );
}
}

export default AdminBlog;
