import React, { useState, useEffect } from "react";
import { registerRequest, verifyEmail } from "../Redux/Auth/action";
import { useDispatch, useSelector } from "react-redux";
import Style from "./Style.module.css";
import { TextField, Button, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  login_paper: {
    width: "600px",
    margin: "50px auto",
    padding: "30px",
  },
  input_box: {
    width: "70%",
    margin:"10px",
  },
}));

export default function Register(props) {
  const [query, setQuery] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.auth.isError);
  const message = useSelector((state) => state.auth.message);
  const classes = useStyles();

  const handleRegister = (e) => {
    e.preventDefault();

    let payload = {
      ...query,
    };
    dispatch(registerRequest(payload));
  };

  const verifyInputEmail = () => {
    dispatch(verifyEmail(query.email));
  };
  return (
    <Paper elevation={3} className={classes.login_paper}>
      <img style={{ width: "80px" }} src="logo.fa05071f.svg" alt="logo" />
      <h1>Register with us</h1>
      <form onSubmit={handleRegister}>
        <TextField
          className={classes.input_box}
          id="outlined-error-helper-text"
          label="Name"
          defaultValue=""
          type="text"
          minLength="4"
          required
          value={query.name}
          onChange={(e) => setQuery({ ...query, name: e.target.value })}
          variant="outlined"
        />
        <br/>
        <TextField
        className={classes.input_box}
          label="Email"
          id="outlined-error-helper-text"
          required
          type="email"
          value={query.email}
          onChange={(e) => setQuery({ ...query, email: e.target.value })}
          placeholder="Email"
          variant="outlined"
        />
        <br/>
        <TextField
        className={classes.input_box}
        label="Password"
          required
          id="outlined-error-helper-text"
          type="password"
          minLength="6"
          value={query.password}
          onChange={(e) => setQuery({ ...query, password: e.target.value })}
          label="password"
          onFocus={verifyInputEmail}
          variant="outlined"
        />
        <br/>
        {isError ? <small style={{color:"red",margin:"10px"}}>{message}</small> : null}
        <br/>
        <br/>
        <button>Register</button>
      </form>
    </Paper>
  );
}
