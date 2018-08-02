/*
*@desc the Language container used by REDUX 
*@author Sylvia Onwukwe
*/
import { connect } from 'react-redux';
import AdminLanguageComponent from '../../Admin/Language/languages.jsx'
import { 
  fetchStoreLanguages,
  postStoreLanguage,
  putStoreLanguage,
  deleteStoreLanguage
} from "../../actions/actions_admin_language"


const mapStateToProps = state => ({
  adminLanguage: state.adminLanguage
});

const mapDispatchToProps = (dispatch, newProps) => {
  return {
    fetchStoreLanguages: () => {
      dispatch(fetchStoreLanguages());
    },
    putStoreLanguage: (storeLanguage, languageID) => {
      dispatch(putStoreLanguage(storeLanguage, languageID));
    },
    postStoreLanguage: (storeLanguage) => {
      dispatch(postStoreLanguage(storeLanguage));
    },
    deleteStoreLanguage: (languageID) => {
      dispatch(deleteStoreLanguage(languageID));
    }
  }
}

const AdminLanguage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLanguageComponent);

export default AdminLanguage;
