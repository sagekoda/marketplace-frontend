//@desc This is the 'create new blog' component on the vendor's dashboard 
/**
 * @author Odewale Ifeoluwa
 */
import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select2 from "react-select";
import { withStyles } from '@material-ui/core/styles';
import 'react-select/dist/react-select.css';


import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Validator from "../../helpers/validator";
import Creatable from "../../../node_modules/react-select/lib/Creatable";

//The component Style
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: "100%",
    margin: "0px",
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  input:{
    display: "none"
  },
  fluidButton: {
    ...theme.button,
    width: "100%"
  }
});



class CreateBlog extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      blogDetails: this.props.blogDetails,
      selectedBlogKind: Validator.propertyExist(this.props.blogDetails, "kind")  && this.props.blogDetails.kind !== ""? {value: this.props.blogDetails.kind, label: this.props.blogDetails.kind.replace(/^\w/, c => c.toUpperCase())} : null,
      blogKindSelect: `react-select-label-${Validator.propertyExist(this.props.blogDetails, "kind") && this.props.blogDetails.kind !== "" ? "visible" : "hidden"}`,
      selectedBlogTag: Validator.propertyExist(this.props.blogDetails, "tag") ? this.props.blogDetails.tag.map( tag => {
        return {value: tag, label: tag.replace(/^\w/, c => c.toUpperCase())}
      })  : [],
      blogTagSelect: `react-select-label-${Validator.propertyExist(this.props.blogDetails, "tag") && this.props.blogDetails.tag.length > 0 ? "visible" : "hidden"}`,
      
    };
  }

  //Setting the state of all input feilds
  setBlogDetails = (type, value) => {
    let newblogDetails = JSON.parse(JSON.stringify(this.state.blogDetails));
    newblogDetails[type] = value;
    this.setState({
        blogDetails: newblogDetails,
    });
    this.props.setParentBlogDetails(newblogDetails);    
  }
  //Get the value of Input Element
  handleChange =  (event) => {
    this.setBlogDetails(event.target.name, event.target.value);
  };


  //This handles the blog kind select element
  handleBlogKindChange = (selectedBlogKind) => {
    this.setState({ selectedBlogKind });

    let blogKind = selectedBlogKind !== null?selectedBlogKind.value : "";

    let kindSelect = `react-select-label-${selectedBlogKind !== null ? "visible" : "hidden"}`;

    this.setBlogDetails("kind", blogKind);
      this.setState({
        blogKindSelect: kindSelect
      })
  }

  //This handles the blog kind select element
  handleBlogTagChange = (selectedBlogTag) => {
    this.setState({ selectedBlogTag });
    this.filterSelectedOption("tag",selectedBlogTag, 'blogTagSelect');
  }

  filterSelectedOption = (type, options, selected) => {

    let newSelectedOpt =  options.map(opt => {
      return opt.value
    });
    let currentStyle = `react-select-label-${options.length > 0 ? "visible" : "hidden"}` 

    this.setState({
      [selected] : currentStyle
    })

    this.setBlogDetails(type, newSelectedOpt);
  }


  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.cardAnimationSetTimeout = setTimeout(
        this.setState({ cardAnimaton: "" }),
      700
    );
  }
  //Clear the slider when moving to another page
  componentWillUnmount(){
    clearTimeout(this.cardAnimationSetTimeout);
  }

  render(){
    const {classes} = this.props;
    const {
          blogDetails,
           blogKindSelect,
           selectedBlogKind,
           blogTagSelect,
           selectedBlogTag,
           
          } = this.state;

    return (
      <div>
        
        <Card>
            <CardHeader color="primary">
              <div>
                <h4>New Blog Post</h4>
              </div>
              <div>
                <p>Create New Blog Post</p>
              </div>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Blog Title"
                    id="title"
                    inputProps={{
                      value: blogDetails.title,
                      name:"title",
                      onChange: this.handleChange
                    }}
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="selectedBlogKind" className={blogKindSelect}>Type or Select Blog Kind</InputLabel>
                    <Select2 
                      id="selectedBlogKind"
                      name="selectedBlogKind"
                      value={selectedBlogKind}
                      placeholder="Type or Select Blog Kind"
                      onChange={this.handleBlogKindChange}
                      options={[
                        {value: "post", label: "Post"},
                        {value: "news", label: "News"}
                      ]}
                      />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl className={classes.formControl} style={{marginTop:"15px"}}>
                    <InputLabel htmlFor="selectedBlogTag" className={blogTagSelect}>Type or Select Blog Tags</InputLabel>
                    <Creatable 
                      id="selectedBlogTag"
                      name="selectedBlogTag"
                      value={selectedBlogTag}
                      multi={true}
                      placeholder="Type or Select Blog Tags"
                      onChange={this.handleBlogTagChange}
                      />
                  </FormControl>
                </GridItem>
                <GridItem xs={12}>
                <CustomInput
                    labelText="Blog Summary"
                    id="summary"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      name: "summary",
                      value: blogDetails.summary,
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12}>
                <CustomInput
                    labelText="Blog Content"
                    id="content"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 20,
                      name: "content",
                      value: blogDetails.content,
                      onChange: this.handleChange
                    }}
                  />
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
      </div>
    );
  }
}

export default withStyles (styles)(CreateBlog);
