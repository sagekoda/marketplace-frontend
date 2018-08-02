/**
 * @description Single Blog Stage section for the blog page.
 * @author Mohammed Odunayo
 * @class SingleBlogStage
 * @name SingleBlogStage
 */

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import basicsStyle from "../../../assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import MinSearch from "../../../components/Search/MinSearch";
import SingleBlog from "../../../components/BlogView/SingleBlog";
import { Hidden } from "../../../../node_modules/@material-ui/core";
import { ViewWeek, Comment } from "@material-ui/icons";
import BlogGrid from "../../../components/BlogView/BlogGrid";
import BlogCategories from "../../../components/Sidebar/BlogCategories";
import BlogComment from "../../../components/BlogView/BlogComment";

class SingleBlogStage extends React.Component {
  
  render() {
    const { classes } = this.props;

    const styles = {
      cols:{
        display: "block",
        marginBottom: "30px"
      },
      container:{
        padding: "0px 30px"
      },
      header:{
        borderBottom: "1px solid lightgray"
      },
      bigMore:{
        float: "right", fontSize: "0.4em"
      },
      smallMore:{
        float: "right",
        fontSize: "0.6em",
        marginTop: "-10px"
      }
    }

    return (
      <div className={classes.sections}>
        <div style={styles.container}>
          <div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={9}>
                <div style={styles.cols}>
                  <MinSearch location="stage"/>
                  <Hidden smDown>
                    <h2 style={styles.header}> Article Title</h2>
                  </Hidden>
                  <Hidden mdUp>
                    <h3 style={styles.header}> Article Title</h3>
                  </Hidden>
                  <SingleBlog />
                  
                  <Hidden smDown>
                    <h2 style={styles.header}><Comment style={{fontSize: "1em"}} /> 3 Comments</h2>
                  </Hidden>
                  <Hidden mdUp>
                    <h3 style={styles.header}><Comment style={{fontSize: "1em"}} /> 3 Comments</h3>
                  </Hidden>
                  <BlogComment />
                  <br/>
                  <Hidden smDown>
                    <h2 style={styles.header}><ViewWeek style={{fontSize: "1em"}} /> Related Post</h2>
                  </Hidden>
                  <Hidden mdUp>
                    <h3 style={styles.header}><ViewWeek style={{fontSize: "1em"}} /> Related Post</h3>
                  </Hidden>
                  <GridContainer justify="center">
                    {[true,true,true,true,true,true].map((item, index) => 
                      <GridItem sm={12} md={6} lg={4} key={index}>
                        <BlogGrid img={item} />
                      </GridItem>
                    )}
                  </GridContainer>
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <div style={styles.cols}>
                  <MinSearch location="sidebar"/>
                  <BlogCategories />
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(SingleBlogStage);
