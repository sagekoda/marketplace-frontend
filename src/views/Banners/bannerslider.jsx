//@desc This is the carousel that displays vendor's banners
//@author Sylvia Onwukwe
import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";

class BannerSlider extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      thumbnails: true
    };
    return (
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <Carousel {...settings}>
                  <div>
                    <img
                      src="https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg"
                      alt="First slide"
                      className="slick-image"
                    />
                    <div className="slick-caption">
                      <h4>
                        <LocationOn className="slick-icons" />Yellowstone
                        National Park, United States
                      </h4>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://images.pexels.com/photos/318236/pexels-photo-318236.jpeg"
                      alt="Second slide"
                      className="slick-image"
                    />
                    <div className="slick-caption">
                      <h4>
                        <LocationOn className="slick-icons" />Somewhere Beyond,
                        United States
                      </h4>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg"
                      alt="Third slide"
                      className="slick-image"
                    />
                    <div className="slick-caption">
                      <h4>
                        <LocationOn className="slick-icons" />Yellowstone
                        National Park, United States
                      </h4>
                    </div>
                  </div>
                </Carousel>
              </Card>
            </GridItem>
          </GridContainer>
    );
  }
}

export default BannerSlider;