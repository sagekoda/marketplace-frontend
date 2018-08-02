/**
 * @description The pageLoader component.
 * @author Mohammed Odunayo
 * @class PageLoader
 * @name PageLoader
 */

import React from 'react';
import loaderImage from "../../assets/img/BezopLogo.svg";

export class PageLoader extends React.Component {

    render() {

        const style = {
            loaderStyle: {
                position: "fixed",
                width: "100%",
                height: "100%",
                zIndex: "10001",
                backgroundImage: `url('${loaderImage}')`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: this.props.display
            },
            loaderBg: {
                position: "fixed",
                width: "100%",
                height: "100%",
                zIndex: "10000",
                backgroundColor: "#ffffff",
                opacity: ".98",
                display: this.props.display
            },
        };

        return(
            <div style={style.loaderBg}>
                <div className={"fa-spin"} style={style.loaderStyle}></div>
            </div>
        );
    }
}