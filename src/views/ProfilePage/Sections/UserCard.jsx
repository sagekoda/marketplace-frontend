/**
 * @description The profile card view.
 * @author Mohammed Odunayo
 * @class UserCard
 * @name UserCard
 */

import React from "react";
// core components
import { 
  Paper,
  Typography
 } from "@material-ui/core";


class UserCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentWillReceiveProps(newProps){
        this.setState(...this.state, newProps.state);
    }

    render() {
        const {classes} = this.props;

        return(
            <Paper className={classes.paper} elevation={4}>
                <img src={require('../../../assets/img/faces/marc.jpg')} width="100%" alt="Profile" />
                <Paper className={classes.innerPaper} elevation={0}>
                    <Typography className={classes.userName} align={"center"} variant={"title"} >
                        Customer Name
                    </Typography>
                    <Typography gutterBottom align={"center"} variant={"body1"} >
                        username
                    </Typography>
                    <Typography gutterBottom align={"center"} variant={"subheading"} >
                        username@domain.com
                    </Typography>
                    <Typography gutterBottom align={"center"} variant={"subheading"} >
                        +2347066780373
                    </Typography>
                    <br/>
                </Paper>
            </Paper>
        );
    }
}

export default (UserCard);