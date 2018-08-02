//@desc this is the product component on vendor's dashboard
//@author Sylvia Onwukwe
//@co author Odewale Ifeoluwa

import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Table from "../../components/Table/Table.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import Filter from "./filter.jsx";
import AddNew from "./modal";
import AddStock from "./addstock.jsx";
import TableCell from '@material-ui/core/TableCell';

import Snackbar from '@material-ui/core/Snackbar';

import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";


const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Product Name' },
  { id: 'description', numeric: false, disablePadding: true,  label: 'Short Description' },
  { id: 'category', numeric: false, disablePadding: true,  label: 'Category' },
  { id: 'brand', numeric: false, disablePadding: true,  label: 'Brand' },
  { id: 'images',  numeric: false, disablePadding: true,  label: 'Product Images' },
];

const properties = [{name: "name", component: true, padding: true, numeric: false, img: false,},
{name: "description", subname: "short", component: false, padding: false, numeric: false, img: false},
{name: "category", catMain:"main", component: false, padding: false, numeric: false, img: false, catMap: true},
{name: "brand", component: false, padding: false, numeric: false, img: false, brandMap: true}]

const imagePanelView = [ 
   {label:"image_lg|images",
  imgType: "Product Large Image",
    fullWidth: true, 
      width: 1000,
      height:1000
    },
    {
      label:"image_front|images", 
    imgType: "Product Front Image",
    fullWidth: true,
    width: 1000,
    height:1000
    }, 
    {label:"image_back|images",
  imgType: "Product Back Image",
    fullWidth: true, 
      width: 1000,
      height:1000
    }, {label:"image_top|images",
    imgType: "Product Top Image",
    fullWidth: true, 
    width: 1000,
    height:1000
  }, {label:"image_bottom|images",
  imgType: "Product Bottom Image",
    fullWidth: true, 
  width: 1000,
  height:1000
}, {label:"image_right|images",
  imgType: "Product Right Image",
    fullWidth: true, 
width: 1000,
height:1000
}, {
label:"image_left|images",
imgType: "Product Left Image",
fullWidth: true, 
width: 1000,
height:1000
}]

class  Products extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
          product: [],
          data: [],
          categories: [],
          brands: [],
          variantSnackBar: "success",
          snackBarOpenSuccess: false,
          snackBarMessageSuccess: "Yet to decide the action",
          deletedCategory: 0,
      }
  }

  componentDidMount(){
    this.props.fetchProducts();
    this.props.fetchProductBrands();
    this.props.fetchProductCategories();
  }

  componentWillReceiveProps(newProps){
    if(newProps.product.hasOwnProperty('getAll') && typeof newProps.product.getAll === "object"){
      this.setState({
        data: newProps.product.getAll
      })
    }

    if(newProps.product.hasOwnProperty('productCategories') && typeof newProps.product.productCategories === "object"){
      this.setState({
        categories: newProps.product.productCategories,

      })
    }

    if(newProps.product.hasOwnProperty('productBrands') && typeof newProps.product.productBrands === "object"){
      this.setState({
        brands: newProps.product.productBrands
      })
    }

    if(newProps.product.hasOwnProperty('addProduct')){
      if(typeof newProps.product.addProduct === "string"){
        return false;
      }
        //Stringify and parsing all products
      let newProducts = JSON.parse(JSON.stringify(this.state.data));
      //Added the new product as the first element
      newProducts.unshift(newProps.product.addProduct);
      this.setState({
        data: newProducts,
        snackBarOpenSuccess: true,
        variantSnackBar: "success",
        snackBarMessageSuccess: "You have successfully added a new Product",
      })
      
    }

    if(newProps.product.hasOwnProperty('updateProduct')){
      if(typeof newProps.product.updateProduct === "string"){
        this.setState({
          variantSnackBar: "error",
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: newProps.product.updateProduct,
        })
        return false;
      }
      let newProducts = JSON.parse(JSON.stringify(this.state.data));
      let updateProducts;
      updateProducts = newProducts.map( product => {
                if(newProps.product.updateProduct.id === product.id){
                  return newProps.product.updateProduct;
                }else{
                  return product;
                }
            });
      this.setState({
        data: updateProducts,
        snackBarOpenSuccess: true,
        variantSnackBar: "success",
        snackBarMessageSuccess: "You have successfully updated Product",
      })
    }

  }

  editButtonDisplay = (n) =>{
    return (<TableCell>
    {<AddNew 
    type="edit" 
    eachData={n} 
    fetchProductBrands={this.props.fetchProductBrands} fetchProductCategories={this.props.fetchProductCategories}
    fetchProducts={this.props.fetchProducts}
    product={this.props.product}
    putProductDetails={this.props.putProductDetails}/>}
</TableCell>)
  }

  imagePanelDisplay = (n) => {
      return (<TableCell>
                <AddNew
                type="imageUpload"
                imgObj = {imagePanelView}
                eachData = {n}
                postImage={this.props.postImage}
                collection="product"
                product={this.props.product}
              />
              </TableCell> )
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  } 

  handleDeleteClick = (productIDs) => {
    let counter = 0;
    for(const productID of productIDs){
      this.props.deleteProduct(productID);
      counter++;
      if(counter === productIDs.length){
        let newData = this.state.data.filter( datum =>  productIDs.indexOf(datum.id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${counter} ${counter === 1 ? "product" : "products"}`,
        })
      }
    }
  }


  render(){
  const { 
    classes,
    fetchProductBrands,
    fetchProductCategories,
    product,
    fetchProducts,
    postProductDetails,
  } = this.props;
  const {
          data,
          categories,
          brands,
          snackBarMessageSuccess,
          snackBarOpenSuccess,
          variantSnackBar
        } = this.state;


  return (
    <Grid container>
    <GridItem xs={12} md={10}>
    <Filter />
    </GridItem>
    <GridItem xs={6} md={2}>
    <AddNew 
    type="add"
    fetchProductBrands={fetchProductBrands} fetchProductCategories={fetchProductCategories}
    fetchProducts={fetchProducts}
    product={product}
    postProductDetails={postProductDetails}
    />
    </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>All Products</h4>
              <p className={classes.cardCategoryWhite}>List of All Products</p>
          </CardHeader>
          <CardBody>
            <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Products"
              properties={properties}
              categories={categories}
              brands={brands}
              editButton={this.editButtonDisplay}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              imagePanelDisplay={this.imagePanelDisplay}
              product ={product}
              itemName={{single : "Product", plural: "Products"}}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} md={10}>
      <h1 hidden="hidden"> hhh</h1>
      </GridItem>
      <GridItem xs={6} md={2}>
      <AddStock />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Product Stock</h4>
            <p className={classes.cardCategoryWhite}>Manage Product Stock</p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Title","Total Cost", "Quantity", "Description"]}
              tableData={[
                ["1", "First Stock", "$36,738", "300", "My First Stock"]
              ]}
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

export default Products;
