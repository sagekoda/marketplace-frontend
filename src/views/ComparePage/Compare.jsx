/**
 * @description The compare page view.
 * @author Mohammed Odunayo
 * @class Compare
 * @name Compare
 */

import React from "react";
import classNames from "classnames";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import LeftLinks from "../../components/Header/LeftLinks.jsx";
import Stage from "./Sections/Stage.jsx";
import {getVendors, getBrands, getProducts, getCategories} from "../../actions/actions_front.jsx";
import {PageLoader} from "../../components/PageLoader/PageLoader.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Parallax from "../../components/Parallax/Parallax";
import Events from "events";

class Compare extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loader: "block",
      products: {}
    };
    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.events = new Events();
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getVendors());
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getProducts())
      .then(
        () => {
          let compare = (localStorage.compare)? JSON.parse(localStorage.compare) : [];
          let products = this.props.front.products.filter(product => compare.hasOwnProperty(compare.indexOf(product.id)));
          this.setState(...this.state, {loader: "none", products: products});
        }
      );
  }

  render() {
    const { classes, front, ...rest } = this.props;
    document.title = "Compare Products @ Bezop Store || Worlds First Decentralized Store";

    return (
      <div>
        <PageLoader display={this.state.loader} />
        <Header
          brand="Bezop Store"
          rightLinks={<HeaderLinks events={this.events} user={"customer"} />}
          leftLinks={<LeftLinks events={this.events} user={"customer"} />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />

        <Parallax style={{height: "400px"}} image="https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
          <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)", content: "", display: "block", height: "100%", left: 0, top: 0,
                  position: "absolute", width: "100%"}}></div>
          <div className={classes.container}>
              <GridContainer>
              <GridItem>
                  <div style={{textAlign: "center", color: "#ffffff"}}>
                    <h1 className={classes.title}>Compare Products</h1>
                    <h3>
                    Checkmate products of choice, & choose the best.
                    </h3>
                  </div>
              </GridItem>
              </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage
            products={this.state.products}
            events={this.events}
            vendors={front.vendors}
            brands={front.brands}
            categories={front.categories}
          />
        </div>
        <Footer topFooter={true} />
      </div>
    );
  }
}


export default Compare;
