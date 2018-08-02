//@desc This is the 'business details' form a vendor fills when adding products. 
//@require This form requires the stepper.jsx(A stepper). It is the second step in adding new products
//@author Sylvia Onwukwe
import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
import _ from "lodash";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Datetime from "react-datetime";

import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';
// @material-ui/icons
import Check from "@material-ui/icons/Check";
//core components
import checkboxAdnRadioStyle from "../../assets/jss/material-kit-react/checkboxAdnRadioStyle";

import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { withStyles } from "@material-ui/core";

import Button from "../../components/CustomButtons/Button.jsx";


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  floatRight : {
    float: "right",
    margin: "5px",
    ...theme.button
  },
  marginTopFormControl:{
    marginTop:"15px",
    ...theme.MuiFormControl
  },
  ...checkboxAdnRadioStyle
});


class BusinessDetails extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      productDetails: this.props.productDetails,
      cardAnimation: "cardHidden",
      taxSelect: this.props.selectStyle.taxSelect,
      selectedValuation: this.props.selectElements.selectedValuation,
      valuationSelect: this.props.selectStyle.valuationSelect,
      selectedTax: this.props.selectElements.selectedTax,
      discountSelect: this.props.selectStyle.discountSelect,
      selectedDiscount: this.props.selectElements.selectedDiscount,
      selected: [],
    };
  }

  //This handles the discount select element
  handleDiscountChange = (selectedDiscount) => {
    this.props.setParentSelectElements('selectedDiscount', selectedDiscount);
    this.setState({ selectedDiscount });
    let currentStyle = '';
    if(selectedDiscount !== null){
      this.setProductDetails("discountType", selectedDiscount.value, "price");
      this.setState({
        discountSelect: "react-select-label-visible"
      });
      currentStyle = 'visible';
    }else{
      this.setProductDetails("discountType","percent" , "price");
      this.setState({
        discountSelect: "react-select-label-hidden"
      })
      currentStyle = 'hidden';
    }

    this.props.setParentSelectStyle('discountSelect', `react-select-label-${currentStyle}`);
  }

  handleValuationChange = (selectedValuation) => {
    this.props.setParentSelectElements('selectedValuation', selectedValuation);
    this.setState({ selectedValuation });
    let currentStyle = '';
    if(selectedValuation !== null){
      this.setProductDetails("valuation", selectedValuation.value, "price");
      this.setState({
        valuationSelect: "react-select-label-visible"
      });
      currentStyle = 'visible';
    }else{
      this.setProductDetails("valuation","LIFO", "price");
      this.setState({
        valuationSelect: "react-select-label-hidden"
      })
      currentStyle = 'hidden';
    }

    this.props.setParentSelectStyle('valuationSelect', `react-select-label-${currentStyle}`);
  }

  //This handles the tax select element
  handleTaxChange = (selectedTax) => {
    this.setState({ selectedTax });
    this.props.setParentSelectElements('selectedTax', selectedTax);
    let currentStyle = '';
    if(selectedTax !== null){
      this.setProductDetails("taxType", selectedTax.value, "price");
      this.setState({
        taxSelect: "react-select-label-visible"
      })
      currentStyle = 'visible';
    }else{
      this.setProductDetails("taxType", "percent", "price");
      this.setState({
        taxSelect: "react-select-label-hidden"
      })
      currentStyle = 'hidden';
    }

    this.props.setParentSelectStyle('taxSelect', `react-select-label-${currentStyle}`);
  }

  handleChange = event => {
    let names = event.target.name.split("|");
    if(names.length === 1){
      this.setProductDetails(names[0], event.target.value);
    }else{
      this.setProductDetails(names[0], event.target.value, names[1]);
    }
    
  };

  handleCheckboxChange = event => {
    let names = event.target.name.split("|");
    let boolVal = event.target.value === "unchecked";
    if(names.length === 1){
      this.setProductDetails(names[0], boolVal);
    }else{
      this.setProductDetails(names[0], boolVal, names[1])
    }
  }

  setProductDetails = (type, value, parent = null) => {
    let newProductDetails = JSON.parse(JSON.stringify(this.state.productDetails));
    if(parent === null){
      newProductDetails[type] = value
    }else{
      newProductDetails[parent][type] = value
    }
    this.setState({
        productDetails: newProductDetails
    })
    
    this.props.setParentProductDetails(newProductDetails);
  }


  filterSelectedOption = (type, options, selected,parent = null) => {
    let newSelectedOpt =  options.map(opt => {
      return opt.value
    });
    this.setState({
      [selected] : options.length > 0 ? "react-select-label-visible" : "react-select-label-hidden"
    })
    let currentStyle = options.length > 0 ? "react-select-label-visible" : "react-select-label-hidden";

    this.props.setParentSelectStyle(selected, currentStyle);
    this.setProductDetails(type, newSelectedOpt, parent);
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.cardAnimationSetTimeout = setTimeout(
      function() {
        this.setState({ cardAnimation: "" });
      }.bind(this),
      700
    );
    if(this.props.productDetails.extraFields.length === 0){
      this.handleAddExtraField();
    }
    
    
  }

  handleExtraChange = (event) => {
    let names = event.target.name.split("|"); 
    let newProductDetails = JSON.parse(JSON.stringify(this.state.productDetails));
    newProductDetails.extraFields.map((field, key) => {
        if(key === parseInt(names[1], 10)){
          field[names[0]] = event.target.value;
        }
        return field;
    })
    this.setState({
      productDetails: newProductDetails
    })

    this.props.setParentProductDetails(newProductDetails);
  }

  componentWillReceiveProps(newProps){
    if(newProps.product.hasOwnProperty('addProduct') && _.isEqual(this.props.product.addProduct, newProps.product.addProduct) === false){
      if(typeof newProps.product.addProduct === "string"){
        return false;
      }
      this.props.onCloseModal();
    }
  }

  componentWillUnmount(){
    clearTimeout(this.cardAnimationSetTimeout);
  }

  handleAddExtraField = () => {
    let newProductDetails = JSON.parse(JSON.stringify(this.state.productDetails));

    newProductDetails.extraFields.push({name: "", value: ""});
    this.setState({
      productDetails: newProductDetails
    })

    this.props.setParentProductDetails(newProductDetails);
  }

  handleDeletedExtraField = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleSelectedDeleted = () => {
    let newProductDetails = JSON.parse(JSON.stringify(this.state.productDetails));
    newProductDetails.extraFields = this.state.productDetails.extraFields.filter((field, key) => { return this.state.selected.indexOf(key) === -1});

    this.setState({
      productDetails: newProductDetails,
      selected: []
    });

    this.props.setParentProductDetails(newProductDetails);
  }

  handleReleaseDateChange = (newDateTime) => {
    this.setProductDetails("releaseDate", newDateTime.format('YYYY-MM-DD'), "manufactureDetails");
  }



  render(){
    const {classes, productDetails} = this.props;
    const {
      selectedDiscount,
      selectedTax,
      taxSelect,
      discountSelect,
      valuationSelect,
      selectedValuation,
    } = this.state;
    
    return (
      <div>
          <div>
          <Card>
            <CardHeader color="primary">
              <h4>Add New Product</h4>
              <p>Business Details</p>
            </CardHeader>
            <CardBody>
              <h3>Price</h3>
              <Grid container>
              <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Cost Price"
                    id="costPrice"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type:"number",
                      value: productDetails.price.costPrice,
                      name: "costPrice|price",
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Unit Price"
                    id="unitPrice"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type:"number",
                      value: productDetails.price.unitPrice,
                      name: "unitPrice|price",
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Slash Price"
                    id="slashPrice"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type:"number",
                      value: productDetails.price.slashPrice,
                      name: "slashPrice|price",
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedDiscount" className={discountSelect}>Type or Select Product Discount Type</InputLabel>
                    <Select2 
                      id="selectedDiscount"
                      name="selectedDiscount"
                      value={selectedDiscount}
                      placeholder="Type or Select Discount Type"
                      onChange={this.handleDiscountChange}
                      options={['Fixed', 'Percent'].map((discount, key) => {
                          return {value: discount.toLowerCase(), label: discount}
                      })
                    }
                      />
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Discount"
                    id="discount"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type:"number",
                      value: productDetails.price.discount,
                      name: "discount|price",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedTax" className={taxSelect}>Type or Select Product Tax Type</InputLabel>
                    <Select2 
                      id="selectedTax"
                      name="selectedTax"
                      value={selectedTax}
                      placeholder="Type or Select Tax Type"
                      onChange={this.handleTaxChange}
                      options={['Fixed', 'Percent'].map((tax, key) => {
                          return {value: tax.toLowerCase(), label: tax}
                      })
                    }
                      />
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Tax"
                    id="tax"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type:"number",
                      name: "tax|price",
                      value: productDetails.price.tax,
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedValuation" className={valuationSelect}>Type or Select Product Valuation</InputLabel>
                    <Select2 
                      id="selectedValuation"
                      name="selectedValuation"
                      value={selectedValuation}
                      placeholder="Type or Select Valuation"
                      onChange={this.handleValuationChange}
                      options={['FIFO', 'LIFO', "AVCO"].map((valuation, key) => {
                          return {value: valuation, label: valuation}
                      })
                    }
                      />
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControlLabel
                  control={<Checkbox
                      checked={productDetails.deal}
                      tabIndex={-1}
                      onClick={this.handleCheckboxChange}
                      checkedIcon={<Check className={classes.checkedIcon}/>}
                      icon={<Check className={classes.uncheckedIcon}/>}
                      classes={{
                          checked: classes.checked,
                      }}
                      value={productDetails.deal === true? "checked": "unchecked"}
                      inputProps={{
                        name: "deal|price"
                      }}
                  />}
                  label="Deal of the Day" 
                  />
                </GridItem>

                </Grid>
                <h3>Shipping Details</h3>
                <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Shipping Cost"
                    id="shippingCost"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type:"number",
                      value: productDetails.shippingDetails.cost,
                      name: "cost|shippingDetails",
                      onChange: this.handleChange,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Length (Inches)"
                    id="length"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type:"text",
                      value: productDetails.shippingDetails.length,
                      name: "length|shippingDetails",
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Width (Inches)"
                    id="width"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: productDetails.shippingDetails.width,
                      name: "width|shippingDetails",
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Height (Inches)"
                    id="height"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps ={{
                      type: "text",
                      value: productDetails.shippingDetails.height,
                      name: "height|shippingDetails",
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Weight (kilogram)"
                    id="weight"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps ={{
                      type: "text",
                      value: productDetails.shippingDetails.weight,
                      name: "weight|shippingDetails",
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                </Grid>
                <h3>Downloadable Product</h3>
                <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControlLabel
                  control={<Checkbox
                      checked={productDetails.download.downloadable}
                      tabIndex={-1}
                      onClick={this.handleCheckboxChange}
                      checkedIcon={<Check className={classes.checkedIcon}/>}
                      icon={<Check className={classes.uncheckedIcon}/>}
                      classes={{
                          checked: classes.checked,
                      }}
                      value={productDetails.download.downloadable === true? "checked": "unchecked"}
                      inputProps={{
                        name: "downloadable|download"
                      }}
                  />}
                  label="Downloadable Product"
                  className={classes.marginTopFormControl} 
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Download Filename"
                    id="downloadFilename"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps ={{
                      type: "text",
                      value: productDetails.download.downloadName,
                      name: "downloadName|download",
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                </Grid>
                <h3>Variety</h3>
                <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControlLabel
                  control={<Checkbox
                      checked={productDetails.variety.options}
                      tabIndex={-1}
                      onClick={this.handleCheckboxChange}
                      checkedIcon={<Check className={classes.checkedIcon}/>}
                      icon={<Check className={classes.uncheckedIcon}/>}
                      classes={{
                          checked: classes.checked,
                      }}
                      value={productDetails.variety.options === true? "checked": "unchecked"}
                      inputProps={{
                        name: "options|variety"
                      }}
                  />}
                  label="Variety Options"
                  className={classes.marginTopFormControl} 
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText="Parent Product"
                    id="parent"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps ={{
                      type: "text",
                      value: productDetails.variety.parent,
                      name: "parent|variety",
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                </Grid>
                <h3>Analytics</h3>
                <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControlLabel
                  control={
                  <Checkbox
                      checked={productDetails.featured}
                      tabIndex={-1}
                      onClick={this.handleCheckboxChange}
                      checkedIcon={<Check className={classes.checkedIcon}/>}
                      icon={<Check 
                        className={classes.uncheckedIcon}/>}
                      classes={{
                          checked: classes.checked,
                      }}
                      value={productDetails.analytics.featured === true? "checked": "unchecked"}
                      inputProps={{
                        name: "featured|analytics"
                      }}
                  />}
                  label="Feature Product" 
                  />
                </GridItem>
              </Grid>
              <h3>Manufacture Details</h3>
              <Grid container>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Make"
                      id="make"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps ={{
                        type: "text",
                        value: productDetails.manufactureDetails.make,
                        name: "make|manufactureDetails",
                        onChange: this.handleChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Model Number"
                      id="modelNumber"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps ={{
                        type: "text",
                        value: productDetails.manufactureDetails.modelNumber,
                        name: "modelNumber|manufactureDetails",
                        onChange: this.handleChange
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                  <FormControl fullWidth>
                      <Datetime
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        onChange={this.handleReleaseDateChange}
                        value={productDetails.manufactureDetails.releaseDate}
                        inputProps={{
                           placeholder: "Datetime Picker Here",
                          name: "releaseDate|manufactureDetails"
                          }}
                      />
                    </FormControl>
                  </GridItem>
              </Grid>
              <h3>
                Product Extra Fields 
                <Button
                    justIcon
                    round
                    color="danger"
                    onClick={this.handleSelectedDeleted}
                    className={classes.floatRight}
                  >
                  <DeleteIcon/>
                </Button>

                <Button
                    justIcon
                    round
                    color="primary"
                    onClick={this.handleAddExtraField}
                    className={classes.floatRight}
                  >
                  <AddIcon/>
                </Button>
              </h3>
              
              {
                this.state.productDetails.extraFields.map((field, key) => {
                const selected = this.isSelected(key);
                return (<Grid container key={key}>
                  <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Extra Field Name"
                    id={`name${key}`}
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type:"text",
                      value: field.name,
                      name:`name|${key}|extraFields`,
                      onChange: this.handleExtraChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Extra Field Value"
                    id={`value${key}`}
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type:"text",
                      value: field.value,
                      name:`value|${key}|extraFields`,
                      onChange: this.handleExtraChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <FormControlLabel
                  control={
                  <Checkbox
                      checked={selected}
                      tabIndex={-1}
                      onClick={event => this.handleDeletedExtraField(event, key)}                     
                  />}
                  />
                </GridItem>
                </Grid>)
              })
              }
              
              
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
        </div>
        </div>
    );
  }
}

export default withStyles(styles)(BusinessDetails);
