/*
*@desc the product category container used by REDUX 
*@author Sylvia Onwukwe
*/
import { connect } from 'react-redux';
import AdminProductCategoryComponent from '../../Admin/ProductCategory/mainPage.jsx';
import { fetchProductCategories, deleteProductCategory} from "../../actions/actions_admin_productCategory"

const mapStateToProps = state => ({
  adminCategory: state.adminCategory
});
const mapDispatchToProps = (dispatch, newProps) => {
  return {
    fetchProductCategories: () => {
      dispatch(fetchProductCategories());
    },
    deleteProductCategory: (categoryID) => {
      dispatch(deleteProductCategory(categoryID));
    }
  }
}

const AdminProductCategory = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProductCategoryComponent);

export default AdminProductCategory;
