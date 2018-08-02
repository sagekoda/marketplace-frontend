/*
*@desc the order container used by REDUX 
*@author Sylvia Onwukwe
*/
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import AdminOrderComponent from '../../Admin/Orders/orders.jsx';
import { 
  fetchOrder,
  deleteOrder } from "../../actions/actions_admin_order"


const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "white",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };
  
const mapStateToProps = state => ({
  adminVendor: state.adminVendor
});

const mapDispatchToProps = (dispatch, newProps) => {
  return {
    fetchOrder: () => {
      dispatch(fetchOrder());
    },
    deleteOrder: (orderID) => {
      dispatch(deleteOrder(orderID));
    }
  }
}


const AdminOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminOrderComponent);

export default withStyles(styles)(AdminOrder);
