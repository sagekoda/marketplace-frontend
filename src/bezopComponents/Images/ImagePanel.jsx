import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";

import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

import cardImagesStyles from "../../assets/jss/material-kit-react/cardImagesStyles";
import ImagePlaceholder from "./ImagePlaceholder";
import Validator from "../../helpers/validator";




class ImagePanel extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            imgObj: this.props.imgObj,
            eachData: this.props.eachData,
        }
    }

    componentWillReceiveProps(newProps){
        if(Validator.propertyExist(newProps, "product", "updateImage")){
            if(typeof newProps.product.updateImage === "object"){
                let newEachData = JSON.parse(JSON.stringify(newProps.product.updateImage));
                this.setState({
                    eachData: newEachData
                })
            }
            
        }
    }
    
    render(){
        //console.log(this.props.eachData);
        const {imgObj, eachData} = this.state;
        const {postImage, collection} = this.props;
        return (
            <div>
                <Card >
                <CardBody>
                <Grid container>
                {imgObj.map((img, key) => {
                    const imgTree = img.label.split("|");
                    return (
                        <GridItem xs={12} md={4} key={`${imgTree[0]}${key}`}>
                            <ImagePlaceholder 
                            srcImage={imgTree.length > 2 ? eachData[imgTree[2]][imgTree[1]][imgTree[0]] : imgTree.length === 2 ? eachData[imgTree[1]][imgTree[0]] : eachData[imgTree[0]]} 
                            label={img.label}
                            eachData={eachData} 
                            fileInput={`${imgTree[0]}${eachData.id}`}
                            fullwidth={img.fullWidth} 
                            width={img.width}
                            height={img.height}
                            postImage={postImage}
                            collection={collection}
                            />
                            
                                <h4 style={{fontWeight:"bolder", textAlign: "center"}}>{img.imgType}</h4>
                        </GridItem>
                    )
                })}
                    </Grid>
                    </CardBody>
                </Card>
            </div>
        )
    }
}


export default withStyles(cardImagesStyles)(ImagePanel);