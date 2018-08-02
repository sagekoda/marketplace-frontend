/**
 * @description The Users Access Control Component.
 * @author Mohammed Odunayo
 * @name AccessControl
 */

import jwtDecode from 'jwt-decode';

const LS_KEY = "bezop-login:";
const API_URL = (process.env.NODE_ENV === "development")?
    process.env.REACT_APP_DEV_API_URL
    :
    process.env.REACT_APP_PROD_API_URL;

export const userIs = users => {
    const auth = getUsersToken("all");
    let output = false;

    for(let user of users){
        if(auth[user]){
            try {
                jwtDecode(auth[user].accessToken)
                output = true;
            }
            catch(ex) {
                unsetUsersAccount(user);
            }
        }
    }

    return output;
};


export const getUserIds = user => {
    const auth = getUsersToken(user);
    
    if(auth){
        try{
            const ids = jwtDecode(auth.accessToken).payload;
            return ids;
        }
        catch(ex){
            localStorage.removeItem(`${LS_KEY}${user}`);
            return false;
        }
    }
    return false;
};

export const getIdFromToken = (token) => {
    try{
        const ids = jwtDecode(token).payload;
        return ids.id;
    }
    catch(ex){
        return false;
    }
};

export const isVerified = user => {
    const {accessToken} = getUsersToken(user)
    const id = getIdFromToken(accessToken);
    const accountStatus = (JSON.parse(sessionStorage.getItem(id)))?
        JSON.parse(sessionStorage.getItem(id))
        :
        setUsersAccount({user, id, accessToken}).profile.account;
    
    if(accountStatus.completeProfile && accountStatus.emailVerified && accountStatus.domainNameSet && accountStatus.businessVerified){
        return true;
    }
    return false;
};

export const getAccountStatus = user => {
    const {accessToken} = getUsersToken(user)
    const id = getIdFromToken(accessToken);
    return( (JSON.parse(sessionStorage.getItem(id)))?
        JSON.parse(sessionStorage.getItem(id))
        :
        setUsersAccount({user, id, accessToken}).profile.account
    );
};

export const getUserData = ({ user, id, accessToken }) => {
    return fetch(`${API_URL}/${user.toLowerCase()}s/${id}`, {
        headers: {
          "Authorization": "Bearer "+accessToken
        },
        method: "GET"
      })
    .then((response) => response.json())
      .then((responseJSON) => {
        if(responseJSON.success && Object.keys(responseJSON.data).length > 1) {
          return responseJSON.data;
        }else{
          return false;
        }
    });
};

export const setUsersAccount = ({user, id, accessToken}) => {
    return getUserData({user, id, accessToken})
    .then( profile => {
        const data = {accessToken, profile};
        localStorage.setItem(LS_KEY+user, JSON.stringify(data));
        sessionStorage.setItem(id, JSON.stringify(profile.account));
        return {accessToken, profile};
    });
};

export const unsetUsersAccount = user => {
    const {accessToken} = getUsersToken(user)
    const id = getIdFromToken(accessToken);
    localStorage.removeItem(LS_KEY+user);
    sessionStorage.removeItem(id);
};

export const getUsersToken = user => {
    const auth = {
        customer: JSON.parse(localStorage.getItem(`${LS_KEY}customer`)),
        vendor: JSON.parse(localStorage.getItem(`${LS_KEY}vendor`)),
        admin: JSON.parse(localStorage.getItem(`${LS_KEY}admin`)),
    };

    switch(user){
        case 'customer':
            return auth.customer;
        case 'vendor':
            return auth.vendor;
        case 'admin':
            return auth.admin;
        case 'all':
            return {
                customer: auth.customer,
                vendor: auth.vendor,
                admin: auth.admin
            };
        default:
            return {};
    }
}