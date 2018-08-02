/**
 * @description The vendor page view.
 * @author Mohammed Odunayo
 * @class Vendor
 * @name Vendor
 */

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import LeftLink from "../../components/Header/LeftLinks.jsx";
import Stage from "./Sections/Stage.jsx";
import Parallax from "../../components/Parallax/Parallax.jsx";
import {getVendors} from "../../actions/actions_front.jsx";
import {PageLoader} from "../../components/PageLoader/PageLoader.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";

class Vendor extends React.Component {

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
    dispatch(getVendors())
      // .then(
      //   () => {
          this.setState(...this.state, {loader: "none"})
      //   }
      // );
  }

  render() {
    const { classes, front, ...rest } = this.props;
    document.title = "Vendors @ Bezop Store || Worlds First Decentralized Store";
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

        <Parallax style={{height: "400px"}}
          image="https://images.pexels.com/photos/886465/pexels-photo-886465.jpeg?auto=compress&cs=tinysrgb&h=350">
          <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)", content: "", display: "block", height: "100%", left: 0, top: 0,
                  position: "absolute", width: "100%"}}></div>
          <div className={classes.container}>
              <GridContainer>
              <GridItem>
                  <div style={{textAlign: "center", color: "#ffffff"}}>
                    <h1 className={classes.title}>Vendors</h1>
                    <h3>
                      Get connected to trusted vendors.
                    </h3>
                  </div>
              </GridItem>
              </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage vendors={front.vendors} />
        </div>
        <Footer topFooter={true} />
      </div>
    );
  }
}


export default Vendor;
