//@desc This is the banner component
//@author Sylvia onwukwe
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import Button from "../../components/CustomButtons/Button"
import BannerSlider from "./bannerslider";
import CardFooter from "../../components/Card/CardFooter";
import BannerImages from "./bannerimages";

function Banners(props) {
  const { classes } = props;
  return (
    <Grid container>
    <GridItem xs={12} md={10}>
    </GridItem>
    <GridItem xs={6} md={2}>
    <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button} color="primary">
          Upload New Banner
        </Button>
      </label>
    </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Store Banners</h4>
            <p className={classes.cardCategoryWhite}>
              Manage Store Banners
            </p>
          </CardHeader>
          <CardBody>
            <BannerSlider />
          </CardBody>
          <CardFooter>
           <BannerImages />
            </CardFooter> 
        </Card>
      </GridItem>
    </Grid>
  );
}

export default Banners;
