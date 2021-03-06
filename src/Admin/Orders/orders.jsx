//@desc this is the Order component on admin's dashboard
//@author Sylvia Onwukwe

import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search"
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Snackbar from '@material-ui/core/Snackbar';
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import Filter from "./filter.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";

import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";


const columnData = [
  { id: 'order_num', numeric: false, disablePadding: true, label: 'Order Number' },
  { id: 'kind', numeric: false, disablePadding: true, label: 'Order Kind' },
  { id: 'customer_id', numeric: false, disablePadding: true,  label: 'Customer ID' },
  { id: 'vendor_id', numeric: false, disablePadding: true,  label: 'Vendor ID' },
  { id: 'tracking_num',  numeric: false, disablePadding: true,  label: 'Tracking Number' },
  { id: 'order_status', numeric: false, disablePadding: true, label: 'Order Status'}
];

const properties = [{name: "order_num", component: true, padding: true, numeric: false, img: false},
{name: "kind", component: false, padding: false, numeric: false, img: false, ucword: true},
{name: "customer_id", component: false, padding: false, numeric: false, img: false},
{name: "vendor_id", component: false, padding: false, numeric: false, img: false},
{name: "tracking_num", component: false, padding: false, numeric: false, img: false},
{name: "order_status", component: false, padding: false, numeric: false, img: false}];

class AdminOrder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        orders: [],
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "",
        deletedCategory: 0,
    }
  }

  componentDidMount(){
    this.props.fetchOrder();
  }

    onCloseHandlerSuccess = () => {
      this.setState({
        snackBarOpenSuccess: false
      })
    }

    handleDeleteClick = (orderIDs) => {
      let counter = 0;
      for(const orderID of orderIDs){
        this.props.deleteOrder(orderID);
        counter++;
        if(counter === orderIDs.length){
          let newData = this.state.data.filter( datum =>  orderIDs.indexOf(datum._id)  === -1) 
          this.setState({
            data: newData,
            snackBarOpenSuccess: true,
            snackBarMessageSuccess: `You have successfully deleted ${counter} order ${counter === 1 ? "order" : "orders"}`
          })
        }
      }
    }

  render () {
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
            <h4 >All Orders</h4>
            <p >
              List of All Orders
            </p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Orders"
              properties={properties}
              editButton={this.editButtonDisplay}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              itemName={{single : "Order", plural: "Orders"}}
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

export default AdminOrder;
