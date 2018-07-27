//@desc this displays the list of registered vendors
//@author Sylvia Onwukwe

import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TableCell from '@material-ui/core/TableCell';
import Search from "@material-ui/icons/Search"
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import Snackbar from '@material-ui/core/Snackbar';
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";

const columnData = [
  { id: 'publicAddress', numeric: false, disablePadding: true, label: 'Public Address' },
  { id: 'shop_name', numeric: false, disablePadding: true,  label: 'Shop Name' },
  { id: 'fullname', numeric: false, disablePadding: true,  label: 'Full Name' },
  { id: 'email',  numeric: false, disablePadding: true,  label: 'Email' },
  { id: 'phone', numeric: true, disablePadding: true, label: 'Phone Number'},
  { id: 'country', numeric: false, disablePadding: true, label: 'Country'}
];

const properties = [
{name: "publicAddress", component: false, padding: false, numeric: false, img: false},
{name: "shop_name", component: false, padding: false, numeric: false, img: false},
{name: "fullname", component: false, padding: false, numeric: false, img: false},
{name: "email", component: false, padding: false, numeric: false, img: false},
{name: "phone", component: false, padding: false, numeric: true, img: false},
{name: "country", component: false, padding: false, numeric: false, img: false}];

class Vendors extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        vendors: [],
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "",
        deletedCategory: 0,
    }
  }  

  componentDidMount(){
    this.props.fetchVendors();
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  }

  handleDeleteClick = (vendorIDs) => {
    let counter = 0;
    for(const vendorID of vendorIDs){
      this.props.deleteVendors(vendorID);
      counter++;
      if(counter === vendorIDs.length){
        let newData = this.state.data.filter( datum =>  vendorIDs.indexOf(datum._id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${counter} vendor ${counter === 1 ? "vendor" : "vendors"}`
        })
      }
    }
  }


  render () {
    const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
  return (
    <Grid container>
    <GridItem xs={12} md={10}>
   
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
            <h4>All Vendors</h4>
            <p>
              List of All Vendors
            </p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Vendors"
              properties={properties}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              itemName={{single : "Vendor", plural: "Vendors"}}
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
export default Vendors;
