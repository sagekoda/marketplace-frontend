/*
*@desc the Email Templates container used by REDUX 
*@author Sylvia Onwukwe
*/
import { connect } from 'react-redux';
import EmailTemplateComponent from '../../Admin/EmailTemplate/emailTemplate.jsx';


const mapStateToProps = state => ({
  front: state.front
});

const EmailTemplate = connect(
  mapStateToProps,
)(EmailTemplateComponent);

export default EmailTemplate;
