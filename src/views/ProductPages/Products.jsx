/**
 * @description Products page view.
 * @author Mohammed Odunayo
 * @class Products
 * @name Products
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
import Events from 'events';

class Products extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loader: "block",
      products: {},
      pageTitle: "",
      pageBanner: ""
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
          let productCategory = this.props.match.url.replace("/products/", "");
          let products = {};
          switch(productCategory) {
            case "today":
              products = this.props.front.products.filter(product => product.todaysDeal === true);
              this.setState(...this.state, {
                pageTitle: "Today's Deal",
                pageBanner: "https://images.pexels.com/photos/346746/pexels-photo-346746.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                products: products,
                loader: "none"
              });
            break;
            case "featured":
              products = this.props.front.products.filter(product => product.featured === true);
              this.setState(...this.state, {
                pageTitle: "Featured Products",
                pageBanner: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                products: products,
                loader: "none"
              });
            break;
            case "latest":
              products = this.props.front.products.filter(product => product.latest === true);
              this.setState(...this.state, {
                pageTitle: "Latest Products",
                pageBanner: "https://images.pexels.com/photos/1073767/pexels-photo-1073767.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                products: products,
                loader: "none"
              });
            break;
            case "popular":
              products = this.props.front.products.filter(product => product.popular === true);
              this.setState(...this.state, {
                pageTitle: "Popular Products",
                pageBanner: "https://images.pexels.com/photos/353347/pexels-photo-353347.jpeg?auto=compress&cs=tinysrgb&h=350",
                products: products,
                loader: "none"
              });
            break;
            default:
              products = this.props.front.products;
              this.setState(...this.state, {
                pageTitle: "Products",
                pageBanner: "https://images.pexels.com/photos/268819/pexels-photo-268819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
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

    let productCategory = newProps.match.url.replace("/products/", "");
    let products = {};
    switch(productCategory) {
      case "today":
        products = newProps.front.products.filter(product => product.todaysDeal === true);
        this.setState(...this.state, {
          pageTitle: "Today's Deal",
          pageBanner: "https://images.pexels.com/photos/346746/pexels-photo-346746.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          products: products,
          loader: "none"
        });
      break;
      case "featured":
        products = newProps.front.products.filter(product => product.featured === true);
        this.setState(...this.state, {
          pageTitle: "Featured Products",
          pageBanner: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          products: products,
          loader: "none"
        });
      break;
      case "latest":
        products = newProps.front.products.filter(product => product.latest === true);
        this.setState(...this.state, {
          pageTitle: "Latest Products",
          pageBanner: "https://images.pexels.com/photos/1073767/pexels-photo-1073767.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          products: products,
          loader: "none"
        });
      break;
      case "popular":
        products = newProps.front.products.filter(product => product.popular === true);
        this.setState(...this.state, {
          pageTitle: "Popular Products",
          pageBanner: "https://images.pexels.com/photos/353347/pexels-photo-353347.jpeg?auto=compress&cs=tinysrgb&h=350",
          products: products,
          loader: "none"
        });
      break;
      default:
        products = newProps.front.products;
        this.setState(...this.state, {
          pageTitle: "Products",
          pageBanner: "https://images.pexels.com/photos/268819/pexels-photo-268819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
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
            events={this.events}
          />
        </div>
        <Footer topFooter={true} />
      </div>
    );
  }
}


export default Products;
