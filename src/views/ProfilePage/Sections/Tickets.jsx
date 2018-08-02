/**
 * @description The profile tickets.
 * @author Mohammed Odunayo
 * @class Tickets
 * @name Tickets
 */

import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ProfileDetailTable from "./ProfileDetailTable";

class Tickets extends React.Component {
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
                        title={"My Tickets"}
                    />
                </GridItem>
            </GridContainer>
        );
    }
}

export default Tickets;