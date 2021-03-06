import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Registration from "./Auth/Registration";
import Login from "./Auth/Login";
import Home from "./Home/Home";
import TipList from "./Tips/TipList";
import TipForm from "./Tips/TipForm";
import NoteList from "./Notes/NoteList";
import NoteForm from "./Notes/NoteForm";
import Total from "./Totals/TotalList";
import ClientList from "./Clients/ClientList";
import ClientForm from "./Clients/ClientForm";

export default class ApplicationViews extends Component {

    isAuthenticated = () => localStorage.getItem("credentials") !== null
    getUserId = () => {
        if (this.isAuthenticated()) {
            return JSON.parse(localStorage.getItem("credentials")).userId
        }
    }

    render() {
        return (
            <>
                <Route
                    exact path="/register" render={props => {
                        return <Registration setUser={this.props.setUser}{...props} />
                    }} />
                <Route
                    exact path="/login" render={props => {
                        return <Login setUser={this.props.setUser} isAuthenticated={this.isAuthenticated}{...props} />
                    }} />
                <Route
                    exact path="/home" render={props => {
                        if (this.props.user) {
                            return <Home {...props} />
                        } else { return <Redirect to="/login" /> }
                    }} />
                <Route
                    exact path="/totals" render={props => {
                        if (this.props.user) {
                            return <Total {...props} />
                        } else { return <Redirect to="/login" /> }
                    }} />
                <Route
                    exact path="/tips" render={props => {
                        if (this.props.user) {
                            return <TipList {...props} />
                        } else { return <Redirect to="/login" /> }
                    }} />
                <Route
                    exact path="/tips/new" render={props => {
                        return <TipForm {...props} isNew={true} />
                    }}
                />
                <Route
                    exact path="/tips/:tipId(\d+)/edit" render={props => {
                        return <TipForm {...props} isNew={false} />
                    }}
                />
                <Route
                    exact path="/notes" render={props => {
                        if (this.props.user) {
                            return <NoteList {...props} />
                        } else { return <Redirect to="/login" /> }
                    }} />
                <Route
                    exact path="/notes/new" render={props => {
                        return <NoteForm {...props} isNew={true} />
                    }}
                />
                <Route
                    exact path="/notes/:noteId(\d+)/edit" render={props => {
                        return <NoteForm {...props} isNew={false} />
                    }}
                />
                <Route
                    exact path="/clients" render={props => {
                        if (this.props.user) {
                            return <ClientList {...props} />
                        } else { return <Redirect to="/login" /> }
                    }} />
                <Route
                    exact path="/clients/new" render={props => {
                        return <ClientForm {...props} isNew={true} />
                    }}
                />
                <Route
                    exact path="/clients/:clientId(\d+)/edit" render={props => {
                        return <ClientForm {...props} isNew={false} />
                    }}
                />
            </>
        )
    }
}