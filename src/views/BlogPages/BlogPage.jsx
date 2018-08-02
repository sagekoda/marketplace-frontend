/**
 * @description The blog page view.
 * @author Mohammed Odunayo
 * @class Blog
 * @name Blog
 */

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import Parallax from "../../components/Parallax/Parallax.jsx";
import LeftLink from "../../components/Header/LeftLinks.jsx";
import {PageLoader} from "../../components/PageLoader/PageLoader.jsx";
import BlogStage from "./Sections/BlogStage";

// Sections for this page

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: "block",
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

        <Parallax style={{height: "400px"}} image="https://images.pexels.com/photos/459688/pexels-photo-459688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
          <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)", content: "", display: "block", height: "100%", left: 0, top: 0,
                  position: "absolute", width: "100%"}}></div>
          <div className={classes.container}>
              <GridContainer>
              <GridItem>
                  <div style={{textAlign: "center", color: "#ffffff"}}>
                    <h1 className={classes.title}>Blog</h1>
                    <h3>
                    Share what's on your mind with others.
                    </h3>
                  </div>
              </GridItem>
              </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
            <BlogStage />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Blog;
