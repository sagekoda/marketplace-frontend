/*
*@desc the vendor container used by REDUX 
*@author Sylvia Onwukwe
*/
import { connect } from 'react-redux';
import VendorsComponent from '../../Admin/Vendors/vendors.jsx';
import { 
  fetchVendors,
  deleteVendors } from "../../actions/actions_admin_vendor.jsx"

const mapStateToProps = state => ({
  adminVendor: state.adminVendor
});

const mapDispatchToProps = (dispatch, newProps) => {
  return {
    fetchVendors: () => {
      dispatch(fetchVendors());
    },
    deleteVendors: (vendorID) => {
      dispatch(deleteVendors(vendorID));
    }
  }
}

const Vendors = connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorsComponent);

export default Vendors;
