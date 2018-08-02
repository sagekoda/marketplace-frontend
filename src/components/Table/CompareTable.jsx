/**
 * @description The Compare Table component which renders the table view for products.
 * @author Mohammed Odunayo
 * @class CompareTable
 * @name CompareTable
 */

import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import { Hidden, TableRow, TableHead, TableCell, TableBody, Table, Tooltip } from '@material-ui/core';
import { ShoppingCart, Clear, Refresh, Compare } from '@material-ui/icons';
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

class CompareTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Compare: (localStorage.compare)? JSON.parse(localStorage.compare) : [],
            Products: (this.props.data.products)? this.props.data.products : {}
        };

        this.compare = {
            removeCompare: id => {
                let compareData = (localStorage.compare)? JSON.parse(localStorage.compare) : [];
                compareData.splice(compareData.indexOf(id), 1);
                localStorage.compare = JSON.stringify(compareData);
                let products = this.state.Products.filter(product => compareData.hasOwnProperty(compareData.indexOf(product.id)));
                this.setState(...this.state, {Compare: compareData, Products: products});
                this.props.data.events.emit('add-to-compare');
            },
            emptyCompare: () => {
                let compareData = JSON.stringify([]);
                localStorage.compare = compareData;
                this.setState(...this.state, {Compare: compareData, Products: {}});
                this.props.data.events.emit("add-to-compare");
            }
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState(...this.state, {Products: newProps.data.products});
    }

  render() {
    const { classes, data } = this.props;
    const {Products} = this.state;
    const {brands, vendors, categories} = data;

    const styles = {
        bigMore:{
        float: "right", fontSize: "0.4em"
        }
    }

    return (
        <div className={classes.root}>
        <Hidden smDown>
            <h2 className={classes.header}>
                <Compare className={classes.cartIcon}/> Compare Products
                <Button
                    color="primary"
                    size="sm"
                    round
                    style={styles.bigMore}
                    onClick={() => {
                        this.compare.emptyCompare();
                    }}
                >
                    <Refresh /> Restore Products
                </Button>
            </h2>
        </Hidden>
        <Hidden mdUp>
            <h3 className={classes.header}><ShoppingCart className={classes.cartIcon} /> Compare Products</h3>
        </Hidden>
        <Table className={classes.table}>
            <TableHead>
            <TableRow className={classes.tableHeader}>
                <TableCell></TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Specifications</TableCell>
                <TableCell>Description</TableCell>
                <TableCell></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {(Products.length > 0)?
                Products.map(product => {
                    return (
                    <TableRow key={product.id}>
                        <TableCell className={classes.tablePadding}>
                            <img src={product.images[0]} alt={product.name} height="150px" />
                        </TableCell>
                        <TableCell>
                            <h4 className={classes.productName}>
                                <Link to={"/product/" + product.id} style={{color: primaryColor}} >{product.name}</Link>
                            </h4>
                            <big>Vendor: {vendors[product.vendorId].name}</big>
                            <br/>
                            <big>Brand: {brands[product.brandId].name}</big>
                            <br/>
                            <big>Category: {categories[product.categoryId].name}</big>
                        </TableCell>
                        <TableCell>
                            <NumberFormat
                                value={product.discountPrice}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                renderText={value => <h4>{value}</h4>}
                            />
                        </TableCell>
                        <TableCell>
                            <h4>Color:&nbsp;{product.color}</h4>
                            <h4>Width:&nbsp;{product.width}</h4>
                            <h4>Height:&nbsp;{product.height}</h4>
                        </TableCell>
                        <TableCell>
                            <h5>{product.brief}</h5>
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
                                        this.compare.removeCompare(product.id);
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
        </Table>
        </div>
    );
  }
}

export default withStyles(styles)(CompareTable);