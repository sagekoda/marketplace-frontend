//@desc this displays the list of registered customers
//@author Sylvia Onwukwe

import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
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
  { id: 'username', numeric: false, disablePadding: true,  label: 'UserName' },
  { id: 'fullname', numeric: false, disablePadding: true,  label: 'Full Name' },
  { id: 'gender', numeric: false, disablePadding: true, label: 'Gender'},
  { id: 'email',  numeric: false, disablePadding: true,  label: 'Email' },
  { id: 'phone', numeric: false, disablePadding: true, label: 'Phone Number'},
  { id: 'country', numeric: false, disablePadding: true, label: 'Country'}
];

const properties = [
{name: "publicAddress", component: false, padding: false, numeric: false, img: false},
{name: "username", component: false, padding: false, numeric: false, img: false},
{name: "fullname", component: false, padding: false, numeric: false, img: false},
{name: "gender", component: false, padding: false, numeric: false, img: false},
{name: "email", component: false, padding: false, numeric: false, img: false},
{name: "phone", component: false, padding: false, numeric: false, img: false},
{name: "country", component: false, padding: false, numeric: false, img: false}];

class AdminCustomers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        customers: [],
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "",
        deletedCategory: 0,
    }
  }  

  componentDidMount(){
    this.props.fetchCustomers();
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  }

  handleDeleteClick = (customerIDs) => {
    let counter = 0;
    for(const customerID of customerIDs){
      this.props.deleteCustomers(customerID);
      counter++;
      if(counter === customerIDs.length){
        let newData = this.state.data.filter( datum =>  customerIDs.indexOf(datum._id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${counter} customer ${counter === 1 ? "customer" : "customers"}`
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
            <h4>All Customers</h4>
            <p>
              List of All Customers
            </p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Customers"
              properties={properties}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              itemName={{single : "Customer", plural: "Customers"}}
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
export default AdminCustomers;
