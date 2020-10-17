import React from "react";
import { Link } from "react-router-dom";
import Styles from "./Style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/Auth/action";

export default function NavBar(props) {

  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  return isAuth ? (
    <>
      <div id={Styles.nav}>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/ledger">Ledger</Link>
          </li>
          <li>
            <button onClick={() => dispatch(logoutUser())}>Log Out</button>
          </li>
        </ul>
      </div>
    </>
  ) : (
    <>
      <div id={Styles.nav}>
        <ul>
        <li>
            <Link to="/">Landing Page</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </>
  );
}