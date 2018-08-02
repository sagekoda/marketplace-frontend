//@desc This is the Admin dashboard     
//@author Sylvia Onwukwe
//@require This page requires ChartistGraph @type0.10.1, Charts.jsx(variables/charts), and dashboardStyle.jsx to display properly
import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import { Link } from "react-router-dom";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import {ShoppingCart,Store,AttachMoney,History,AccessTime,ArrowForward, LocalShipping,VerifiedUser,ThumbUp, ContactMail } from "@material-ui/icons";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import {
  dailySalesChart,
  completedTasksChart,
  emailPie,
  regPie
} from "./charts";

import dashboardStyle from "../../assets/jss/material-kit-react/views/dashboardStyle.jsx";

class Admin extends React.Component {
  constructor(props){
    super();
    this.state = {
      value: 0
    };
  }
  render() {
    const { classes } = this.props;
    return (
  
      <div>
        <Grid container>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="primary">
                <CardIcon color="primary">
                <Link to={"/admin/products"}> 
                  <Store />
                </Link>
                </CardIcon>
                <p className={classes.cardCategory}>Total Products</p>
                <Link to={"/admin/products"}> 
                <h3 className={classes.cardTitle}>
                  4999
                </h3>
                </Link>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <ArrowForward />
                  </Danger>
                 <Link to={"/admin/products"}>
                    View All Products
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success">
                <CardIcon color="success">
                  <ShoppingCart />
                </CardIcon>
                <p className={classes.cardCategory}>Orders Pending</p>
                <h3 className={classes.cardTitle}>344</h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <ArrowForward />
                  View All Pending Orders
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger">
                <CardIcon color="danger">
                  <LocalShipping />
                </CardIcon>
                <p className={classes.cardCategory}>Orders Processing</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <ArrowForward />
                  View All Processing Orders
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info">
                <CardIcon color="info">
                  <ThumbUp />
                </CardIcon>
                <p className={classes.cardCategory}>Orders Completed</p>
                <h3 className={classes.cardTitle}>245</h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <ArrowForward />
                  View All Completed Orders
                </div>
              </CardFooter>
            </Card>
          </GridItem>  
 </Grid>
<Grid container>
 <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="primary">
                <CardIcon color="primary">
                  <AttachMoney />
                </CardIcon>
                <p className={classes.cardCategory}>Pending Withdrawals</p>
                <h3 className={classes.cardTitle}>
                  49
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <ArrowForward />
                  </Danger>
                  <a href="#Products" onClick={e => e.preventDefault()}>
                    View All Pending Withdrawals
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success">
                <CardIcon color="success">
                  <VerifiedUser />
                </CardIcon>
                <p className={classes.cardCategory}>Total Customers</p>
                <h3 className={classes.cardTitle}>3400</h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <History />
                  Registered Customers
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger">
                <CardIcon color="danger">
                  <VerifiedUser />
                </CardIcon>
                <p className={classes.cardCategory}>Total Vendors</p>
                <h3 className={classes.cardTitle}>750</h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <History />
                  Registered Vendors
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info">
                <CardIcon color="info">
                  <ContactMail />
                </CardIcon>
                <p className={classes.cardCategory}>Total Subscribers</p>
                <h3 className={classes.cardTitle}>24,545</h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <History />
                  Total Email Subscribers
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          </Grid>



        <Grid container>
              <GridItem xs={12} sm={12} md={6}>
              <Card>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4>Email Subscribers</h4>
                <p>
                  Monthly Email Subscription
                </p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>
                  <AccessTime /> Updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4>Total Products</h4>
                <p>
                  Increase in Monthly Sales.
                </p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>

                 <GridItem xs={12} sm={12} md={6}>
              <Card>
              <CardHeader color="info">
              <ChartistGraph className="ct-chart ct-square" data={emailPie} type="Pie"/>
              </CardHeader>
              <CardBody>
                <h4>Product Category</h4>
                <p>
                  Products in Each Category
                </p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>
                  <AccessTime /> Updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
              <ChartistGraph className="ct-chart ct-square" data={regPie} type="Pie"/>
              </CardHeader>
              <CardBody>
                <h4>Blog Category</h4>
                <p>
                  Blog Posts in Each Category
                </p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        
        </Grid>
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Admin);
