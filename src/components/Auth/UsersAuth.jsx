/**
 * @description The Users Authentication Component.
 * @author Mohammed Odunayo
 * @class UsersAuth
 * @name UsersAuth
 */

import React from "react";
import Links from "react-router-dom/Link"
import { Dialog, DialogTitle, DialogContent, DialogActions, Slide } from "@material-ui/core";
import { VerifiedUser, Link } from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "../CustomButtons/Button.jsx";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle.jsx";
import BezopLogo from "../../assets/img/BezopLogo.svg";
import MetaMaskLogo from "../../assets/img/metamask.png";
import { getIdFromToken, setUsersAccount, unsetUsersAccount } from "./AccessControl.jsx";

export const LS_KEY = "bezop-login:";
const API_URL = (process.env.NODE_ENV === "development")?
    process.env.REACT_APP_DEV_API_URL
    :
    process.env.REACT_APP_PROD_API_URL;

const NO_METAMASK = "NO_METAMASK";
const NOT_SIGNED_UP = "NOT_SIGNED_UP";
const INACTIVE_METAMASK = "INACTIVE_METAMASK";
const ALREADY_SIGNED_UP = "ALREADY_SIGNED_UP";
const AUTH_FAILED = "AUTH_FAILED";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class UsersAuth extends React.Component {
    constructor(props){
        super(props);
        this.auth = {
            customer: JSON.parse(localStorage.getItem(`${LS_KEY}customer`)),
            vendor: JSON.parse(localStorage.getItem(`${LS_KEY}vendor`)),
            admin: JSON.parse(localStorage.getItem(`${LS_KEY}admin`)),
        };
        this.state = {
            auth: this.auth,
            loading: false,
            verified: false,
            initial: true,
            modal: false,
            modalMessage: null,
            actionButton: null,
            footButton: null,
        };

        this.events = this.props.events;
        this.error = null;

        this.getUserAddress = this.getUserAddress.bind(this);
        this.userSignMessage = this.userSignMessage.bind(this);
        this.userAuthenticate = this.userAuthenticate.bind(this);
        this.userLogOut = this.userLogOut.bind(this);
        this.userLogIn = this.userLogIn.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.usersLogin = this.usersLogin.bind(this);
        this.usersSignUp = this.usersSignUp.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.metaMaskInstalled = this.metaMaskInstalled.bind(this);
        this.metaMaskActive = this.metaMaskActive.bind(this);
        this.loading = this.loading.bind(this);
        this.verified = this.verified.bind(this);
        this.completed = this.completed.bind(this);

        this.events.on('usersLogin', this.startLogin.bind(this));
        this.events.on('pageLogin', this.pageLogin.bind(this));
        this.events.on('usersSignUp', this.startSignUp.bind(this));
        this.events.on('pageSignUp', this.pageSignUp.bind(this));
        this.events.on('usersLogOut', this.userLogOut.bind(this));
    }

    startLogin = user => {
        let actionButton = <Button
                color="warning"
                size="lg"
                round
                onClick={() => this.usersLogin(user)}
                style={{fontWeight: "bold"}}
                disabled={false}
            >
                Login as {user}
            </Button>;
    
        this.setState(...this.state, {
            loading: false,
            verified: false,
            initial: true,
            modal: true,
            modalMessage: "Login With METAMASK",
            actionButton: actionButton,
            footButton: null,
        });
    };

    pageLogin = user => {
        let footButton = <Button
            color="primary"
            size="lg"
            round
            simple
            onClick={() => this.pageSignUp(user)}
            style={{fontWeight: "bold"}}
            disabled={false}
        >
            Sign Up as {user}
        </Button>;

        let actionButton = <Button
            color="warning"
            size="lg"
            round
            onClick={() => this.usersLogin(user)}
            style={{fontWeight: "bold"}}
            disabled={false}
        >
            Login as {user}
        </Button>;
    
        this.setState(...this.state, {
            loading: false,
            verified: false,
            initial: true,
            modal: true,
            modalMessage: "Login With METAMASK",
            actionButton: actionButton,
            footButton: footButton,
        });
    };

    pageSignUp = user => {
        let footButton = <Button
            color="primary"
            size="lg"
            round
            simple
            onClick={() => this.pageLogin(user)}
            style={{fontWeight: "bold"}}
            disabled={false}
        >
            Login as {user}
        </Button>;

        let actionButton = <Button
            color="warning"
            size="lg"
            round
            onClick={() => this.usersSignUp(user)}
            style={{fontWeight: "bold"}}
            disabled={false}
        >
            Sign Up as {user}
        </Button>;
    
        this.setState(...this.state, {
            loading: false,
            verified: false,
            initial: true,
            modal: true,
            modalMessage: "Sign Up With METAMASK",
            actionButton: actionButton,
            footButton: footButton,
        });
    };

    startSignUp = user => {
        let actionButton = <Button
                color="warning"
                size="lg"
                round
                onClick={() => this.usersSignUp(user)}
                style={{fontWeight: "bold"}}
                disabled={false}
            >
                Sign Up as {user}
            </Button>;
    
        this.setState(...this.state, {
            loading: false,
            verified: false,
            initial: true,
            modal: true,
            modalMessage: "Sign Up With METAMASK",
            actionButton: actionButton,
            footButton: null,
        });
    };

    loading = (action, message) => {
        let actionButton = <Button
                size="lg"
                round
                style={{fontWeight: "bold"}}
                disabled={true}
            >
                <i className={"fas fa-spinner fa-spin"} >&nbsp;</i>
                {action}
            </Button>;

        this.setState(...this.state, {
            loading: true,
            verified: false,
            initial: false,
            modal: true,
            modalMessage: message,
            actionButton: actionButton,
        });
    };

    verified = (action, message) => {
        let actionButton = <Button
                size="lg"
                round
                style={{fontWeight: "bold"}}
                disabled={true}
            >
                <i className={"fas fa-spinner fa-spin"} >&nbsp;</i>
                {action}
            </Button>;
    
        this.setState(...this.state, {
            loading: false,
            verified: true,
            initial: false,
            modal: true,
            modalMessage: message,
            actionButton: actionButton,
            footButton: null,
        });
    };

    completed = (user, message) => {

        let url, profile;

        switch(user){
            case "customer":
                url = "/profile";
                profile = "Profile";
                break;
            case "vendor":
                url = "/dashboard";
                profile = "Dashboard";
                break;
            case "admin":
                url = "/admin";
                profile = "Control Panel";
                break;
            default:
        }

        let actionButton = <Links to={url}>
            <Button
                size="lg"
                color="primary"
                round
                style={{fontWeight: "bold"}}
                disabled={false}
            >
                <i className={"fas fa-check"} >&nbsp;</i>
                Visit your&nbsp;{profile}
            </Button>
        </Links>;
    
        this.setState(...this.state, {
            loading: false,
            verified: true,
            initial: false,
            modal: true,
            modalMessage: message,
            actionButton: actionButton,
            footButton: null,
        });
    };

    metaMaskInstalled = () => {
        if (!window.web3) {
            this.error = {
                message: `Please Install MetaMask on your browser before you can 'Login' or 'Sign UP'.`,
                type: NO_METAMASK,
                action: <a
                    href={"https://metamask.io/"}
                    target={"_blank"}
                    color={"warning"}
                    size={"lg"}
                    round={"true"}
                    simple={"true"}
                    style={{fontWeight: "bold", color: "orange"}}
                    disabled={false}
                >
                    <i className={"fas fa-external-link-alt"} >&nbsp;</i>
                    Install METAMASK
                </a>
            };
            return false
        }
        return true;
    };

    metaMaskActive = () => {
        if (!window.web3.eth.coinbase) {
            this.error = {
                message: "Please 'Login or Activate' your MetaMask extension on your Browser before you can 'Login' or 'Sign Up'.",
                type: INACTIVE_METAMASK,
                action: null
            };
            return false;
        }
        return true;
    };

    getUserAddress = () => {
        if (!this.metaMaskInstalled()) {
            return false;
        }

        if (!this.metaMaskActive()) {
            return false;
        }

        return window.web3.eth.coinbase;
    };

    usersSignUp = user => {
        const authType = "signup";
        const userType = user;
        
        let userAddress = this.getUserAddress();

        if(!userAddress) {
            this.handleErrors(this.error);
        }
        else {
            userAddress = userAddress.toLowerCase();
            
            this.loading(" Please wait...", "Loading please wait...");
        
            // 1a. Look if user with current publicAddress has already signed up.
            fetch(`${API_URL}/${userType.toLowerCase()}/${authType}/publicaddress/${userAddress}`)
            .then(response => response.json())
        
            // 1b. If yes, retrieve { publicAddress, nonce, authType } from responseJSON.data
            .then((responseJSON) => {
                if(responseJSON.success && Object.keys(responseJSON.data).length > 1 ){
                    responseJSON.user = user;
                    return (responseJSON);
                }else{
                    this.error = {
                        message: "You've Signed Up already, Login Now.",
                        type: ALREADY_SIGNED_UP,
                        action: <Button
                            color="warning"
                            size="lg"
                            round
                            onClick={() => this.usersLogin(user)}
                            style={{fontWeight: "bold"}}
                            disabled={false}
                        >
                            Login as {user}
                        </Button>
                    };
                    throw Error("warning");
                }
            })
        
            // 2. Popup MetaMask confirmation modal to sign message
            .then(this.userSignMessage)
        
            // 3. Send signature to backend on the /auth route
            .then(this.userAuthenticate)
        
            // 4. Pass accessToken back to parent component (to save it in localStorage)
            .then(this.userLogIn)
        
            .catch(err => {
                if(err.message !== "warning"){
                    this.handleErrors(err.message);
                }
                else {
                    this.handleErrors(this.error);
                }
            });
        }
    };

    usersLogin = user => {
        const authType = "login";
        const userType = user;
        
        let userAddress = this.getUserAddress();

        if(!userAddress) {
            this.handleErrors(this.error);
        }
        else {
            userAddress = userAddress.toLowerCase();
            
            this.loading(" Please wait...", "Loading please wait...");
        
            // 1a. Look if user with current publicAddress has already signed up.
            fetch(`${API_URL}/${userType.toLowerCase()}/${authType}/publicaddress/${userAddress}`)
            .then(response => response.json())
        
            // 1b. If yes, retrieve { publicAddress, nonce, authType } from responseJSON.data
            .then((responseJSON) => {
                if(responseJSON.success && Object.keys(responseJSON.data).length > 1 ){
                    responseJSON.user = user;
                    return (responseJSON);
                }else{
                    this.error = {
                        message: "Please Sign Up before you can Login.",
                        type: NOT_SIGNED_UP,
                        action: <Button
                            color="warning"
                            size="lg"
                            round
                            onClick={() => this.usersSignUp(user)}
                            style={{fontWeight: "bold"}}
                            disabled={false}
                        >
                            Sign Up as {user}
                        </Button>
                    };

                    throw Error("warning");
                }
            })
        
            // 2. Popup MetaMask confirmation modal to sign message
            .then(this.userSignMessage)
        
            // 3. Send signature to backend on the /auth route
            .then(this.userAuthenticate)
        
            // 4. Pass accessToken back to parent component (to save it in localStorage)
            .then(this.userLogIn)
        
            .catch(err => {
                if(err.message !== "warning"){
                    this.handleErrors(err.message);
                }
                else {
                    this.handleErrors(this.error);
                }
            });
        }
    };

    handleErrors = err => {
        switch(err.type){
            case NO_METAMASK:
            case INACTIVE_METAMASK:
            case NOT_SIGNED_UP:
            case ALREADY_SIGNED_UP:
                this.setState(...this.state, {
                    loading: false,
                    verified: false,
                    initial: true,
                    modal: true,
                    modalMessage: err.message,
                    actionButton: err.action,
                });
                break;
            case AUTH_FAILED:
            default:
                this.setState(...this.state, {
                    loading: false,
                    verified: false,
                    initial: true,
                    modal: true,
                    modalMessage: err,
                    actionButton: null,
                });
        }
    };

    userAuthenticate = ({ publicAddress, signature, authType, user }) => {
        return fetch(`${API_URL}/${user.toLowerCase()}/auth/${authType}`, {
          body: JSON.stringify({ publicAddress, signature }),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        }).then((response) => response.json())
          .then((responseJSON) => {
            if(responseJSON.success && Object.keys(responseJSON.data).length === 1) {
              responseJSON.user = user.toLowerCase();
              return responseJSON;
            }else{
              throw new Error(`Authentication Failed: ${(responseJSON.message)?responseJSON.message : responseJSON.error.message}`);
            }
        });
    };

    userSignMessage = ({ data, user }) => {
        const { publicAddress, nonce, authType } = data;
        this.loading(" Please wait...", "Waiting for MetaMask Signature.");
        return new Promise((resolve, reject) => {
            return window.web3.personal.sign(
                window.web3.fromUtf8(`I am signing my one-time nonce: ${nonce} to ${authType}`),
                publicAddress,
                (err, signature) => {
                    if (err) return reject(err);
                    this.verified(`Authenticating...`, `Signature Confirmed.`);
                    return resolve({ publicAddress, signature, authType, user });
                }
            )}
        );
    };

    userLogIn = ({ data, user }) => {
        const accessToken = data.accessToken;
        const id = getIdFromToken(accessToken);
        const profile = setUsersAccount({user, id, accessToken})
        .then( () => {
            this.setState({ auth: {[user]: profile} });
            this.completed(user, `You're now logged in.`);
        });
    };

    userLogOut = user => {
        unsetUsersAccount(user);
        this.setState({ auth: {[user]: undefined} });
        window.location.assign("/");
    };

    handleClose = () => {
        this.setState(...this.state, {
            auth: this.auth,
            loading: false,
            verified: false,
            initial: true,
            modal: false,
            modalMessage: null,
            actionButton: null,
        });
    };

    render(){
        const {classes} = this.props;
        const { 
            modal,
            loading,
            verified,
            modalMessage,
            actionButton,
            initial,
        } = this.state;

        const ModalContent = <div>
            <h2 style={{textAlign: "center", marginTop: "10px"}}>
                <img src={BezopLogo} alt={"Logo"} style={{marginBottom: "0px", height: "80px"}} />
                <Link style={{fontSize: "1.5em", margin: "auto 20px", marginBottom: "-20px"}} />
                <img src={MetaMaskLogo} alt={"Logo"} style={{marginBottom: "0px", height: "80px"}} />
                <br/>
                {(loading)? 
                    <span className={"fa-stack fa-1x"}>
                        <i className={"fas fa-spinner fa-spin fa-stack-2x"}></i>
                        <i className={"fas fa-user fa-stack-1x"}></i>
                    </span>
                    :
                    null
                }
                {(initial)? 
                    <i className={"fas fa-user"}></i>
                    :
                    null
                }
                {(verified)? 
                    <span className={"fa-stack fa-1x"}>
                        <VerifiedUser style={{fontSize: "2em"}} />
                    </span>
                    :
                    null
                }
            </h2>
            <h3 style={{textAlign: "center"}}>{modalMessage}</h3>
            <h3 style={{textAlign: "center"}}>
                {actionButton}
            </h3>
        </div>;

        return(
            <span>
                <Dialog
                classes={{
                    root: classes.center,
                    paper: classes.modal,
                }}
                open={modal}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="modal-slide-title"
                aria-describedby="modal-slide-description"
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                scroll={"body"}
                >
                <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                    style={{minWidth: "400px", borderBottom: "1px solid lightgray", paddingBottom: "10px"}}
                >
                    <h3 style={{textAlign: "center", margin: "0px"}}>Bezop Store</h3>
                </DialogTitle>
                <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                    style={{maxWidth: "600px"}}
                >
                    {ModalContent}
                </DialogContent>
                <DialogActions
                    className={classes.modalFooter +" " +classes.modalFooterCenter}>
                    {(this.state.footButton)?
                        this.state.footButton
                        :
                        <Button onClick={() => this.handleClose()}>Close</Button>
                    }
                </DialogActions>
                </Dialog>
            </span>
        );
    }
}

export default withStyles(modalStyle)(UsersAuth);