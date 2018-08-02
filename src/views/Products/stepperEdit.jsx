//@desc this is a stepper that guides vendors in adding new product, "Add new Product" form has been added to each step
// the forms are businessdetails.jsx, productdetails.jsx and createproduct.jsx
//@author Sylvia Onwukwe
//@co author Odewale Ifeoluwa
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import _ from "lodash";
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import AddPage from "./productDetails.jsx"
import BusinessDetails from './businessdetails';


import Button from "../../components/CustomButtons/Button.jsx";
import Validator from '../../helpers/validator';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

class ProductStepperEdit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeStep: 0,
      skipped: new Set(),
      productDetails: {
        name: Validator.propertyExist(this.props.eachData, "name") ? this.props.eachData.name : "",
        code: Validator.propertyExist(this.props.eachData, "code") ? this.props.eachData.code : "",
        upc: Validator.propertyExist(this.props.eachData, "upc") ? this.props.eachData.upc : "",
        sku: Validator.propertyExist(this.props.eachData, "sku") ? this.props.eachData.sku : "",
        category: {
          main: Validator.propertyExist(this.props.eachData, "category", "main") ? this.props.eachData.category.main : "",
          sub: Validator.propertyExist(this.props.eachData, "category", "sub") ? this.props.eachData.category.sub : ""
        },
        brand: Validator.propertyExist(this.props.eachData, "brand")  ? this.props.eachData.brand : "",
        description: {
          color: Validator.propertyExist(this.props.eachData, "description", "color") ? this.props.eachData.description.color : [],
          unit: Validator.propertyExist(this.props.eachData, "description", "unit")  ? this.props.eachData.description.unit: "",
          long: Validator.propertyExist(this.props.eachData, "description", "long") ? this.props.eachData.description.long : "",
          short: Validator.propertyExist(this.props.eachData, "description", "short") ? this.props.eachData.description.short : "",
          tag: Validator.propertyExist(this.props.eachData, "description", "tag") ? this.props.eachData.description.tag : [],
        },
        variety:{
          options: Validator.propertyExist(this.props.eachData, "variety", "options") ? this.props.eachData.variety.options : false,
          parent: Validator.propertyExist(this.props.eachData, "variety", "parent") ?this.props.eachData.variety.parent : "",
        },
        price: {
          deal: Validator.propertyExist(this.props.eachData, "price", "deal") ? this.props.eachData.price.deal: false,
          valuation: Validator.propertyExist(this.props.eachData, "price", "valuation") ? this.props.eachData.price.valuation: "FIFO",

          costPrice: Validator.propertyExist(this.props.eachData, "price", "costPrice") ?  this.props.eachData.price.costPrice : 0.00,
          unitPrice: Validator.propertyExist(this.props.eachData, "price", "unitPrice") ?  this.props.eachData.price.unitPrice : 0.00,
          slashPrice: Validator.propertyExist(this.props.eachData, "price", "slashPrice") ?  this.props.eachData.price.slashPrice : 0.00,
          discount: Validator.propertyExist(this.props.eachData, "price", "discount") ?  this.props.eachData.price.discount : 0.00,
          discountType: Validator.propertyExist(this.props.eachData, "price", "discountType") ?  this.props.eachData.price.discountType : "fixed",
          tax: Validator.propertyExist(this.props.eachData, "price", "tax") ?  this.props.eachData.price.tax : 0.00,
          taxType: Validator.propertyExist(this.props.eachData, "price", "taxType") ?  this.props.eachData.price.taxType: "fixed",
        },
        shippingDetails: {
          cost: Validator.propertyExist(this.props.eachData, "shippingDetails", "cost") ? this.props.eachData.shippingDetails.cost : 0.00,
          length: Validator.propertyExist(this.props.eachData, "shippingDetails", "length") ?  this.props.eachData.shippingDetails.length : 0,
          height: Validator.propertyExist(this.props.eachData, "shippingDetails", "height") ? this.props.eachData.shippingDetails.height : 0,
          width: Validator.propertyExist(this.props.eachData, "shippingDetails", "width") ? this.props.eachData.shippingDetails.width : 0,
          weight: Validator.propertyExist(this.props.eachData, "shippingDetails", "weight") ?  this.props.eachData.shippingDetails.weight : 0,
        },
        manufactureDetails: {
          make: Validator.propertyExist(this.props.eachData, "manufactureDetails", "make") ?this.props.eachData.manufactureDetails.make : "",
          modelNumber: Validator.propertyExist(this.props.eachData, "manufactureDetails", "modelNumber")  ?this.props.eachData.manufactureDetails.modelNumber : "",
          releaseDate: Validator.propertyExist(this.props.eachData, "manufactureDetails", "releaseDate") ?this.props.eachData.manufactureDetails.releaseDate.match(/^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])/)[0]: ""
        },
        download: {
          downloadable: Validator.propertyExist(this.props.eachData, "download", "downloadable") ?this.props.eachData.download.downloadable : false,
          downloadName: Validator.propertyExist(this.props.eachData, "download", "downloadName") ? this.props.eachData.download.downloadName: "",
        },
        analytics:{
          featured: Validator.propertyExist(this.props.eachData, "analytics", "featured") ? 
           this.props.eachData.analytics.featured : false,
        },
        extraFields: Validator.propertyExist(this.props.eachData, "extraFields") ?this.props.eachData.extraFields: [],
        
      },
      selectElements: {
        selectedOption: Validator.propertyExist(this.props.eachData, "description", "tag") ? this.props.eachData.description.tag.map(tag => { return {value: tag, label: tag}}) : [],
        selectedColors: Validator.propertyExist(this.props.eachData, "description", "color") ? this.props.eachData.description.color.map(color => { return {value: color, label: color}}) : [],
        selectedBrand: null,
        selectedCategory: null,
        selectedSubCategory: null,
        selectedDiscount: Validator.propertyExist(this.props.eachData, "price", "discountType")  ? {value: this.props.eachData.price.discountType, label: this.props.eachData.price.discountType.replace(/^\w/, c => c.toUpperCase())} :null,
        selectedTax: Validator.propertyExist(this.props.eachData, "price", "taxType")  ? {value: this.props.eachData.price.taxType, label: this.props.eachData.price.taxType.replace(/^\w/, c => c.toUpperCase())} : null,
        selectedValuation: Validator.propertyExist(this.props.eachData, "price", "valuation")  ?  {value: this.props.eachData.price.valuation, label: this.props.eachData.price.valuation} : null,
      },
      selectStyle: {
        taxSelect: `react-select-label-${Validator.propertyExist(this.props.eachData, "price", "taxType")  ? "visible" : "hidden"}`,
        discountSelect: `react-select-label-${Validator.propertyExist(this.props.eachData, "price", "discountType")  > 0 ? "visible" : "hidden"}`,
        brandSelect: `react-select-label-${Validator.propertyExist(this.props.eachData, "brand") ? "visible" : "hidden"}`,
        categorySelect: `react-select-label-${Validator.propertyExist(this.props.eachData, "category", "main") ? "visible" : "hidden"}`,
        subCategorySelect: `react-select-label-${Validator.propertyExist(this.props.eachData, "category", "sub") ? "visible" : "hidden"}`,
        tagsSelect: `react-select-label-${Validator.propertyExist(this.props.eachData, "description", "tag") ? "visible" : "hidden"}`,
        colorsSelect: `react-select-label-${Validator.propertyExist(this.props.eachData, "description", "color") ? "visible" : "hidden"}`,
        valuationSelect: `react-select-label-${Validator.propertyExist(this.props.eachData, "price", "valuation")? "visible" : "hidden"}`,
      },
      productId: this.props.eachData.id,
    };
  }

  getSteps() {
    return ['Product Details', 'Business Details'];
  }

  getStepContent(step) {
    const {fetchProductBrands, fetchProductCategories, product} = this.props;
    const {productDetails, selectElements, selectStyle} = this.state;

    switch (step) {
      case 0:
        return <AddPage 
        fetchProductBrands={fetchProductBrands} fetchProductCategories={fetchProductCategories}
        product={product}
        productDetails={productDetails} setParentProductDetails={this.setParentProductDetails}
        selectElements={selectElements}
        setParentSelectElements={this.setParentSelectElements}
        selectStyle={selectStyle}
        setParentSelectStyle={this.setParentSelectStyle}
        />;
      case 1:
        return <BusinessDetails 
        productDetails={productDetails}
        product={product}
        setParentProductDetails={this.setParentProductDetails}
        selectElements={selectElements}
        setParentSelectElements={this.setParentSelectElements}
        selectStyle={selectStyle}
        setParentSelectStyle={this.setParentSelectStyle}
        onCloseModal={this.props.onCloseModal}
        />;
      default:
        return 'Unknown step';
    }
  }

  isStepOptional = step => {
    return step === 1;
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }


  
 setParentProductDetails = (productDetails) => {
    this.setState({
      productDetails: productDetails
    })
  }

  setParentSelectElements = (type, selectElements) => {
    let newSelectElement = JSON.parse(JSON.stringify(this.state.selectElements));
    newSelectElement[type] = selectElements;
    this.setState({
      selectElements: newSelectElement
    })
  }

  setParentSelectStyle = (type, selectStyle) => {
    let newSelectStyle = JSON.parse(JSON.stringify(this.state.selectStyle));
    newSelectStyle[type] = selectStyle;
    this.setState({
      selectStyle: newSelectStyle
    })
  }

  updateProduct = () => {
    this.props.putProductDetails(this.state.productDetails, this.state.productId);
  }

  componentWillReceiveProps(newProps){
    if(newProps.product.hasOwnProperty('updateProduct') && _.isEqual(this.props.product.updateProduct, newProps.product.updateProduct) === false){
      this.props.onCloseModal();
    }
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption"></Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - your product has been added
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Add New
              </Button>
            </div>
          ) : (
            <div>
              {this.getStepContent(activeStep)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}
                {
                  activeStep === steps.length - 1
                ?
                (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.updateProduct}
                  className={classes.button}
                >
                 Finish
                </Button>
                )
                :
                  (<Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                   Next
                  </Button>
                  )
                }
              </div>
            </div>
          )}
        </div>
       
      </div>
    );
  }
}

ProductStepperEdit.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ProductStepperEdit);