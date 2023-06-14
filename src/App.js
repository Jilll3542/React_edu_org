import React, { Component } from 'react'
// import { Button } from 'antd';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import "./App.css"
import Layo from "./views/Layo/Index"
import Login from "./views/Login/Index"
import { authLogin } from './utils/auth';
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            {/* <Route path="/" exact render={(props) => {
              return <Redirect to="/layo"></Redirect>
            }}></Route> */}
            <Route path="/index" render={(props) => {
              //如果没有登陆就进登陆页面，如果登陆了就进首页
              if (!authLogin()) {
                // return <Login {...props}></Login>
                return <Redirect to="/login"></Redirect>
              }
              return <Layo {...props}></Layo>
            }}></Route>

            <Route path="/login" render={(props) => {
                //如果没有登陆就进登陆页面，如果登陆了就进首页
                if (authLogin()) {
                  return <Redirect to="/index/home"></Redirect>
                }
                return <Login {...props}></Login>
            }}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
