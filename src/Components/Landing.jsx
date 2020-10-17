import React from "react";
import {Link} from "react-router-dom"
import Styles from "./Style.module.css"


export default function Landing() {

  return (
    <div className={Styles.landing_page}>
        <img src="logo.fa05071f.svg" alt=""/>
        <h1>APP GETS YOUR MONEY INTO SHAPE</h1>
        <hr/>
        <small>Discover the experience</small>
        <br/>
        <button><Link to="/login">Get Started</Link></button>
    </div>
  );
}
