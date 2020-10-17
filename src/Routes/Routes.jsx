import React from "react"
import { Route } from "react-router-dom"
import Landing from "../Components/Landing"
import Login from "../Components/Login"
import Register from "../Components/Register"
// import Dashbosrd from "../Components/Dashboard"
// import Ledger from "../Components/Ledger"

function Routes(){
    return(
        <>
        <Route path="/" exact render={()=> <Landing/>}/>
        <Route path="/login" render={()=> <Login/>}/>
        <Route path="/register" render={()=> <Register/>}/>
        <Route path="/dashboard" render={()=> <Dashboard/>}/>
        <Route path="/ledger" render={() => <Ledger/>}/>
        </>
    )
}
export default Routes