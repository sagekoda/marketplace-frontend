//@desc this component displays all tickets for admin support
//@author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../../components/Grid/GridItem.jsx";
import Table from "../../../components/Table/Table.jsx";
import Card from "../../../components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import MessagePages from "../../../views/Messages/Pagination.jsx";
import ModalTicket from "./modalTicket.jsx"

class SupportTicket extends React.Component{
  render (){

  return (
    <Grid container>
    <GridItem xs={12} md={10}>
    </GridItem>
    <GridItem xs={6} md={2}>
    
    </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 >Contact Forms</h4>
            <p >
              Showing All Forms Submitted On Contact Page
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["#", "Name","Email Address", "Date", "Action"]}
              tableData={[
                ["1","Anna Barley", "admin@example.com", "20-07-2018", <ModalTicket />],
                ["2","Esther Jones", "admin@example.com","17-07-2018", <ModalTicket />],
                ["3", "Kayode Musa", "admin@example.com", "15-07-2018", <ModalTicket />],
                ["4", "Sarah Philips", "admin@example.com","15-07-2018", <ModalTicket />],
                ["5", "Khlondiva Scholum","admin@example.com","13-07-2018", <ModalTicket />],
                ["6", "Anthony Santo","admin@example.com","12-07-2018", <ModalTicket />],
                ["7", "Santiago Diego","admin@example.com","12-07-2018", <ModalTicket />],
                ["8", "Park Min Young", "admin@gmail.com", "12-07-2018", <ModalTicket />]
              ]}
            />
          </CardBody>
        </Card>
        </GridItem>
        <MessagePages />
    </Grid>
  );
}
}
export default SupportTicket;
