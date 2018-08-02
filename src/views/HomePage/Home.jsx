/**
 * @description The home page view.
 * @author Mohammed Odunayo
 * @class Home
 * @name Home
 */

import React from "react";
import classNames from "classnames";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import LeftLinks from "../../components/Header/LeftLinks.jsx";
import Stage from "./Sections/Stage.jsx";
import Slider from "../../components/Parallax/Slider.jsx";
import {getSliders, getCategories, getVendors, getBrands, getProducts} from "../../actions/actions_front.jsx";
import {PageLoader} from "../../components/PageLoader/PageLoader.jsx";
import Events from "events";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loader: "block"
    };
    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.events = new Events();
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getSliders());
    dispatch(getVendors());
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getProducts())
      .then(
        () => {
          this.setState(...this.state, {loader: "none"})
        }
      );
  }

  render() {
    const { classes, front, ...rest } = this.props;
    document.title = "Bezop Store || Worlds First Decentralized Store";

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

        <Slider classes={classes} slides={front.sliders} />

        <div className={classNames(classes.main, classes.mainRaised)}>
          <Stage products={front.products} categories={front.categories} vendors={front.vendors} brands={front.brands} events={this.events}/>
        </div>
        <Footer topFooter={true} />
      </div>
    );
  }
}


export default Home;
