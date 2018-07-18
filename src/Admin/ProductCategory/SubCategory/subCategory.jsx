//@desc this component displays the list of all product sub categories
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
import Button from "../../../components/CustomButtons/Button.jsx";
import MessagePages from "../../../views/Messages/Pagination.jsx"
import EditSubCategory from "./modalSubCategory.jsx"

class SubCategory extends React.Component{
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
            <h4>Sub Categories</h4>
            <p>
              Showing Product Sub Categories
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[ "#","Category Name","Sub Category", "Url Slug","Edit"]}
              tableData={[
                [ "1","Automobile", "Cars","automobile", <EditSubCategory />],
                [ "2","Automobile","Trucks", "automobile", <EditSubCategory />],
                [ "3","Phones", "Android","phones", <EditSubCategory />],
                [ "4","Utensil","Electrical", "utensil", <EditSubCategory />]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={10}>
      <MessagePages />
      </GridItem>
      <GridItem xs={12} sm={12} md={2}>
      <Button color="primary"> Export </Button>
      </GridItem>
    </Grid>
  );
}
}
export default SubCategory;
