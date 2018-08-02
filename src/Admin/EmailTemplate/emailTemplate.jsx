//@desc this is the Email Template component on the admin dashboard.
//@author Sylvia Onwukwe
import React from 'react';

import NavPills from "../../components/NavPills/NavPills.jsx";
import PasswordReset from './PasswordReset/passwordReset';
import AccountRegistration from './AccountRegistration/account';
import AccountVerification from './AccountVerification/verification';
import OrderNotification from "./OrderNotification/order.jsx";
import Message from "./MessageNotification/notifications.jsx";


class EmailTemplate extends React.Component{
    render (){
        return (
            <NavPills 
            color="primary"
            tabs={[
                {
                    tabButton: "Password Reset",
                    tabContent: ( 
                        <PasswordReset />
                    )
                },
                {
                    tabButton: "Account Registration",
                    tabContent: (
                        <AccountRegistration />
                    )
                },
                {
                    tabButton: "Account Verification",
                    tabContent: (
                        <AccountVerification />
                    )
                },
                {
                    tabButton: "Order Notification",
                    tabContent: (
                        <OrderNotification />
                    )
                },
                {
                    tabButton: "Message Notification",
                    tabContent: (
                        <Message />
                    )
                },
                ]}
            />
        );
        }
}
export default EmailTemplate;