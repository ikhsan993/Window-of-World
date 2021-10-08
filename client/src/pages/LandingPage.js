import React from 'react'
import cssModules from '../Landing.module.css';
import Icon from '../assets/img/Icon.png'
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default function LandingPage() {
    return (
        <>
        <div className ={cssModules.Wrapper}>
      <div className={cssModules.signInWrapper}>
          <img className="mb-3" src ={Icon} alt="img"/>
          <div className="mb-5">
          <p>Sign-up now and subscribe to enjoy  all the cool and latest books - The best book rental service provider in Indonesia</p>
          </div>
     {/* <button className ="signUp">Sign Up</button> */}
     <SignUp></SignUp>
     <SignIn></SignIn>
    
     {/* <button className={cssModules.signIn}>Sign In</button> */}
      </div>
        </div>
        </>
    )
}
