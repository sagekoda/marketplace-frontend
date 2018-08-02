/**
 * @description The profile wishlist.
 * @author Mohammed Odunayo
 * @class Wishlist
 * @name Wishlist
 */

import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ProfileDetailTable from "./ProfileDetailTable";

class Wishlist extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <GridContainer justify="center" spacing={40}>
                <GridItem xs={12}>
                    <ProfileDetailTable
                        title={"My Wishlist"}
                    />
                </GridItem>
            </GridContainer>
        );
    }
}

export default Wishlist;