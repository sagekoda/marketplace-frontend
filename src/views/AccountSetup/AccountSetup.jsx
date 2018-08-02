/**
 * @description The Vendor Account Setup Component.
 * @author Mohammed Odunayo
 * @class AccountSetup
 * @name AccountSetup
 */

import React from "react";
// core components
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import LandingPageLinks from "../../components/Header/LandingPageLinks";
import LandingPageMobile from "../../components/Header/LandingPageMobile.jsx";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import {getAccountStatus} from "../../components/Auth/AccessControl.jsx";
import ProfileSetup from "./Sections/ProfileSetup.jsx";
import image from "../../assets/img/account-setup.jpeg";

class AccountSetup extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      activeStep: this.getActiveStep(),
    };
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  getActiveStep = () => {
    const {completeProfile, emailVerified, domainNameSet, businessVerified} = getAccountStatus("vendor");
    
    if(!completeProfile){
      return 0;
    }
    else if(!emailVerified){
      return 1;
    }
    else if(!domainNameSet){
      return 2;
    }
    else if(!businessVerified){
      return 3;
    }
  };

  getSteps = () => {
    return ['Profile Setup', 'Email Validation', 'Business Setup', 'Business Verification'];
  }
  
  getStepContent = step => {
    switch (step) {
      case 0:
        return <ProfileSetup />;
      case 1:
        return 'An ad group contains one or more ads which target a shared set of keywords.';
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      case 3:
        return ``;
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div>
        <Header
          color="transparent"
          brand="Bezop Store"
          leftLinks={<LandingPageLinks user={"vendor"} />}
          rightLinks={<LandingPageMobile user={"vendor"} />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h3>Account Setup</h3>
                      <div className={classes.socialLine}>
                        <h4>Complete your vendor account setup to start selling.</h4>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => {
                          return (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                              <StepContent>
                                {this.getStepContent(index)}
                              </StepContent>
                            </Step>
                          );
                        })}
                      </Stepper>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      {activeStep === steps.length && (
                        <div>
                          <Button simple color="primary" size="lg">
                            Visit Your Shop
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default (AccountSetup);
