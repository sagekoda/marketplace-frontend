/*
*@desc the admin product container used by REDUX 
*@author Sylvia Onwukwe
*/
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import AdminProductsComponent from '../../Admin/Products/products.jsx';
import { 
  fetchProduct,
  deleteProduct } from "../../actions/actions_admin_product"
  


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
  adminProduct: state.adminProduct
});

const mapDispatchToProps = (dispatch, newProps) => {
  return {
    fetchProduct: () => {
      dispatch(fetchProduct());
    },
    deleteProduct: (productID) => {
      dispatch(deleteProduct(productID));
    }
  }
}

const AdminProducts = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProductsComponent);

export default withStyles(styles)(AdminProducts);
