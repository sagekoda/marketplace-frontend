//@desc This is the dashboard the vendor lands on once they log in
//@author Sylvia Onwukwe
//@co author Odewale Ifeoluwa
//@require This page requires ChartistGraph @type0.10.1, Charts.jsx(variables/charts), and dashboardStyle.jsx to display properly
import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import {ShoppingCart,Store,AttachMoney,AddCircle,History,LocalOffer,Update,AccessTime,Loyalty} from "@material-ui/icons";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Table from "../../components/Table/Table.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts";



class Dashboard extends React.Component {
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
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Total Products</p>
                <h3 className={classes.cardTitle}>
                  49
                </h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Danger>
                    <AddCircle />
                  </Danger>
                  <a href="#Products" onClick={e => e.preventDefault()}>
                    Add More Products
                  </a>
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
                <p className={classes.cardCategory}>Total Sold</p>
                <h3 className={classes.cardTitle}>34</h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <History />
                  Sales History
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger">
                <CardIcon color="danger">
                  <AttachMoney />
                </CardIcon>
                <p className={classes.cardCategory}>Total Earnings</p>
                <h3 className={classes.cardTitle}>$75,000</h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Store
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info">
                <CardIcon color="info">
                  <Loyalty />
                </CardIcon>
                <p className={classes.cardCategory}>Used Coupons</p>
                <h3 className={classes.cardTitle}>245</h3>
              </CardHeader>
              <CardFooter>
                <div className={classes.stats}>
                  <Update />
                  From Customers
                </div>
              </CardFooter>
            </Card>
          </GridItem>

        </Grid>
        <Grid container>

        <GridItem xs={12} sm={12} md={4}>
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
                <h4>Daily Sales</h4>
                <p>
                  Increase in Today's Sales
                </p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>
                  <AccessTime /> Updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
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
                <h4>Weekly Sales</h4>
                <p>
                  Increase in Weekly Sales.
                </p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
          
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4>Monthly Sales</h4>
                <p>
                  Monthly Sales Performance
                </p>
              </CardBody>
              <CardFooter>
                <div className={classes.stats}>
                  <AccessTime /> Updated 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
        
        <Grid container>
        <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Orders</h4>
                <p className={classes.cardCategoryWhite}>
                  Orders Overview
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["ID", "Status", "Total"]}
                  tableData={[
                    ["1", "Total", "30"],
                    ["2", "Completed", "23"],
                    ["3", "Pending", "5"],
                    ["4", "Processing", "1"],
                    ["5", "Cancelled", "1"],
                    ["6", "Refunded", "0"],
                    ["7", "On Hold", "0"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Products</h4>
                <p className={classes.cardCategoryWhite}>
                  Products Overview
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["ID", "Status", "Total"]}
                  tableData={[
                    ["1", "Total", "578"],
                    ["2", "Stock", "23"],
                    ["3", "Product Categories", "5"],
                    ["4", "Physical Products", "400"],
                    ["5", "Digital Products", "178"],
                    ["6", "Total Earned", "$75,000"],
                    ["7", "Store Value", "$560,000"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
        
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Dashboard;
