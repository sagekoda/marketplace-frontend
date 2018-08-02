//@desc this is the support component where vendors can view or create tickets to admin
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
import Filter from "./Filter.jsx";
import TicketButton from "./ticketbutton.jsx"



function Support(props) {
  const { classes } = props;
  return (
    <Grid container> 
    <GridItem xs={12} md={10}>
    <Filter />
    </GridItem>
    <GridItem xs={6} md={2}>
    <TicketButton />
    </GridItem>
      <GridItem>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Support Tickets</h4>
            <p className={classes.cardCategoryWhite}>
              List of All Products
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Ticket ID", "Category", "Title", "Status"]}
              tableData={[
                ["Ticket001", "LogOut", "Can't logout as a Vendor","closed"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default Support;
