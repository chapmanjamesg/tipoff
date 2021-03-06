import React, { Component } from 'react'
import APIManager from "../Module/APIManager"

class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        if (this.props.isAuthenticated()) {
            this.props.history.push("/home")
        }
    }

    handleLogin = (evt) => {
        evt.preventDefault()
        APIManager.getAll(`users?email=${this.state.email}`)
            .then((userInfo) => {
                if (userInfo.length !== 0) {
                    if (this.state.password === userInfo[0].password) {
                        const authObj = {
                            userId: userInfo[0].id,
                            name: userInfo[0].username,
                            email: this.state.email,
                            password: this.state.password,
                        }
                        this.props.setUser(authObj)
                        this.props.history.push("/home");
                    } else {
                        window.alert("This password does not match this email!")
                    }
                } else {
                    window.alert("This email does not have an account.")
                }
            })
    }

    render() {
        return (
            <form className="tc" onSubmit={this.handleLogin}>
                <h3 className="tc pt6">Please Sign In</h3>
                <fieldset>
                    <label className="pt4 pr2" htmlFor="inputEmail">
                        Email Address:  </label>
                    <input
                        onChange={this.handleFieldChange}
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        required="" autoFocus="" />
                </fieldset>
                <fieldset className="pt2 pb2">
                    <label className="pr2" htmlFor="inputPassword">
                        Password:  </label>
                    <input
                        onChange={this.handleFieldChange}
                        type="password"
                        id="password"
                        placeholder="Password"
                        required="" autoFocus="" />
                </fieldset>
                <button className="br-pill" type="submit">
                    Sign In</button>
            </form>
        )
    }
}

export default Login