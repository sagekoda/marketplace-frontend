/**
 * @description The brand page view.
 * @author Mohammed Odunayo
 * @class Brand
 * @name Brand
 */

import React from "react";
import classNames from "classnames";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import LeftLink from "../../components/Header/LeftLinks.jsx";
import Stage from "./Sections/Stage.jsx";
import Parallax from "../../components/Parallax/Parallax.jsx";
import {getBrands} from "../../actions/actions_front.jsx";
import {PageLoader} from "../../components/PageLoader/PageLoader.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";

class Brand extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loader: "block"
    };

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getBrands())
      // .then(
      //   () => {
          this.setState(...this.state, {loader: "none"})
      //   }
      // );
  }

  render() {
    const { classes, front, ...rest } = this.props;
    document.title = "Brands @ Bezop Store || Worlds First Decentralized Store";
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

        <Parallax style={{height: "400px"}} image="https://i.pinimg.com/originals/c6/13/99/c6139938461b00f610636dc2ff7279d3.jpg">
          <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)", content: "", display: "block", height: "100%", left: 0, top: 0,
                  position: "absolute", width: "100%"}}></div>
          <div className={classes.container}>
              <GridContainer>
              <GridItem>
                  <div style={{textAlign: "center", color: "#ffffff"}}>
                    <h1 className={classes.title}>Brands</h1>
                    <h3>
                      Shop by your favorite brands.
                    </h3>
                  </div>
              </GridItem>
              </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage brands={front.brands} />
        </div>
        <Footer topFooter={true} />
      </div>
    );
  }
}


export default Brand;
