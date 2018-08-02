//@desc this component displays the list of active languages
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
import DeleteLanguage from "./removeLanguage.jsx";
import AddLanguage from "./addLanguage.jsx"

class ViewLanguage extends React.Component {
  render () {
 
  return (
    <Grid container>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4>Languages</h4>
            <p>
              Showing Active Languages
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[ "Icon","Language Name", "Action"]}
              tableData={[
                [ "","English", <DeleteLanguage />],
                [ "","French",<DeleteLanguage />],
                [ "","Chinese",<DeleteLanguage />],
                [ "","Spanish",<DeleteLanguage />],
                [ "","Arabic",<DeleteLanguage />]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={10}>
      <MessagePages />
      </GridItem>
      <GridItem xs={12} sm={12} md={2}>
      <AddLanguage />
      </GridItem>
    </Grid>
  );
}
}
export default ViewLanguage;
