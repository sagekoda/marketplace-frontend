/**
 * @description The analytic card.
 * @author Mohammed Odunayo
 * @class AnalyticCard
 * @name AnalyticCard
 */

import React from "react";
import { Paper, Typography } from "@material-ui/core";

class AnalyticCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        const { classes, color, title, Icon, value } = this.props;

        return(
            <Paper className={classes.paper} elevation={4} style={{cursor: "pointer"}} >
                <Paper className={classes.innerPaper} square={false} elevation={0}>
                    <Typography style={{margin: "10px auto", color: color}} variant={"headline"} align={"right"} >
                        {Icon}
                    </Typography>
                    <Typography style={{color: color}} variant={"display1"} align={"center"} >
                        <span style={{fontSize: "1.5em"}} >{value}</span>
                    </Typography>
                    <Typography align={"center"} variant={"subheading"} >
                        {title}
                    </Typography>
                    <br/>
                </Paper>
            </Paper>
        );
    }
}

export default AnalyticCard;