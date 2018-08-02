/**
 * @description Brands page view.
 * @author Mohammed Odunayo
 * @class Brands
 * @name Brands
 */

import React from "react";
import classNames from "classnames";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import LeftLinks from "../../components/Header/LeftLinks.jsx";
import Stage from "../ProductPages/Sections/Stage.jsx";
import Parallax from "../../components/Parallax/Parallax.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import {getCategories, getVendors, getBrands, getProducts} from "../../actions/actions_front.jsx";
import {PageLoader} from "../../components/PageLoader/PageLoader.jsx";
import Events from "events";

class Brands extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loader: "block",
      products: {},
      pageTitle: "",
      pageBanner: "",
      id: this.props.match.url.replace("/brand/", ""),
    };
    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.events = new Events();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    
    dispatch(getVendors());
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getProducts())
      .then(
        () => {
          let productBrand = this.props.match.url.replace("/brand/", "");
          let products = {};

          if(this.props.front.brands[productBrand]) {
              products = this.props.front.products.filter(product => product.brandId === Number(productBrand));
              this.setState(...this.state, {
                pageTitle: this.props.front.brands[productBrand].name,
                pageBanner: this.props.front.brands[productBrand].image,
                products: products,
                loader: "none"
              });
          }
        }
      );
  }

 componentWillReceiveProps(newProps){
  if(this.props.match.url !== newProps.match.url){

    this.setState(...this.state, {loader: "block"});

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    let productBrand = newProps.match.url.replace("/brand/", "");
    let products = {};
    if(newProps.front.brands[productBrand]) {
        products = newProps.front.products.filter(product => product.brandId === Number(productBrand));
        this.setState(...this.state, {
          pageTitle: newProps.front.brands[productBrand].name,
          pageBanner: newProps.front.brands[productBrand].image,
          products: products,
          loader: "none"
        });
    }
  }
 }

  render() {
    const { classes, front, match, ...rest } = this.props;
    const { products, pageTitle, pageBanner } = this.state;
    document.title = pageTitle + " @ Bezop Store || Worlds First Decentralized Store";

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

        <Parallax style={{height: "400px"}} image={(pageBanner)? pageBanner : null}>
          <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)", content: "", display: "block", height: "100%", left: 0, top: 0,
                  position: "absolute", width: "100%"}}></div>
          <div className={classes.container}>
              <GridContainer>
              <GridItem>
                  <div style={{textAlign: "center", color: "#ffffff"}}>
                    <h1 className={classes.title}>{pageTitle}</h1>
                  </div>
              </GridItem>
              </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage
            products={products}
            singleProduct={false}
            heading={pageTitle}
            categories={front.categories}
            vendors={front.vendors}
            brands={front.brands}
            brandId={this.state.id}
            events={this.events}
          />
        </div>
        <Footer topFooter={true} />
      </div>
    );
  }
}


export default Brands;
