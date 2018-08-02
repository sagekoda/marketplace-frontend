/**
 * @description The ProductView component which is the parent component for products.
 * @author Mohammed Odunayo
 * @class ProductView
 * @name ProductView
 */

import React from "react";
import {Link} from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import More from "@material-ui/icons/ViewList";
import { Hidden } from "@material-ui/core";

import Button from '../../components/CustomButtons/Button.jsx';
import basicsStyle from "../../assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import ProductBox from "./ProductBox.jsx";

class ProductView extends React.Component {
    render() {
        const { products, heading, moreLink, range, data, filters } = this.props;

        const styles = {
            cols:{
            display: "block",
            marginBottom: "30px"
            },
            container:{
            padding: "0px 30px"
            },
            header:{
            borderBottom: "1px solid lightgray"
            },
            bigMore:{
            float: "right", fontSize: "0.4em"
            },
            smallMore:{
            fontSize: "0.5em",
            marginTop: "0px"
            },
            productArea:{
                padding: "30px 0px"
            }
        }

        let boxProducts = [];
        if (products.length > 0 && data.vendors.length > 0 && data.brands.length > 0) {
            boxProducts = products.filter(product => (product.discountPrice >= range[0] && product.discountPrice <= range[1]));
            if(filters.categories.length > 0){
                boxProducts = boxProducts.filter(product => (product.categoryId === filters.categories[filters.categories.indexOf(product.categoryId)]));
            }
            if(filters.vendors.length > 0){
                boxProducts = boxProducts.filter(product => (product.vendorId === filters.vendors[filters.vendors.indexOf(product.vendorId)]));
            }
            if(filters.brands.length > 0){
                boxProducts = boxProducts.filter(product => (product.brandId === filters.brands[filters.brands.indexOf(product.brandId)]));
            }
            boxProducts = boxProducts.slice(0, ((this.props.all)? undefined : 6));
            boxProducts.sort((a,b) => 0.5 - Math.random());
        }

        return (
            <div>
                <Hidden smDown>
                    <h2 style={styles.header}>{heading}
                    {(moreLink) ? 
                        <Link to={moreLink}> 
                            <Button color="primary" size="sm" round style={styles.bigMore}><More />
                                More...
                            </Button>
                        </Link>
                    :
                        null
                    }
                    </h2>
                </Hidden>
                <Hidden mdUp>
                    <h3 style={styles.header}>{heading + " "}
                    {(moreLink) ? 
                        <Link to={moreLink}>
                            <Button color="primary" size="sm" round style={styles.smallMore}><More />
                                More...
                            </Button>
                        </Link>
                    :
                        null
                    }
                    </h3>
                </Hidden>
                <GridContainer style={styles.productArea}>
                    {boxProducts.map((product, index) => {
                        return(<GridItem xs={12} sm={12} md={6} lg={4} key={index}>
                            <ProductBox product={product} data={data}/>
                        </GridItem>);
                        }
                    )}
                </GridContainer>
            </div>
        );
    }
  }
  
  export default withStyles(basicsStyle)(ProductView);