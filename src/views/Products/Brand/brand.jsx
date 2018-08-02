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
import AddNewProductBrand from "./brandModal";
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import BezopSnackBar from "../../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../../bezopComponents/Table/EnhancedTable";


const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Product Brand' },
  { id: 'description', numeric: false, disablePadding: true,  label: 'Description' },
  { id: 'icon', numeric: false, disablePadding: true,  label: 'Thumbnail' },
  { id: 'banner',  numeric: false, disablePadding: true,  label: 'Banner' },
];

const properties = [{name: "name", component: true, padding: true, numeric: false, img: false},
{name: "description", component: false, padding: false, numeric: false, img: false},
{name: "icon", component: false, padding: false, numeric: false, img: true, width: 500, height: 500},
{name: "banner", component: false, padding: false, numeric: false, img: true, width: 1024, height: 576}];


class Brand extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        brands: [],
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "Yet to decide the action",
        deletedBrand: 0,
    }
  }

  componentDidMount(){
    this.props.fetchProductBrands();
  }

  editButtonDisplay = (n) =>{
    return (<TableCell>
    {<AddNewProductBrand type="edit" eachData={n} productBrand={this.props.productBrand} specialMethod={this.props.putProductBrandDetails}/>}
</TableCell>)
  }

  componentWillReceiveProps(newProps){
    if(newProps.productBrand.hasOwnProperty("brands")){
        this.setState({
          data: newProps.productBrand.brands
        })
    }

    if(newProps.productBrand.hasOwnProperty("addBrand")){
      let newBrands = JSON.parse(JSON.stringify(this.state.data));
      newBrands.unshift(newProps.productBrand.addBrand);

      this.setState({
        data: newBrands,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully created product brand"
      });
    }

    if(newProps.productBrand.hasOwnProperty("updateBrand")){
      let newBrands = JSON.parse(JSON.stringify(this.state.data));
      let updateBrands;
      updateBrands = newBrands.map( brand => {
                if(newProps.productBrand.updateBrand.id === brand.id){
                  return newProps.productBrand.updateBrand;
                }else{
                  return brand;
                }
            });

      this.setState({
        data: updateBrands,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated product brand"

      });
    }

    if(newProps.productBrand.hasOwnProperty("updateImage")){
      
      let newData = this.state.data.map(datum => {
        if(datum.id === newProps.productBrand.updateImage.id){
          return newProps.productBrand.updateImage
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


  handleDeleteClick = (brandIDs) => {
    let counter = 0;
    for(const brandID of brandIDs){
      this.props.deleteProductBrand(brandID);
      counter++;
      if(counter === brandIDs.length){
        let newData = this.state.data.filter( datum =>  brandIDs.indexOf(datum.id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${counter} product ${counter === 1 ? "brand" : "brands"}`
        })
      }
    }
  }

  render(){
  const { classes, postProductBrandDetails, productBrand, postImage} = this.props;
  const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;

  //console.log(data);

  return (
    <Grid container>
    <GridItem xs={12} md={9}>
    </GridItem>
    <GridItem xs={6} md={3}>
    <AddNewProductBrand productBrand={productBrand} addProductBrand={postProductBrandDetails} type="add"/>
    </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>All Brand</h4>
              <p className={classes.cardBrandWhite}>List of All Brands</p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Product Brand"
              properties={properties}
                editButton={this.editButtonDisplay}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              collection="brand"
              postImage={postImage}
              itemName={{single : "Product Brand", plural: "Product Brands"}}
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

export default Brand;
