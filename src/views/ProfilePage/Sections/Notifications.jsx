/**
 * @description The profile notification.
 * @author Mohammed Odunayo
 * @class Notifications
 * @name Notifications
 */

import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ProfileDetailTable from "./ProfileDetailTable";

class Notifications extends React.Component {
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
                        title={"My Notifications"}
                    />
                </GridItem>
            </GridContainer>
        );
    }
}

export default Notifications;