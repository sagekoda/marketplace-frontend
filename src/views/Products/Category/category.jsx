/**
 * @desc this is the product component on vendor's dashboard
 * @author Odewale Ifeoluwa
 */

import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../../components/Grid/GridItem.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import AddNewProductCategory from "./categoryModal";
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../../bezopComponents/Table/EnhancedTable";


const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Product Category' },
  { id: 'kind', numeric: false, disablePadding: true, label: 'Category Kind' },
  { id: 'description', numeric: false, disablePadding: true,  label: 'Description' },
  { id: 'icon', numeric: false, disablePadding: true,  label: 'Thumbnail' },
  { id: 'banner',  numeric: false, disablePadding: true,  label: 'Banner' },
];

const properties = [{name: "name", component: true, padding: true, numeric: false, img: false},
{name: "kind", component: false, padding: false, numeric: false, img: false, ucword: true},
{name: "description", component: false, padding: false, numeric: false, img: false},
{name: "icon", component: false, padding: false, numeric: false, img: true, width: 500, height: 500},
{name: "banner", component: false, padding: false, numeric: false, img: true, width: 1024, height: 576}
];


class Category extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "Yet to decide the action",
        deletedCategory: 0,
    }
  }

  componentDidMount(){
    this.props.fetchProductCategories();
    //console.log("working")
  }

  editButtonDisplay = (n) =>{
    return (<TableCell>
    {<AddNewProductCategory type="edit" eachData={n} productCategory={this.props.productCategory}
    categories={this.state.data}
     specialMethod={this.props.putProductCategoryDetails}/>}
</TableCell>)
  }

  componentWillReceiveProps(newProps){
    if(newProps.productCategory.hasOwnProperty("categories")){
        this.setState({
          data: newProps.productCategory.categories
        })
    }

    if(newProps.productCategory.hasOwnProperty("addCategory")){
      let newCategories = JSON.parse(JSON.stringify(this.state.data));
      newCategories.unshift(newProps.productCategory.addCategory);

      this.setState({
        data: newCategories,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully created product category",
      });
    }

    if(newProps.productCategory.hasOwnProperty("updateCategory")){
      let newCategories = JSON.parse(JSON.stringify(this.state.data));
      let updateCategories;
      updateCategories= newCategories.map( category => {
                if(newProps.productCategory.updateCategory.id === category.id){
                  return newProps.productCategory.updateCategory;
                }else{
                  return category;
                }
            });

      this.setState({
        data: updateCategories,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated product category",
      });
    }

    if(newProps.productCategory.hasOwnProperty("updateImage")){
        let newData = this.state.data.map(datum => {
          if(datum.id === newProps.productCategory.updateImage.id){
            return newProps.productCategory.updateImage
          }else{
            return datum
          }
        })
        this.setState({
            data: newData
        })
    }
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  }


  handleDeleteClick = (categoryIDs) => {
    let counter = 0;
    for(const categoryID of categoryIDs){
      this.props.deleteProductCategory(categoryID);
      counter++;
      if(counter === categoryIDs.length){
        let newData = this.state.data.filter( datum =>  categoryIDs.indexOf(datum.id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${counter} product ${counter === 1 ? "category" : "categories"}`,
        })
      }
    }
  }


  render(){
  const { classes, postProductCategoryDetails, productCategory, postImage} = this.props;
  const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
  return (
    <Grid container>
    <GridItem xs={12} md={9}>
    </GridItem>
    <GridItem xs={6} md={3}>
    <AddNewProductCategory 
    productCategory={productCategory}
    categories={data}
    addProductCategory={postProductCategoryDetails} type="add"/>
    </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>All Category</h4>
              <p className={classes.cardCategoryWhite}>List of All Categories</p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Product Category"
              properties={properties}
              editButton={this.editButtonDisplay}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              postImage={postImage}
              collection="category"
              itemName={{single : "Product Category", plural: "Product Categories"}}
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

export default Category;
