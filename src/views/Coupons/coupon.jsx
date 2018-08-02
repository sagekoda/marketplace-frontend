//@desc this is the discount coupon component
//@author Sylvia Onwukwe
//co author Odewale Ifeoluwa
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CreateCoupon from "./createbutton.jsx"
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";
import { TableCell, Snackbar } from "../../../node_modules/@material-ui/core";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import Validator from "../../helpers/validator";

const columnData = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Coupon Title' },
  { id: 'code', numeric: false, disablePadding: true, label: 'Coupon Code' },
  { id: 'amount', numeric: false, disablePadding: true,  label: 'Coupon Amount' },
  { id: 'till', numeric: false, disablePadding: true,  label: 'Valid Date' },
  { id: 'standing', numeric: false, disablePadding: true,  label: 'Status' },
];

const properties = [{name: "title", component: true, padding: true, numeric: false},
{name: "code", component: false, padding: false, numeric: false},
{name: "amount", component: false, padding: false, numeric: false},
{name: "till", component: false, padding: false, numeric: false, date: true},
{name: "standing", component: false, padding: false, numeric: false}
];

const couponDetails = {
  title : "",
  code: "",
  amount: 0,
  till : "",
  specArray: []
}

class Coupons extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      data : [],
      snackBarMessageSuccess: "SnackBar Message",
      snackBarOpenSuccess: false,
      variantSnackBar : "success",
    }
  }

  componentDidMount(){
    this.props.fetchCoupons();
  }

  componentWillReceiveProps(newProps){
    if(newProps.coupon.hasOwnProperty("getCoupon") && typeof newProps.coupon.getCoupon === "object"){
      this.setState({
        data: newProps.coupon.getCoupon
      })
    }

    if(newProps.coupon.hasOwnProperty("addCoupon") ){
      if(typeof newProps.coupon.addCoupon === "string"){
        return false;
      }
        //Stringify and parsing all coupons
      let newCoupons = JSON.parse(JSON.stringify(this.state.data));
      //Added the new coupon as the first element
      newCoupons.unshift(newProps.coupon.addCoupon);
      this.setState({
        data: newCoupons,
        snackBarOpenSuccess: true,
        variantSnackBar: "success",
        snackBarMessageSuccess: "You have successfully added a new Coupon",
      })
    }

    if(newProps.coupon.hasOwnProperty("updateCoupon") ){
      if(typeof newProps.coupon.updateCoupon === "string"){
        return false;
      }
        //Stringify and parsing all coupons
      let newCoupons = JSON.parse(JSON.stringify(this.state.data));
      //Added the new coupon as the first element
      let updatedCoupons = newCoupons.map(coupon => {
                if(coupon.id === newProps.coupon.updateCoupon.id){
                  return newProps.coupon.updateCoupon
                }else{
                  return coupon
                }
      })
      this.setState({
        data: updatedCoupons,
        snackBarOpenSuccess: true,
        variantSnackBar: "success",
        snackBarMessageSuccess: "You have successfully updated the Coupon",
      })
    }
  }

  editButtonDisplay = (n) => {
    const updateCouponDetails = {
      title : Validator.propertyExist(n, "title") ? n.title : "",
      code: Validator.propertyExist(n, "code") ? n.code : "",
      amount: Validator.propertyExist(n, "amount") ? n.amount : "",
      till : Validator.propertyExist(n, "till") ? n.till.match(/^\d{4}[/-]\d{2}[/-]\d{2}/)[0] : "",
      specArray: Validator.propertyExist(n, "specArray") ?n.specArray : [],
    }
      return (
        <TableCell>
            <CreateCoupon
                type="edit"
                putCouponDetails={this.props.putCouponDetails}
                coupon={this.props.coupon}
                couponDetails={updateCouponDetails}
                eachData={n}
              />
        </TableCell>
      )
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  } 

  handleDeleteClick = (couponIDs) => {
    let counter = 0;
    for(const couponID of couponIDs){
      this.props.deleteCoupon(couponID);
      counter++;
      if(counter === couponIDs.length){
        let newData = this.state.data.filter( datum =>  couponIDs.indexOf(datum.id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${counter} ${counter === 1 ? "coupon" : "coupons"}`,
        })
      }
    }
  }

 


  render(){
    const { classes, postCouponDetails, coupon } = this.props;
    const {data, snackBarMessageSuccess, snackBarOpenSuccess, variantSnackBar,} = this.state;

    return (
      <Grid container>
      <GridItem xs={12} md={10}>
      </GridItem>
      <GridItem xs={6} md={2}>
      <CreateCoupon
        type="add"
        postCouponDetails={postCouponDetails}
        coupon={coupon}
        couponDetails={couponDetails}
      />
      </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Discount Coupons</h4>
              <p className={classes.cardCategoryWhite}>
                Manage Discounts
              </p>
            </CardHeader>
            <CardBody>
              <EnhancedTable
                 orderBy="title"
                 columnData={columnData}
                 data={data}
                 tableTitle="All Discount Coupons"
                 properties={properties}
                 editButton={this.editButtonDisplay}
                 onDeleteClickSpec={this.handleDeleteClick}
                 currentSelected = {[]}
                 collection="coupon"
                 itemName={{single : "Coupon", plural: "Coupons"}}
              />
            </CardBody>
          </Card>
        </GridItem>
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={snackBarOpenSuccess}
            onClose={this.onCloseHandlerSuccess}
          >
              <BezopSnackBar
              onClose={this.onCloseHandlerSuccess}
              variant={variantSnackBar}
              message={snackBarMessageSuccess}
              />
            </Snackbar>
      </Grid>
    );

  }
}

export default Coupons;
