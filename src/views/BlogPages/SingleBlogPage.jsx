/**
 * @description The single blog page view.
 * @author Mohammed Odunayo
 * @class SingleBlog
 * @name SingleBlog
 */

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import Parallax from "../../components/Parallax/Parallax.jsx";
import LeftLink from "../../components/Header/LeftLinks.jsx";
import {PageLoader} from "../../components/PageLoader/PageLoader.jsx";

// Sections for this page
import SingleBlogStage from "./Sections/SingleBlogStage.jsx";

class SingleBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: "block"
    };

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  componentDidMount() {
    this.setState(...this.state, {loader: "none"})
  }

  render() {
    const { classes, ...rest } = this.props;
    document.title = "Blog @ Bezop Store || Worlds First Decentralized Store";
    return (
      <div>
        <PageLoader display={this.state.loader} />
        <Header
          brand="Bezop Store"
          rightLinks={<HeaderLinks user={"customer"} />}
          leftLinks={<LeftLink user={"customer"} />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />

        <Parallax style={{height: "400px"}} image={require("../../assets/img/bg4.jpg")}>
          <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)", content: "", display: "block", height: "100%", left: 0, top: 0,
                  position: "absolute", width: "100%"}}></div>
          <div className={classes.container}>
              <GridContainer>
              <GridItem>
                  <div style={{textAlign: "center", color: "#ffffff"}}>
                    <h1 className={classes.title}>Article Title</h1>
                    <h3>
                    Article brief description a short text.
                    </h3>
                  </div>
              </GridItem>
              </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
            <SingleBlogStage />
        </div>
        <Footer />
      </div>
    );
  }
}

export default SingleBlog;
