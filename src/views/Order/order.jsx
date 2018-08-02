//@desc this is the vendor's order component that displays order history 
//@author Sylvia Onwukwe
//@co author Odewale Ifeoluwa
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Table from "../../components/Table/Table.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import ViewOrder from "./vieworder.jsx"

function TableList(props) {
  const { classes } = props;
  return (
    <Grid container>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Orders</h4>
            <p className={classes.cardCategoryWhite}>
              Manage All Your Orders
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Product", "Status", "Action"]}
              tableData={[
                ["SKU 001", "Pillow", "Pending", <ViewOrder />]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default TableList;
