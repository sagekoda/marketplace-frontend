/**
 * @description The single product page view.
 * @author Mohammed Odunayo
 * @class SingleProduct
 * @name SingleProduct
 */

import React from "react";
import classNames from "classnames";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import LeftLinks from "../../components/Header/LeftLinks.jsx";
import Stage from "./Sections/Stage.jsx";
import Parallax from "../../components/Parallax/Parallax.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import {getCategories, getVendors, getBrands, getProducts} from "../../actions/actions_front.jsx";
import {PageLoader} from "../../components/PageLoader/PageLoader.jsx";
import Events from "events";

class SingleProduct extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loader: "block",
      product: {},
      productId: this.props.location.pathname.replace("/product/", "")
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
          this.setState(...this.state, {loader: "none"});
          const product = this.props.front.products.filter(product => product.id === this.state.productId);
          this.setState(...this.state, {product: product[0]});
        }
      );
  }

  render() {
    const { classes, front, ...rest } = this.props;
    const { product } = this.state;
    document.title = (product)? product.name + " @ Bezop Store || Worlds First Decentralized Store" : null;

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

        <Parallax style={{height: "400px"}} image={(product.images)? product.images[0] : null}>
          <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)", content: "", display: "block", height: "100%", left: 0, top: 0,
                  position: "absolute", width: "100%"}}></div>
          <div className={classes.container}>
              <GridContainer>
              <GridItem>
                  <div style={{textAlign: "center", color: "#ffffff"}}>
                    <h1 className={classes.title}>{product.name}</h1>
                    <h3>
                      {product.brief}
                    </h3>
                  </div>
              </GridItem>
              </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage
            product={product}
            singleProduct={true}
            heading={product.name}
            categories={front.categories}
            vendor={front.vendors[product.vendorId]}
            brand={front.brands[product.brandId]}
            events={this.events}
          />
        </div>
        <Footer topFooter={true} />
      </div>
    );
  }
}


export default SingleProduct;
