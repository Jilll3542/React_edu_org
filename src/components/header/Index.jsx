import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { connect } from "react-redux"
import { NavLink } from 'react-router-dom';
import { loginAction,menuAction } from '../../redux/actions/login';


class Index extends Component {
    logOut=()=>{
        //清空redux内所有内容
        //清除token
        sessionStorage.clear()
        //清除个人信息
        this.props.loginAction({role:"",nickname:""})
        //清除菜单数据
        this.props.menuAction([])
        this.props.history.push("/login")
    }
    render() {
        const { nickname } = this.props.res.loginReducer
        const menu = (
            <Menu>
                <Menu.Item icon={<UserOutlined />} key={1}>
                    <NavLink to={"/index/personal"}>
                        个人中心
                    </NavLink>
                </Menu.Item>
                <Menu.Item icon={<HomeOutlined />} key={2} onClick={this.logOut}>退出登陆</Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Dropdown menu={menu}>
                    <a href='www.baidu.com'> welcome, {nickname}<DownOutlined/></a>
                </Dropdown>
            </div>
        )
    }
}
export default connect(
    state => ({
        res: state
    }),{
        loginAction,
        menuAction
    }
)(Index)
