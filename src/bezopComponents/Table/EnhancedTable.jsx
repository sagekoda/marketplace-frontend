/**
 * @author Odewale Ifeoluwa
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import _ from "lodash";
/**
 * @requires EnhancedTableHead
 * @@requires EnhancedTableToolbar
 */
import EnhancedTableHead from "./EnhanceTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";


import ImagePlaceholder from "../../views/Products/Category/ImagePlaceholder";


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 900,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    input:{
      display: "none"
    },
  });

function getSorting(order, orderBy) {
return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}



class EnhancedTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        order: 'asc',
        orderBy: this.props.orderBy,
        selected: [],
        page: 0,
        rowsPerPage: 10,
        columnData: this.props.columnData,
        data: []
      };
    }
  
    handleRequestSort = (event, property) => {
      const orderBy = property;
      let order = 'desc';
  
      if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
      }
  
      this.setState({ order, orderBy });
    };
  
    handleSelectAllClick = (event, checked) => {
      if (checked) {
        this.setState(state => ({ selected: state.data.map(n => n._id) }));
        return;
      }
      this.setState({ selected: [] });
    };
  
    handleClick = (event, id) => {
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
  
    handleChangePage = (event, page) => {
      this.setState({ page });
    };
  
    handleChangeRowsPerPage = event => {
      this.setState({ rowsPerPage: event.target.value });
    };
  
    isSelected = id => this.state.selected.indexOf(id) !== -1;

    componentDidMount(){
      //This is so add no-bar to body for this component
      document.body.className = "no-bar";
    }

    componentWillUnmount(){
      //Remove the no-bar class from body
      document.body.className = "";
    }

    componentWillReceiveProps(newProps){
      if(_.isEqual(this.props.data.sort(), newProps.data.sort()) === false){
        this.setState({data: newProps.data})
      }

      if(this.props.hasOwnProperty("currentSelected")){
        this.setState({ selected: [] });
      }
    }
  
  
    render() {
      const {  data, classes, tableTitle, properties, editButton, imagePanelDisplay,
               onDeleteClickSpec, itemName,postImage, collection, product } = this.props;
      const { order, orderBy, selected, rowsPerPage, page, columnData } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
      
      return (
        <Paper className={classes.root}>
          <EnhancedTableToolbar numSelected={selected.length} itemName={itemName} tableTitle={tableTitle} onDeleteClick={() => onDeleteClickSpec(selected)}/>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                columnData={columnData}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {data
                  .sort(getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n, pkey) => {
                    const isSelected = this.isSelected(n._id);
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n._id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox" onClick={event => this.handleClick(event, n._id)}>
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        {properties.map((property, key) => {
                            return (<TableCell
                                    key={`${n._id}.${key}`}
                                    component={property.component === true? "th" : "td"}
                                    padding={property.padding === true? "none" : "default"}
                                    numeric={property.numeric}>
                                    {property.img ?
                                    <ImagePlaceholder 
                                      srcImage={n[property.name]} 
                                      label={property.name} 
                                      fileInput={`${property.name}${pkey}`} 
                                      width={property.width}
                                      height={property.height}
                                      postImage={postImage}
                                      collection={collection}
                                      eachData = {n}
                                      />
                                      :
                                      property.ucword ? n[property.name].replace(/^\w/, c => c.toUpperCase()) :
                                      property.brandMap ? this.props.brands.filter(brand => {
                                        return (brand._id === n[property.name])
                                      }).map(brand => brand.name).join(""):
                                      property.catMap ? this.props.categories.filter(category => {
                                        return (category._id === n[property.name])
                                      }).map(category => category.name).join(""):
                                      n[property.name]
                                     
                                    }
                                    </TableCell>)
                        })}
                        {
                          imagePanelDisplay ? imagePanelDisplay(n) : null
                        }
                        {
                          editButton ? editButton(n) : null
                        }
                        
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      );
    }
  }
  
  EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(EnhancedTable);