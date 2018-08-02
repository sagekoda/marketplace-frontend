//@desc this is the 'store setiings' componenent 
//@author Sylvia Onwukwe
//@co author Odewale Ifeoluwa
import React from 'react';

import NavPills from "../../components/NavPills/NavPills.jsx";
import HomePage from "./homepage.jsx"
import SocialMedia from './socialmedia';
import SEO from './seo';

function Shop({...props}){
  return (
    <NavPills 
      color="primary"
      tabs={[
        {
          tabButton: "HomePage",
          tabContent: (
                <HomePage />
          )
        },
        {
          tabButton: "Social Media",
          tabContent: (
               <SocialMedia />
          )
        },
        {
          tabButton: "SEO",
          tabContent: (
                <SEO />
          )
        },
      ]}
    />
  );
}

export default Shop;