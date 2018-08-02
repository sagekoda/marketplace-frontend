/**
 * @description The slider component.
 * @author Mohammed Odunayo
 * @class Slider
 * @name Slider
 */

import React from "react";
import Carousel from "react-slick";

import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Parallax from "../../components/Parallax/Parallax.jsx";

class Slider extends React.Component {

    render() {

        const {classes, slides} = this.props;

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };

        let content = null;

        if (slides.length !== 0) {
            content = slides.map((item) => {
            return (
                <Parallax className="slick-image" image={item.image} key={item.key}>
                <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)", content: "", display: "block", height: "100%", left: 0, top: 0,
                        position: "absolute", width: "100%"}}></div>
                <div className={classes.container}>
                    <GridContainer>
                    <GridItem>
                        <div style={{textAlign: "center", color: "#ffffff"}}>
                        <h1 className={classes.title}>{item.captionHead}</h1>
                        <h3>
                        {item.captionInfo}
                        </h3>
                        </div>
                    </GridItem>
                    </GridContainer>
                </div>
                </Parallax>
                );
            });
        }
        
        return (
            <Carousel {...settings}>            
                {content}
            </Carousel>
        );
    }

}

export default Slider