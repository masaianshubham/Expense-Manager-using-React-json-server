import React, { useState, useEffect } from "react";
import { registerRequest,verifyEmail } from "../Redux/Auth/action";
import { useDispatch, useSelector } from "react-redux";
import Style from "./Style.module.css";

export default function Register (props) {
  const [query, setQuery] = useState({ name:"", email: "", password: "" });
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.auth.isError);
  const message = useSelector((state) => state.auth.message);


const  handleRegister = (e) => {

  e.preventDefault()

    let payload = {
      ...query,
    };
    dispatch(registerRequest(payload));
  };

const verifyInputEmail = () => {
  dispatch(verifyEmail(query.email));
}
    return (
      <div className={Style.reg_form_div}>
        <h1>Register with us</h1>
        <form onSubmit={handleRegister}>
        <input
        type="text"
        minLength="4"
        required
          value={query.name}
          onChange={(e) => setQuery({...query, name: e.target.value})}
          placeholder="Name"
        />
        <input
        required
        type="email"
          value={query.email}
          onChange={(e) => setQuery({...query, email: e.target.value})}
          placeholder="Email"
        />
        <input
        required
        type="password"
        minLength="6"
          value={query.password}
          onChange={(e) => setQuery({...query, password: e.target.value})}
          placeholder="Password"
          onFocus={verifyInputEmail}
        />
        {isError ? <small>{message}</small> : null}
        <button>Register</button>
        </form>
      </div>
    );
}