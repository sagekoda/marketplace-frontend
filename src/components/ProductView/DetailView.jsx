/**
 * @description The DetailView component which render a product full details.
 * @author Mohammed Odunayo
 * @class DetailView
 * @name DetailView
 */

import React from 'react';
import {Link} from 'react-router-dom';
import Carousel from "react-slick";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import {Select, FormControl, MenuItem, InputLabel, Chip, Hidden} from "@material-ui/core";
// @material-ui/icons
import {ShoppingCart, CompareArrows, FavoriteBorder, Favorite, ShoppingBasket} from "@material-ui/icons";

import Button from "../../components/CustomButtons/Button.jsx";
import Typo from "../../assets/jss/material-kit-react/components/typographyStyle.jsx"
import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import DetailInfo from './DetailInfo';
import Badge from '../../components/Badge/Badge.jsx';

class DetailView extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
            product: this.props.product,
            Cart: (localStorage.cart)? JSON.parse(localStorage.cart) : {}
        };

        this.FavToggle = this.FavToggle.bind(this);

        this.cart = {
            checkProduct: () => {
                return (this.state.Cart[this.state.product.id])? true : false;
            },
            addProduct: () => {
                let cartData = (localStorage.cart)? JSON.parse(localStorage.cart) : {};
                cartData[this.state.product.id] = 1;
                localStorage.cart = JSON.stringify(cartData);
                this.setState(...this.state, {Cart: cartData});
                this.props.data.events.emit('add-to-cart');
            },
            getQuantity: () => {
                return (this.state.Cart[this.state.product.id])? this.state.Cart[this.state.product.id] : 1;
            },
            setQuantity: num => {
                let cartData = (localStorage.cart)? JSON.parse(localStorage.cart) : {};
                cartData[this.state.product.id] = num;
                localStorage.cart = JSON.stringify(cartData);
                this.setState(...this.state, {Cart: cartData});
                this.props.data.events.emit('add-to-cart');
            }
        };
    }

    FavToggle(){
        let pro = this.props.product;
        if(pro.favorite){
            pro.favorite = false;
            this.setState(...this.state, {product: pro});
        } else {
            pro.favorite = true;
            this.setState(...this.state, {product: pro});
        }
    }

    quantityChange = event => {
        this.cart.setQuantity(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    };

    componentWillReceiveProps (newProps){
        this.setState(...this.state, {quantity: this.cart.getQuantity()});
        this.setState(...this.state, {product: newProps.product});
    }

  render(){
    const { classes, product, vendor, brand } = this.props;

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
        <Hidden smDown>
            <h2 style={styles.header}>{product.name}</h2>
        </Hidden>
        <Hidden mdUp>
            <h3 style={styles.header}>{product.name}</h3>
        </Hidden>
        <GridContainer justify="center">
            <GridItem xs={12} sm={6}>
                <Carousel {...settings}>
                    {(product.images)? product.images.map((image, index) => {
                        return(<img className="slick-image" src={image} alt={product.name} key={index} />);
                    }) : null}
                </Carousel>
                <Button color="primary" round><CompareArrows/> Compare</Button>
                <Button onClick={this.FavToggle} color="primary" round>{(product.favorite)? <span><Favorite/> Remove From Wishlist</span> : <span><FavoriteBorder/> Add To Wishlist</span>}</Button>
            </GridItem>
            <GridItem xs={12} sm={6}>
                <h2 style={style.productTitle}>
                    {product.name}&nbsp;
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
                {(this.cart.checkProduct())?
                    <Link to="/cart">
                        <Button color="primary" round className={classes.Cart}>
                            <ShoppingBasket /> Checkout
                        </Button>
                    </Link>
                    :
                    (product.unit !== 0) ?
                        <Button color="primary" onClick={this.cart.addProduct} round className={classes.Cart}>
                            <ShoppingCart /> Add To Cart
                        </Button>
                        :
                        <Button color="primary" disabled={true} round className={classes.Cart}>
                            <ShoppingCart/> Out of Stock
                        </Button>
                }
                <br/><br/>
                <DetailInfo vendor={vendor} brand={brand} product={product} />
                <h3>Product Tags</h3>
                {(product.tags)? product.tags.map((tag, index) => {
                    return(<Chip
                        label={tag}
                        style={style.chip}
                        component="a"
                        href="#"
                        clickable
                        key={index}
                    />);
                }) : null}
            </GridItem>
        </GridContainer>
    </div>
    );
  }
}

export default withStyles(modalStyle)(DetailView);