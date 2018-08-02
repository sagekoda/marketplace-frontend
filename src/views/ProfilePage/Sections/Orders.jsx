/**
 * @description The profile orders.
 * @author Mohammed Odunayo
 * @class Orders
 * @name Orders
 */

import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ProfileDetailTable from "./ProfileDetailTable";

class Orders extends React.Component {
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
                        title={"My Orders"}
                    />
                </GridItem>
            </GridContainer>
        );
    }
}

export default Orders;