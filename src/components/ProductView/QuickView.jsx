/**
 * @description The QuickView component which render a product brief details.
 * @author Mohammed Odunayo
 * @class QuickView
 * @name QuickView
 */

import React from 'react';
import Carousel from "react-slick";
import {Link} from "react-router-dom";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import {Select, IconButton, FormControl, MenuItem, InputLabel, Chip, DialogActions, DialogContent, DialogTitle, Slide, Dialog} from "@material-ui/core";
// @material-ui/icons
import {Close, ShoppingCart, Pageview, Compare, FavoriteBorder, Favorite, ShoppingBasket} from "@material-ui/icons";

import Button from "../../components/CustomButtons/Button.jsx";
import Typo from "../../assets/jss/material-kit-react/components/typographyStyle.jsx"
import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import ProductInfo from "./ProductInfo.jsx";
import Badge from '../../components/Badge/Badge.jsx';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class QuickView extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1
        };

        this.quantityChange = this.quantityChange.bind(this);
    }

    quantityChange = event => {
        this.props.cart.setQuantity(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount (){
        this.setState(...this.state, {quantity: this.props.cart.getQuantity()});
    }

  render(){
    const { classes, param, event, favToggle, product, data, cart, compare, compToggle } = this.props;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
      };

    const style = {
        productTitle: {
            margin: "0px",
            fontWeight: "bold"
        },
        chip: {
            margin: "0px 4px 4px 0px",
        },
        formControl: {
            minWidth: "130px"
        }
    };

    let quantity = [];
    for(var q = 1; q <= product.unit; q++) {
        quantity.push(<MenuItem value={q} key={q}>{q}</MenuItem>);
    }

    return (
      <div>
        <Dialog classes={{
            root: classes.center,
            paper: classes.modal
          }} open={param} TransitionComponent={Transition} keepMounted onClose={event} aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description">
          
          <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
            <IconButton className={classes.modalCloseButton} key="close" aria-label="Close" color="inherit" onClick={event}>
              <Close className={classes.modalClose} />
            </IconButton>
            <h3 className={classes.modalTitle}>Quick View</h3>
          </DialogTitle>
          
          <DialogContent id="modal-slide-description" className={classes.modalBody}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={5}>
                <Carousel {...settings}>
                    {product.images.map((image, index) => {
                        return(<img className="slick-image" src={image} alt={product.name} key={index} />);
                    })}
                </Carousel>
                <Button
                    onClick={compToggle}
                    color="primary"
                    round
                >
                    {(compare.checkCompare())?
                        <span><Compare /> Remove From Compare List</span>
                        :
                        <span><span className={"fas fa-exchange-alt"}></span> Add To Compare List</span>
                    }
                </Button>
                <Button
                    onClick={favToggle}
                    color="primary"
                    round
                >
                    {(product.favorite)? <span><Favorite/> Remove From Wishlist</span> : <span><FavoriteBorder/> Add To Wishlist</span>}
                </Button>
              </GridItem>
              <GridItem xs={12} sm={7}>
                <h2 style={style.productTitle}>{product.name}&nbsp;
                    <sup>
                        {(product.featured)? <Badge style={{fontWeight: "bold", fontSize: "small"}} color="danger">Featured</Badge> : null}
                        {(product.discount > 0)? <Badge style={{fontWeight: "bold", fontSize: "small"}} color="danger">{product.discount}% OFF</Badge> : null}
                        {(product.latest)? <Badge style={{fontWeight: "bold", fontSize: "small"}} color="primary">Latest</Badge> : null}
                        {(product.unit === 0)? <Badge style={{fontWeight: "bold", fontSize: "small"}} color="danger">Out of Stock</Badge> : null}
                    </sup>
                </h2>
                <h3 className={classes.productPrice}>
                    <del style={Typo.mutedText}>
                        <small>
                            <strong>{product.costPrice}</strong>
                        </small>
                    </del>
                    {" "}
                    <span style={Typo.primaryText}><strong>{product.sellingPrice}</strong></span>
                </h3>
                <form className={classes.root} autoComplete="off">
                    <FormControl style={style.formControl}>
                        <InputLabel htmlFor="product-quantity">Product Quantity</InputLabel>
                        <Select
                            value={this.state.quantity}
                            onChange={this.quantityChange}
                            inputProps={{ 
                                name: "quantity",
                                id: "product-quantity"
                            }}>
                            {quantity}
                        </Select>
                    </FormControl>
                </form>
                {(cart.checkProduct()) ?
                    <Link to="/cart">
                        <Button onClick={event} color="primary" round><ShoppingBasket/> Checkout</Button>
                    </Link>
                    :
                    (product.unit !== 0) ?
                        <Button color="primary" onClick={cart.addProduct} round><ShoppingCart/> Add To Cart</Button>
                        :
                        <Button color="primary" disabled={true} round><ShoppingCart/> Out of Stock</Button>
                }
                <br/><br/>
                <ProductInfo data={data} product={product} />
                <h3>Product Tags</h3>
                {product.tags.map((tag, index) => {
                    return(<Chip
                        label={tag}
                        style={style.chip}
                        component="a"
                        href="#"
                        clickable
                        key={index}
                    />);
                })}
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Link to={"/product/"+product.id}>
                <Button onClick={event} round><Pageview/> View Details</Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(modalStyle)(QuickView);