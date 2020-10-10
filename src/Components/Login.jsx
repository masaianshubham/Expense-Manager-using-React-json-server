import React from 'react'
import { loginRequest } from '../redux/actions'
import { connect } from 'react-redux'
import Style from "./index.module.css";
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleLogin = () => {
        const { loginRequest } = this.props
        const { email, password } = this.state
        let payload = {
            password :password,
            username:email,
        }
        loginRequest(payload)
    }
    render() {
        const { email, password } = this.state
        if (this.props.isAuth) {
            return <Redirect to="/dashboard"/>
        }
        return (
            <div className={Style.login_div}>
                <h1>Login</h1>
                <div><input name="email" value={email} placeholder="enter email" onChange={this.handleChange} /></div>
                <div><input name="password" value={password} placeholder="enter password" onChange={this.handleChange} /></div>
                <div><button onClick={this.handleLogin}>Login</button></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
       isAuth : state.isAuth
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginRequest : payload => dispatch(loginRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)