/**
 * @description The stage section for the product page.
 * @author Mohammed Odunayo
 * @class Stage
 * @name Stage
 */

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import basicsStyle from "../../../assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import ProductView from "../../../components/ProductView/ProductView";
import Sidebar from "../../../components/Sidebar/CategoryCard";
import MinSearch from "../../../components/Search/MinSearch";
import AdvanceSearch from "../../../components/Search/AdvanceSearch";
import DetailView from "../../../components/ProductView/DetailView";

class Stage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      priceRange: [1,2],
      checkedCategories: (this.props.categoryId)? [Number(this.props.categoryId)] : [],
      checkedVendors: (this.props.vendorId)? [Number(this.props.vendorId)] : [],
      checkedBrands: (this.props.brandId)? [Number(this.props.brandId)] : [],
    }

    this.getPriceRange = this.getPriceRange.bind(this);
    this.setPriceRange = this.setPriceRange.bind(this);
    this.props.events.on('handleCategories', this.handleCategories.bind(this));
    this.props.events.on('handleVendors', this.handleVendors.bind(this));
    this.props.events.on('handleBrands', this.handleBrands.bind(this));
  }

  handleCategories = value => {
    const { checkedCategories } = this.state;
    const currentIndex = checkedCategories.indexOf(value);
    const newChecked = [...checkedCategories];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedCategories: newChecked,
    });
  };

  handleVendors = value => {
    const { checkedVendors } = this.state;
    const currentIndex = checkedVendors.indexOf(value);
    const newChecked = [...checkedVendors];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedVendors: newChecked,
    });
  };

  handleBrands = value => {
    const { checkedBrands } = this.state;
    const currentIndex = checkedBrands.indexOf(value);
    const newChecked = [...checkedBrands];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedBrands: newChecked,
    });
  };

  componentWillReceiveProps(newProps) {
    if(!this.props.singleProduct) {
      if (newProps.products.length > 0) {
        this.setState(...this.state, {priceRange: this.getPriceRange(newProps.products)});
      }
    }
  }
  
  getPriceRange(arr) {
    let min = arr[0].discountPrice, max = arr[0].discountPrice;
  
    for (let i = 1, len=arr.length; i < len; i++) {
      let v = arr[i].discountPrice;
      min = (v < min) ? v : min;
      max = (v > max) ? v : max;
    }

    min = Math.floor((min + 1) / 100) * 100;
    max = Math.ceil((max + 1) / 100) * 100;

    return ([min, max]);
  }

  setPriceRange(values) {
    this.setState(...this.state, {priceRange: values});
  }

  render() {
    const { classes, ...data } = this.props;

    let priceRange = [1,2];

    if(!data.singleProduct){
      priceRange = (data.products.length > 0)? this.getPriceRange(data.products) : [1,2];
    }

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
        float: "right",
        fontSize: "0.6em",
        marginTop: "-10px"
      }
    }

    let content = null;

    if(!data.singleProduct) {
      if (data.categories.length !== 0) {
        content = data.categories.map((category, index) => {
          return(<Sidebar category={category} key={index}/>);
        });
      }
    }

    return (
      <div className={classes.sections}>
        <div style={styles.container}>
          <div>
            <GridContainer justify="center">
                  {(data.singleProduct)?
                    <GridItem sm={12}>
                      <div style={styles.cols}>
                        <MinSearch location="stage"/>
                        <MinSearch location="sidebar"/>
                        <DetailView data={data} product={data.product} vendor={data.vendor} brand={data.brand} />
                      </div>
                    </GridItem>
                    :
                    <GridItem xs={12} sm={12} md={9}>
                      <div style={styles.cols}>
                        <MinSearch location="stage"/>
                        <ProductView
                          products={data.products}
                          range={this.state.priceRange}
                          data={data}
                          all={true}
                          heading={data.heading}
                          filters={{
                            categories: this.state.checkedCategories,
                            vendors: this.state.checkedVendors,
                            brands: this.state.checkedBrands,
                          }} />
                      </div>
                    </GridItem>
                  }
                
                  {(data.singleProduct)?
                    null
                    :
                    <GridItem xs={12} sm={12} md={3}>
                      <div style={styles.cols}>
                        <MinSearch location="sidebar"/>
                        <AdvanceSearch
                          slideRange={{min: priceRange[0], max: priceRange[1]}}
                          slideState={this.state.priceRange}
                          slideStep={(priceRange[1] / priceRange[0])}
                          data={data}
                          slideEvent={this.setPriceRange}
                          checkedCategories={this.state.checkedCategories}
                          checkedVendors={this.state.checkedVendors}
                          checkedBrands={this.state.checkedBrands}
                          events={this.props.events}
                        />
                        {content}
                      </div>
                    </GridItem>
                  }
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(Stage);
