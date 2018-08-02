/**
 * @description The Shopping Cart Table component which renders the table view for products.
 * @author Mohammed Odunayo
 * @class CartTable
 * @name CartTable
 */

import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import { Hidden, TableRow, TableHead, TableCell, TableBody, Table, Tooltip, TableFooter, TextField } from '@material-ui/core';
import { ShoppingCart, Clear, ChevronRight, Add, Remove, Refresh } from '@material-ui/icons';
import { primaryColor } from '../../assets/jss/material-kit-react';
import Button from '../CustomButtons/Button.jsx';
import tooltipsStyle from "../../assets/jss/material-kit-react/tooltipsStyle.jsx";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  cartIcon: {
      fontSize: "1.3em",
      marginBottom: "-10px"
  },
  header:{
      borderBottom: "1px solid lightgray"
  },
  tableHeader: {
      textTransform: "uppercase"
  },
  tablePadding: {
      padding: "15px 0px"
  },
  productName: {
      fontWeight: "500"
  },
  productHeadings: {
      margin: "0px"
  },
  tooltip: tooltipsStyle.tooltip
});

class CartTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Cart: (localStorage.cart)? JSON.parse(localStorage.cart) : {},
            Products: (this.props.data.products)? this.props.data.products : {}
        };

        this.cart = {
            getQuantity: id => {
                let product = this.state.Products.filter(product => (product.id === id))[0];
                let quantity = (this.state.Cart[id])? this.state.Cart[id] : 1;
                if(quantity > 0 && quantity <= product.unit){
                    return quantity;
                }
                else{
                    let cartData = (localStorage.cart)? JSON.parse(localStorage.cart) : {};
                    cartData[id] = 1;
                    localStorage.cart = JSON.stringify(cartData);
                    return 1;
                }
            },
            setQuantity: (id,num) => {
                let cartData = (localStorage.cart)? JSON.parse(localStorage.cart) : {};
                let product = this.props.data.products.filter(product => (product.id === id))[0];
                num = Number(num);
                if(num > 0 && num <= product.unit){
                    cartData[id] = num;
                }
                else{
                    cartData[id] = 1;
                }
                localStorage.cart = JSON.stringify(cartData);
                this.setState(...this.state, {Cart: cartData});
            },
            removeProduct: id => {
                let cartData = (localStorage.cart)? JSON.parse(localStorage.cart) : {};
                delete cartData[id];
                localStorage.cart = JSON.stringify(cartData);
                let products = this.state.Products.filter(product => cartData.hasOwnProperty(product.id));
                this.setState(...this.state, {Cart: cartData, Products: products});
                this.props.data.events.emit("add-to-cart");
            },
            emptyCart: () => {
                let cartData = JSON.stringify({});
                localStorage.cart = cartData;
                this.setState(...this.state, {Cart: cartData, Products: {}});
                this.props.data.events.emit("add-to-cart");
            }
        };

        this.quantityChange = this.quantityChange.bind(this);
    }

    quantityChange = event => {
        this.cart.setQuantity(event.target.id, event.target.value);
    };

    componentWillReceiveProps(newProps) {
        this.setState(...this.state, {Products: newProps.data.products});
    }

  render() {
    const { classes, data } = this.props;
    const {Products, Cart} = this.state;
    const {brands, vendors} = data;
    const tax = 3;
    const shipment = 300;
    let subTotal = 0;

    if(Products.length > 0){
        for(let product of Products) {
            subTotal += product.discountPrice * Cart[product.id];
        }
    }

    const grandTotal = tax + shipment + subTotal;

    const styles = {
        bigMore:{
        float: "right", fontSize: "0.4em"
        }
    }

    return (
        <div className={classes.root}>
        <Hidden smDown>
            <h2 className={classes.header}>
                <ShoppingCart className={classes.cartIcon}/> Shopping Cart
                <Button
                    color="primary"
                    size="sm"
                    round
                    style={styles.bigMore}
                    onClick={() => {
                        this.cart.emptyCart();
                    }}
                >
                    <Refresh /> Restore Cart
                </Button>
            </h2>
        </Hidden>
        <Hidden mdUp>
            <h3 className={classes.header}><ShoppingCart className={classes.cartIcon} /> Shopping Cart</h3>
        </Hidden>
        <Table className={classes.table}>
            <TableHead>
            <TableRow className={classes.tableHeader}>
                <TableCell></TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Size</TableCell>
                <TableCell numeric>Price</TableCell>
                <TableCell numeric>Quantity</TableCell>
                <TableCell numeric>Amount</TableCell>
                <TableCell></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {(Products.length > 0)?
                Products.map(product => {
                    return (
                    <TableRow key={product.id}>
                        <TableCell className={classes.tablePadding}>
                            <img src={product.images[0]} alt={product.name} height="120px" />
                        </TableCell>
                        <TableCell>
                            <h4 className={classes.productName}>
                                <Link to={"/product/" + product.id} style={{color: primaryColor}} >{product.name}</Link>
                            </h4>
                            <big>Vendor: {vendors[product.vendorId].name}</big>
                            <p>Brand: {brands[product.brandId].name}</p>
                        </TableCell>
                        <TableCell>
                            <h5>{product.color}</h5>
                        </TableCell>
                        <TableCell>
                            <h5>Width: {product.width}</h5>
                            <h5>Height: {product.height}</h5>
                        </TableCell>
                        <TableCell numeric>
                            <NumberFormat
                                value={product.discountPrice}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                renderText={value => <h5>{value}</h5>}
                            />
                        </TableCell>
                        <TableCell numeric>
                            <h5 style={{textAlign: "center"}}>
                                <Button
                                    id={product.id}
                                    simple
                                    justIcon
                                    round
                                    color="primary"
                                    onClick={() => {
                                        this.cart.setQuantity(product.id, (this.cart.getQuantity(product.id) + 1));
                                    }}
                                >
                                    <Add />
                                </Button>
                                <TextField
                                    id={product.id}
                                    value={this.cart.getQuantity(product.id)}
                                    placeholder={"Quantity"}
                                    onChange={this.quantityChange}
                                    type={"number"}
                                    style={{width: "35px", margin: "-28px 0px -4px 0px"}}
                                    className={classes.textField}
                                    inputProps={{
                                        min: 1,
                                        max: product.unit,
                                        style: {textAlign: "right"},
                                    }}
                                    margin="normal"
                                />
                                <br/>
                                <Button
                                    id={product.id}
                                    simple
                                    justIcon
                                    round
                                    color="primary"
                                    onClick={() => {
                                        this.cart.setQuantity(product.id, (this.cart.getQuantity(product.id) - 1));
                                    }}
                                >
                                    <Remove />
                                </Button>
                            </h5>
                        </TableCell>
                        <TableCell numeric>
                            <NumberFormat
                                value={product.discountPrice * this.cart.getQuantity(product.id)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                renderText={value => <h5>{value}</h5>}
                            />
                        </TableCell>
                        <TableCell>
                            <Tooltip
                                id="tooltip-top"
                                title="Remove Product"
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                            >
                                <Button
                                    color="danger"
                                    onClick={() => {
                                        this.cart.removeProduct(product.id);
                                    }}
                                    justIcon
                                    round
                                    simple
                                >
                                    <Clear />
                                </Button>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                    );
                })
                :
                <TableRow></TableRow>
            }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell numeric>
                        <h4 className={classes.productHeadings}>Subtotal: </h4>
                    </TableCell>
                    <TableCell>
                        <NumberFormat
                            value={subTotal}
                            displayType={'text'}
                            thousandSeparator={true} 
                            prefix={'$'}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            renderText={value => <h4>{value}</h4>}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell numeric>
                        <h4 className={classes.productHeadings}>Tax: </h4>
                    </TableCell>
                    <TableCell>
                        <NumberFormat
                            value={tax}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            renderText={value => <h4>{value}</h4>}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell numeric>
                        <h4 className={classes.productHeadings}>Shipment: </h4>
                    </TableCell>
                    <TableCell>
                        <NumberFormat
                            value={shipment}
                            displayType={'text'}
                            thousandSeparator={true} 
                            prefix={'$'}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            renderText={value => <h4>{value}</h4>}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell numeric>
                        <h3 className={classes.productHeadings}>Grand Total: </h3>
                    </TableCell>
                    <TableCell>
                        <NumberFormat
                            value={grandTotal}
                            displayType={'text'}
                            thousandSeparator={true} 
                            prefix={'$'}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            renderText={value => <h3>{value}</h3>}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>
                        <Button color="primary" round size="lg">
                            <strong>Checkout <ChevronRight /></strong>
                        </Button>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
        </div>
    );
  }
}

export default withStyles(styles)(CartTable);