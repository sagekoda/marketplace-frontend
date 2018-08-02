/*
*@desc the container of Shop Setting used by REDUX 
*@author Odewale Ifeoluwa
*/
import { connect } from 'react-redux';
import ShopsComponent from '../views/Shop/shop';

const mapStateToProps = state => ({
  front: state.front
});

const Shops = connect(
  mapStateToProps,
)(ShopsComponent);

export default Shops;
