/**
 * @description The profile page view.
 * @author Mohammed Odunayo
 * @class ProfilePage
 * @name ProfilePage
 */

import React from "react";
// core components
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import LeftLinks from "../../components/Header/LeftLinks";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import ProfileCard from "./Sections/ProfileCard.jsx";
import SubscribeCard from "./Sections/SubscribeCard.jsx";
import Overview from "./Sections/Overview";
import Profile from "./Sections/Profile";
import Notifications from "./Sections/Notifications";
import Orders from "./Sections/Orders";
import Wishlist from "./Sections/Wishlist";
import Tickets from "./Sections/Tickets";
import {PageLoader} from "../../components/PageLoader/PageLoader.jsx";

class ProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      overview: true,
      profile: false,
      notifications: false,
      orders: false,
      wishlist: false,
      ticket: false,
      loader: "block",
    };

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    this.goto = this.goto.bind(this);
  }

  componentDidMount() {
    this.setState(...this.state, {loader: "none"})
  }

  goto = page => {
    let nav = {
      overview: false,
      profile: false,
      notifications: false,
      orders: false,
      wishlist: false,
      ticket: false,
    };
    nav[page] = true;
    this.setState(...this.state, nav);
  };

  render() {
    const { classes, ...rest } = this.props;

    return (
      <div>
        <PageLoader display={this.state.loader} />
        <Header
          brand="Bezop Store"
          rightLinks={<HeaderLinks user={"customer"} />}
          leftLinks={<LeftLinks user={"customer"} />}
          color="white"
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />

          <GridContainer className={classes.container} spacing={16}>
            <GridItem xs={12}>
              <GridContainer justify="center" spacing={40}>
                <GridItem lg={3} md={4} xs={12}>
                  <GridContainer justify="center" spacing={40}>
                    <GridItem lg={12}>
                      <ProfileCard state={this.state} classes={classes} goto={this.goto} />
                    </GridItem>
                    <GridItem lg={12}>
                      <SubscribeCard classes={classes} />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem lg={9} md={8} xs={12}>
                  {(this.state.overview)? <Overview classes={classes} /> : null}
                  {(this.state.profile)? <Profile classes={classes} /> : null}
                  {(this.state.notifications)? <Notifications classes={classes} /> : null}
                  {(this.state.orders)? <Orders classes={classes} /> : null}
                  {(this.state.wishlist)? <Wishlist classes={classes} /> : null}
                  {(this.state.ticket)? <Tickets classes={classes} /> : null}
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>

        <Footer />
      </div>
    );
  }
}

export default (ProfilePage);
