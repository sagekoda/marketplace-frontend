/**
 * @description The user blog.
 * @author Mohammed Odunayo
 * @class Profile
 * @name Profile
 */

import React from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ProfileTab from "./ProfileTab";
import UserCard from "./UserCard";

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        const {classes} = this.props;

        return(
            <GridContainer justify="center" spacing={40}>
                <GridItem lg={8}>
                    <ProfileTab />
                </GridItem>
                <GridItem lg={4}>
                    <UserCard classes={classes} />
                </GridItem>
            </GridContainer>
        );
    }
}

export default Profile;