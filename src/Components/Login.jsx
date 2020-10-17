import React, { useState, useEffect } from "react";
import { loginRequest } from "../Redux/Auth/action";
import { useDispatch, useSelector } from "react-redux";
import { Redirect,Link } from "react-router-dom";

import {TextField,Button, Paper ,Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  login_paper: {
    width:"600px",
    margin: "50px auto",
    padding: "30px",
  },
  input_box: {
    width:"70%"
  }
}));

export default function Login(props) {
  const [query, setQuery] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isError = useSelector((state) => state.auth.isError);
  const message = useSelector((state) => state.auth.message);
  const classes = useStyles();

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

  <Paper  elevation={3} className={classes.login_paper} >
     <img style={{width:"80px"}} src="logo.fa05071f.svg" alt="logo"/>
      <h1>Login</h1>
      
      <div>
      <TextField
          className={classes.input_box}
          id="outlined-error-helper-text"
          label="Email"
          defaultValue=""
          value={query.email}
          onChange={(e) => setQuery({...query, email: e.target.value})}
          variant="outlined"
        />
      </div>
      <div>
        <br/>
      <TextField
      className={classes.input_box}
          id="outlined-error-helper-text"
          label="password"
          defaultValue=""
          value={query.password}
          onChange={(e) => setQuery({...query, password: e.target.value})}
          variant="outlined"
        />
      </div>
      <br/>
      {isError ? <small style={{color:"red"}}>{message}</small> : null}
      <div>
        <br/>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      </div>
      <br/>
      <Divider />
      <br/>
      <h3>Don't have a account</h3>
      <button><Link to="/register">Sign Up</Link></button>
    </Paper>
  );
}
