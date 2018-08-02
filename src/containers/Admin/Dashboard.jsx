/*
*@desc the container of the Admin dashboard used by REDUX 
*@author Sylvia Onwukwe
*/
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import AdminComponent from '../../Admin/Dashboard/dashboard.jsx';
import dashboardStyle from "../../assets/jss/material-kit-react/views/dashboardStyle.jsx";  
const mapStateToProps = state => ({
  front: state.front
});

const Admin = connect(
  mapStateToProps,
)(AdminComponent);

export default withStyles(dashboardStyle)(Admin);
