//@desc this is the product component on admin's dashboard
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
import Filter from "../../views/Products/filter.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Snackbar from '@material-ui/core/Snackbar';
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";

const columnData = [
  { id: 'code', numeric: false, disablePadding: true, label: "Product Code"},
  { id: 'name', numeric: false, disablePadding: true, label: 'Product Name' },
  { id: 'vendor_id', numeric: false, disablePadding: true, label: 'Vendor ID' },
  { id: 'category_id', numeric: false, disablePadding: true, label: 'Category ID' },
  { id: 'brand_id', numeric: false, disablePadding: true, label: 'Brand ID' },
  { id: 'unit_price', numeric: false, disablePadding: true,  label: 'Unit Price' },
];

const properties = [{name: "code", component: true, padding: true, numeric: false, img: false},
{name: "name", component: true, padding: true, numeric: false, img: false},
{name: "vendor_id", component: true, padding: true, numeric: false, img: false},
{name: "category_id", component: true, padding: true, numeric: false, img: false},
{name: "brand_id", component: true, padding: true, numeric: false, img: false},
{name: "unit_price", component: true, padding: true, numeric: false, img: false}];


class AdminProducts extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        products: [],
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "",
        deletedProduct: 0,
    }
  }

  componentDidMount(){
    this.props.fetchProduct();
  }
  

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  }

  handleDeleteClick = (productIDs) => {
    let counter = 0;
    for(const productID of productIDs){
      this.props.deleteProducts(productID);
      counter++;
      if(counter === productIDs.length){
        let newData = this.state.data.filter( datum =>  productIDs.indexOf(datum._id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${counter} product ${counter === 1 ? "product" : "products"}`
        })
      }
    }
  }

  
  render() {
  const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
  
  return (
    <Grid container>
    <GridItem xs={12} md={10}>
    <Filter />
    </GridItem>
    <GridItem xs={6} md={2}>
    <CustomInput
          labelText="Search..."
          id="product_search"
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
            <h4>All Products</h4>
            <p>List of All Products</p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Product"
              properties={properties}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              itemName={{single : "Product", plural: "Products"}}
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

export default AdminProducts;
