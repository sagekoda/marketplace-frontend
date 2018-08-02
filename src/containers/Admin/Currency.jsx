/*
*@desc the Currency container used by REDUX 
*@author Sylvia Onwukwe
*/
import { connect } from 'react-redux';
import CurrencyComponent from '../../Admin/Currency/currency.jsx';
import {
  postStoreCurrency,
  fetchStoreCurrencies,
  putStoreCurrency,
  deleteStoreCurrency
} from "../../actions/actions_admin_currency"

const mapStateToProps = state => ({
  adminCurrency: state.adminCurrency
});

const mapDispatchToProps = (dispatch, newProps) =>{
  return {
    postStoreCurrency : (storeCurrency) => {
      dispatch(postStoreCurrency(storeCurrency));
    },
    fetchStoreCurrencies: () => {
      dispatch(fetchStoreCurrencies());
    },
    putStoreCurrency: (storeCurrency, currencyID) => {
      dispatch(putStoreCurrency(storeCurrency, currencyID));
    },
    deleteStoreCurrency: (currencyID) => {
      dispatch(deleteStoreCurrency(currencyID));
    }
  }
}

const Currency = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyComponent);

export default Currency;
