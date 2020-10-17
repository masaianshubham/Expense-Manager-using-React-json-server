import React, { useState, useEffect } from "react";
import { loginRequest } from "../Redux/Auth/action";
import { useDispatch, useSelector } from "react-redux";
import Style from "./Style.module.css";
import { Redirect } from "react-router-dom";

export default function Login(props) {
  const [query, setQuery] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isError = useSelector((state) => state.auth.isError);
  const message = useSelector((state) => state.auth.message);

  const handleLogin = () => {

    let payload = {
      password: query.password,
      email: query.email,
    };
    console.log(query,payload)
    dispatch(loginRequest(payload));
  };

  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }
  
  return (
    <div className={Style.login_div}>
      <h1>Login</h1>
      <div>
        <input
        type="email"
          value={query.email}
          onChange={(e) => setQuery({...query, email: e.target.value})}
          placeholder="Email"
        />
      </div>
      <div>
        <input
        type="password"
          value={query.password}
          onChange={(e) => setQuery({...query, password: e.target.value})}
          placeholder="Password"
        />
      </div>
      {isError ? <small>{message}</small> : null}
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
