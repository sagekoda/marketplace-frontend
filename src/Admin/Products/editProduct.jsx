//@desc Admin can edit product details
//@author Sylvia Onwukwe
import React from "react";
import Grid from "@material-ui/core/Grid";

import GridItem from "../../components/Grid/GridItem.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { InputAdornment } from "@material-ui/core";
import Button from "../../components/CustomButtons/Button";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  state = {
    age: '',
    name: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.cardAnimation = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillMount (){
    clearTimeout (this.cardAnimation);
  }
  render(){

    return (
      <div>
          <div>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Black Jean"
                    id="product_name"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  /><InputAdornment> Product Title</InputAdornment>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Men Wears"
                    id="category"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  /><InputAdornment> Product Category</InputAdornment>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Jeans"
                    id="subcategory"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps ={{
                      type: "text"
                    }}
                  /> <InputAdornment> Product Subcategory</InputAdornment>
                </GridItem>
              </Grid>
              <Grid container>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="30"
                    id="quantity"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{type:"number"}}
                  /><InputAdornment> Product Stock</InputAdornment>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="$3.52"
                    id="selling-price"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{type:"number"}}
                  /><InputAdornment> Product Selling Price</InputAdornment>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="$3"
                    id="cost-price"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps ={{
                      type: "number"
                    }}
                  /><InputAdornment> Product Cost Price</InputAdornment>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                <CustomInput formControlProps={{ fullWidth:true}} 
                inputProps ={{value:""}} />
                
                </GridItem>
            <br />
                <GridItem xs={12} sm={12} md={6}>
                  <img src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" alt="Shoe and Shirt"
                  width="400px" />  
                       <InputAdornment> Product Image</InputAdornment>
                </GridItem>
               
                <GridItem xs={12} sm={12} md={6}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                  <CustomInput
                    id="product-description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 3
                    }}
                  /><InputAdornment> Product Description</InputAdornment>
                </GridItem> 
           </Grid>
            <CardFooter>
                <Button color="danger"> Ban </Button>
                <Button color="primary"> Update </Button>
            </CardFooter>
        
        </div>
        </div>
    );
  }
}

export default EditProduct;
