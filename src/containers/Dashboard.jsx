/*
*@desc the container of Dashboard Setting used by REDUX 
*@author Odewale Ifeoluwa
*/
import { connect } from 'react-redux';
import dashboardStyle from "../assets/jss/material-kit-react/views/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import DashboardComponent from '../views/Dashboard/Dashboard';

const mapStateToProps = state => ({
  front: state.front
});

const Dashboard = connect(
  mapStateToProps,
)(DashboardComponent);

export default withStyles(dashboardStyle)(Dashboard);
