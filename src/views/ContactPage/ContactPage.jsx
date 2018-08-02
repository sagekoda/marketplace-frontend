/**
 * @description The Contact Us page view.
 * @author Mohammed Odunayo
 * @class Contact
 * @name Contact
 */

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import Parallax from "../../components/Parallax/Parallax.jsx";
import LeftLink from "../../components/Header/LeftLinks.jsx";
import {PageLoader} from "../../components/PageLoader/PageLoader.jsx";
// Sections for this page
import FormSection from "./Sections/FormSection.jsx";
import Maps from "../Maps/Maps.jsx";

class Contact extends React.Component {
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
    document.title = "Contact Us @ Bezop Store || Worlds First Decentralized Store";
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

        <Parallax style={{height: "600px"}}>
          <Maps />
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <FormSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Contact;
