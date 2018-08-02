//@desc This is the 'coupon details' form a vendor fills when adding coupons. 
//@require This form requires the stepper.jsx(A stepper). It is the first step in adding new coupons
//@author Sylvia Onwukwe
//@co author Odewale Ifeoluwa
import React from "react";
import Grid from "@material-ui/core/Grid";
import Datetime from "react-datetime";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {FormControl, Checkbox, FormControlLabel, withStyles } from "@material-ui/core";

import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button";
import checkboxAdnRadioStyle from "../../assets/jss/material-kit-react/checkboxAdnRadioStyle";


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
    marginTop:"20px",
    ...theme.MuiFormControl
  },
  ...checkboxAdnRadioStyle
});
class AddCoupon extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      couponDetails: this.props.couponDetails,
      selected: [],
    };
  }

  handleChange = event => {
    this.setCouponDetails(event.target.name, event.target.value);
  };
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.cardAnimation = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );

    this.handleAddSpecial();
  }

  componentWillUnmount(){
    clearTimeout(this.cardAnimation);
  }

  setCouponDetails = (type, value, parent = null) => {
    let newCounponDetails = JSON.parse(JSON.stringify(this.state.couponDetails));
    if(parent === null){
      newCounponDetails[type] = type === "code" ? value.toUpperCase() : value;
    }else{
      newCounponDetails[parent][type] = value
    }
    this.setState({
        couponDetails: newCounponDetails
    })
    this.props.setParentCouponDetails(newCounponDetails);
  }

   // The Begining of specArray
   handleAddSpecial = () => {
    let newCouponDetails = JSON.parse(JSON.stringify(this.state.couponDetails));

    newCouponDetails.specArray.push({name: "", value: ""});
    this.setState({
      couponDetails: newCouponDetails
    })

    this.props.setParentCouponDetails(newCouponDetails);
  }

  handleSelectedSpecial = (event, id) => {
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
    let newCouponDetails = JSON.parse(JSON.stringify(this.state.couponDetails));
    newCouponDetails.specArray = this.state.couponDetails.specArray.filter((field, key) => { return this.state.selected.indexOf(key) === -1});

    this.setState({
      couponDetails: newCouponDetails,
      selected: []
    });

    this.props.setParentCouponDetails(newCouponDetails);
  }

  handleSpecialChange = (event) => {
    let names = event.target.name.split("|"); 
    let newCouponDetails = JSON.parse(JSON.stringify(this.state.couponDetails));
    newCouponDetails.specArray.map((field, key) => {
        if(key === parseInt(names[1], 10)){
          field[names[0]] = event.target.value;
        }
        return field;
    })
    this.setState({
      couponDetails: newCouponDetails
    })

    this.props.setParentCouponDetails(newCouponDetails);
  }
// End of special offers

//Begining of Coupon Validation
  handleSpecialCouponChange = (newDateTime) => {

    if(typeof newDateTime === "object"){
      this.setCouponDetails("till", newDateTime.format('YYYY-MM-DD'));
    }else if(typeof newDateTime === "string"){
      this.setCouponDetails("till", newDateTime);
    }
    
  }

  // End of coupon date validation

componentWillReceiveProps(newProps){
  if(newProps.coupon.hasOwnProperty("addCoupon")){
    //Check if the coupon was created successfuly
      if(typeof newProps.coupon.addCoupon === "string"){
          return false;
      }
      //Clear the inputted value after creating coupon
      this.setState({
        couponDetails: this.props.couponDetails,
      })

  }
}
  render(){

    const {classes} = this.props;
    const {couponDetails} = this.state;

    return (
      <div>
          <div>
          <Card>
            <CardHeader color="primary">
              <h4>Create New Coupon</h4>
              <p>Discount Coupons</p>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Title"
                    id="title"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type: "text",
                      name: "title",
                      value: couponDetails.title,
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Code"
                    id="code"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type: "text",
                      name: "code",
                      value: couponDetails.code,
                      onChange: this.handleChange,
                      className: "textUpperCase"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Amount"
                    id="amount"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type: "number",
                      name: "amount",
                      value: couponDetails.amount,
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                      <Datetime
                        className={classes.marginTopFormControl}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        value= { couponDetails.till }
                        onChange={this.handleSpecialCouponChange}
                        inputProps={{
                           placeholder: "Coupon Duratiion",
                            name: "till",
                            
                          }}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
                <h3>
                Coupon Specials
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
                    onClick={this.handleAddSpecial}
                    className={classes.floatRight}
                  >
                  <AddIcon/>
                </Button>
              </h3>
              
              {
                this.state.couponDetails.specArray.map((field, key) => {
                const selected = this.isSelected(key);
                return (<Grid container key={key}>
                  <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Special Coupon Name"
                    id={`name${key}`}
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type:"text",
                      value: field.name,
                      name:`name|${key}|specArray`,
                      onChange: this.handleSpecialChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Special Coupon Value"
                    id={`value${key}`}
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                    inputProps={{
                      type:"text",
                      value: field.value,
                      name:`value|${key}|specArray`,
                      onChange: this.handleSpecialChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <FormControlLabel
                  control={
                  <Checkbox
                      checked={selected}
                      tabIndex={-1}
                      onClick={event => this.handleSelectedSpecial(event, key)}                     
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

export default withStyles(styles)(AddCoupon);
