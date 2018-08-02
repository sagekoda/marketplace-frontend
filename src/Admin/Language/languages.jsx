import React from "react";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";

/**
 * @requires lodash
 */
import _ from "lodash";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import AddLanguage from "./modalAddLanguages";
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import BezopSnackBar from "../../assets/jss/bezop-mkr/BezopSnackBar";


import EnhancedTable from "../../bezopComponents/Table/EnhancedTable";


const columnData = [
  { id: 'word', numeric: false, disablePadding: true, label: 'Word' },
  { id: 'english', numeric: false, disablePadding: true, label: 'English' },
  { id: 'french', numeric: false, disablePadding: true,  label: 'French' },
  { id: 'spanish', numeric: false, disablePadding: true,  label: 'Spanish' },
  { id: 'bangla',  numeric: false, disablePadding: true,  label: 'Bangla' },
  { id: 'arabic',  numeric: false, disablePadding: true,  label: 'Arabic' },
  { id: 'chinese',  numeric: false, disablePadding: true,  label: 'Chinese' },
];

const properties = [{name: "word", component: true, padding: true, numeric: false, img: false},
{name: "english", component: false, padding: false, numeric: false, img: false},
{name: "french", component: false, padding: false, numeric: false, img: false},
{name: "spanish", component: false, padding: false, numeric: false, img: false},
{name: "bangla", component: false, padding: false, numeric: false, img: false},
{name: "arabic", component: false, padding: false, numeric: false, img: false},
{name: "chinese", component: false, padding: false, numeric: false, img: false}];

class AdminLanguage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        language: [],
        data: [],
        snackBarOpenSuccess: false,
        snackBarMessageSuccess: "",
        deletedLanguage: 0,
    }
  }

  componentDidMount(){
    this.props.fetchStoreLanguages();
  }

  editButtonDisplay = (n) =>{
    return (<TableCell>
    {<AddLanguage type="edit" eachData={n} adminLanguage={this.props.adminLanguage} specialMethod={this.props.putStoreLanguage}/>}
</TableCell>)
  }

  componentDidUpdate(prevProps){
    if(this.props.adminLanguage.hasOwnProperty("language") && (_.isEqual(this.props.adminLanguage.language, prevProps.adminLanguage.language) === false)){
        this.setState({
          data: this.props.adminLanguage.language
        })
    }

    if(this.props.adminLanguage.hasOwnProperty("addLanguage") && (_.isEqual(this.props.adminLanguage.addLanguage, prevProps.adminLanguage.addLanguage) === false)){
      let newLanguage = JSON.parse(JSON.stringify(this.state.data));
      newLanguage.unshift(this.props.adminLanguage.addLanguage);

      this.setState({
        data: newLanguage,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully created a new language",
      });
    }

    if(this.props.adminLanguage.hasOwnProperty("updateLanguage") && (_.isEqual(this.props.adminLanguage.updateLanguage, prevProps.adminLanguage.updateLanguage) === false)){
      let newLanguage = JSON.parse(JSON.stringify(this.state.data));
      let updateLanguage;
      updateLanguage = newLanguage.map( language => {
                if(this.props.adminLanguage.updateLanguage._id === language._id){
                  return this.props.adminLanguage.updateLanguage;
                }else{
                  return language;
                }
            });

      this.setState({
        data: updateLanguage,
        snackBarOpenSuccess: true,
        snackBarMessageSuccess: "You have successfully updated this language",
      });
    }
  }

  onCloseHandlerSuccess = () => {
    this.setState({
      snackBarOpenSuccess: false
    })
  }


  handleDeleteClick = (langaugeIDs) => {
    let counter = 0;
    for(const langaugeID of langaugeIDs){
      this.props.deleteStoreLanguage(langaugeID);
      counter++;
      if(counter === langaugeIDs.length){
        let newData = this.state.data.filter( datum =>  langaugeIDs.indexOf(datum._id)  === -1) 
        this.setState({
          data: newData,
          snackBarOpenSuccess: true,
          snackBarMessageSuccess: `You have successfully deleted ${counter} langauge ${counter === 1 ? "language" : "language"}`,
        })
      }
    }
  }

  render(){
  const { postStoreLanguage, adminLanguage} = this.props;
  const { data, snackBarOpenSuccess, snackBarMessageSuccess } = this.state;
  return (
    <Grid container>
    <GridItem xs={12} md={9}>
    </GridItem>
    <GridItem xs={6} md={3}>
    <AddLanguage adminLanguage={adminLanguage} addStoreLanguage={postStoreLanguage} type="add"/>
    </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
              <h4>All Languages</h4>
              <p>List of All Languages</p>
          </CardHeader>
          <CardBody>
          <EnhancedTable
              orderBy="name"
              columnData={columnData}
              data={data}
              tableTitle="All Languages"
              properties={properties}
              editButton={this.editButtonDisplay}
              onDeleteClickSpec={this.handleDeleteClick}
              currentSelected = {[]}
              itemName={{single : "Language", plural: "Languages"}}
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

export default AdminLanguage;