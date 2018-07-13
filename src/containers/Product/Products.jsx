/*
*@desc the container of Product Setting used by REDUX 
*@author Odewale Ifeoluwa
*/
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import ProductsComponent from '../../views/Products/products';
import { postProductDetails } from "../../actions/actions_product"


const ProductsStyle = {
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
  product: state.product
});

const mapDispatchToProps = (dispatch, newProps) => {
  return {
    postProductDetails : (productDetails) => {
      dispatch(postProductDetails(productDetails));
    }
  }
}

const Products = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsComponent);

export default withStyles(ProductsStyle)(Products);
