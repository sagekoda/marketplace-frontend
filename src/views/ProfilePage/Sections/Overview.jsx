/**
 * @description The profile overview.
 * @author Mohammed Odunayo
 * @class Overview
 * @name Overview
 */

import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import { Notifications, Comment, Favorite, ShoppingBasket, Receipt } from "@material-ui/icons";
import { primaryColor, successColor, dangerColor, warningColor } from "../../../assets/jss/material-kit-react";
import AnalyticCard from "./AnalyticCard";
import ProfileTable from "./ProfileTable";

class Overview extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        const { classes } = this.props;

        return(
            <GridContainer justify="center" spacing={40}>
                <GridItem lg={3} sm={6} xs={6} >
                    <AnalyticCard
                        classes={classes}
                        Icon={<Notifications style={{color: primaryColor, fontSize: "1.5em"}} />}
                        value={20}
                        color={primaryColor}
                        title={"Blog Post"}
                    />
                </GridItem>
                <GridItem lg={3} sm={6} xs={6} >
                    <AnalyticCard
                        classes={classes}
                        Icon={<Comment style={{color: successColor, fontSize: "1.5em"}} />}
                        value={100}
                        color={successColor}
                        title={"Comments"}
                    />
                </GridItem>
                <GridItem lg={3} sm={6} xs={6} >
                    <AnalyticCard
                        classes={classes}
                        Icon={<Favorite style={{color: dangerColor, fontSize: "1.5em"}} />}
                        value={50}
                        color={dangerColor}
                        title={"Wishlist"}
                    />
                </GridItem>
                <GridItem lg={3} sm={6} xs={6} >
                    <AnalyticCard
                        classes={classes}
                        Icon={<Receipt style={{color: warningColor, fontSize: "1.5em"}} />}
                        value={70}
                        color={warningColor}
                        title={"Tickets"}
                    />
                </GridItem>
                <GridItem lg={6} sm={12}>
                    <ProfileTable
                        title={"Recent Blog Posts"}
                        classes={classes}
                        Icon={<Notifications />}
                        color={primaryColor}
                    />
                </GridItem>
                <GridItem lg={6} sm={12}>
                    <ProfileTable
                        title={"Recent Comments"}
                        classes={classes}
                        Icon={<Comment />}
                        color={primaryColor}
                    />
                </GridItem>
                <GridItem xs={12}>
                    <ProfileTable
                        title={"Order History"}
                        classes={classes}
                        Icon={<ShoppingBasket />}
                        color={primaryColor}
                    />
                </GridItem>
            </GridContainer>
        );
    }
}

export default Overview;