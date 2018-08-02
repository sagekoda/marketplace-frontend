//@desc this component displays the list of all store currencies
//@author Sylvia Onwukwe
import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import NewCurrency from "./addCurrencyModal.jsx";
import TableCell from "@material-ui/core/TableCell";
import Snackbar from "@material-ui/core/Snackbar";
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";
import EnhancedTable from "../../bezopComponents/Table/EnhancedTable"

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Currency Name' },
  { id: 'kind', numeric: false, disablePadding: true, label: 'Currency Kind' },
  { id: 'code', numeric: false, disablePadding: true, label: 'Currency Code'},
  { id: 'description', numeric: false, disablePadding: true,  label: 'Currency Description' },
  { id: 'icon', numeric: false, disablePadding: true,  label: 'Icon' }
  

];

const properties = [
{name: "name", component: true, padding: true, numeric: false, img: false},
{name: "kind", component: false, padding: false, numeric: false, img: false},
{name: "code", component: false, padding: false, numeric: false},
{name: "description", component: false, padding: true, numeric: false, img: false},
{name: "icon", component: false, padding: true, numeric: false, img: true, width: 500, height: 500}];

class Currency extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        currency: [],
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "",
        deletedCurrency: 0,
    }
  }
  componentDidMount(){
    this.props.fetchStoreCurrencies();
  
  }
  editButtonDisplay = (n) =>{
    return (<TableCell>
    {<NewCurrency type="edit" eachData={n} adminCurrency={this.props.adminCurrency} specialMethod={this.props.putStoreCurrency}/>}
</TableCell>)
  }
  componentWillReceiveProps(newProps){
    if(newProps.adminCurrency.hasOwnProperty("currency")){
        this.setState({
          data: newProps.adminCurrency.currency
        })
    }
    if(newProps.adminCurrency.hasOwnProperty("addCurrency")){
      let newCurrency = JSON.parse(JSON.stringify(this.state.data));
      newCurrency.unshift(newProps.adminCurrency.addCurrency);

      this.setState({
        data: newCurrency,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully created a new currency",
      });
    }

    if(newProps.adminCurrency.hasOwnProperty("updateCurrency")){
      let newCurrency = JSON.parse(JSON.stringify(this.state.data));
      let updateCurrency;
      updateCurrency = newCurrency.map( currency => {
                if(newProps.adminCurrency.updateCurrency._id === currency._id){
                  return newProps.adminCurrency.updateCurrency;
                }else{
                  return currency;
                }
            });

      this.setState({
        data: updateCurrency,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated this currency",
      });
    }

  if(newProps.adminCurrency.hasOwnProperty("updateImage")){
    let newData = this.state.data.map(datum => {
      if(datum._id === newProps.adminCurrency.updateImage._id){
        return newProps.adminCurrency.updateImage
      }else{
        return datum
      }
    })
    this.setState({
        data: newData
    })
}
}

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  }

  handleDeleteClick = (currencyIDs) => {
    let counter = 0;
    for(const currencyID of currencyIDs){
      this.props.deleteStoreCurrency(currencyID);
      counter++;
      if(counter === currencyIDs.length){
        let newData = this.state.data.filter( datum =>  currencyIDs.indexOf(datum._id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${counter} currency ${counter === 1 ? "currency" : "currencies"}`,
        })
      }
    }
  }

 render (){
  const { postStoreCurrency, adminCurrency} = this.props;
  const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
  return (
    <Grid container>
    <GridItem xs={12} md={9}>
    </GridItem>
    <GridItem xs={6} md={3}>
    <NewCurrency adminCurrency={adminCurrency} addStoreCurrency={postStoreCurrency} type="add" />
    </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4>Currency</h4>
            <p>
              Showing Active Currencies
            </p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Store Currencies"
              properties={properties}
              editButton={this.editButtonDisplay}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              itemName={{single : "Currency", plural: "Currencies"}}
            />
          </CardBody>
        </Card>
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={snackBarOpenSuccess}
            onClose={this.onCloseHandlerSuccess}
          >
              <BezopSnackBar
              onClose={this.onCloseHandlerSuccess}
              variant="success"
              message={snackBarMessageSuccess}
              />
            </Snackbar>
      </GridItem>
    </Grid>
  );
}
}
export default Currency;
