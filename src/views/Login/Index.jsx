import React, { Component } from 'react'
import style from "./index.module.css"
import { Card, Tabs, Form, Input, Button } from 'antd';
import {loginAction,menuAction} from "../../redux/actions/login"
import {connect} from "react-redux"
import {login} from "../../api/index"
import { asyncRouterMap } from '../../common/rooterMap';
import {filterMenu} from "../../utils/menuFilter"
const { TabPane } = Tabs;
class Index extends Component {
    login=()=>{
        const {loginAction,menuAction,history} = this.props
        //表单验证,如果取到验证字段，发起请求，就执行then里面的函数
        this.formRef.validateFields().then(res=>{
            console.log(this.props)
            login(res).then((res)=>{
                // 表单校验通过了
                
                //存储token
                sessionStorage.setItem("token",res.token)
                //存储用户权限和昵称
                loginAction({
                    role:res.role,
                    nickname:res.nickname
                })
                //直接筛选出每个角色对应的菜单项和路由项，根据权限名字，动态生成菜单
                //直接筛选出每个角色所对应的菜单项，并且加入redux里
                menuAction(filterMenu(asyncRouterMap,res.role))
                //校验通过之后转到home主页面
                history.push("/index")
               
                console.log("执行第一个")
            }).catch((err)=>{
                //表单校验不通过
                console.log("执行第二个",err)
            })
        }).catch((err)=>{
            //发起请求不通过
            console.log("发起请求不通过",err)
        })
    }
    render() {
        console.log(1,this.props)
        return (
            <div className={style.wrap}>
                {/* <h1>{this.props.res.loginReducer.nickname}</h1> */}
                <Card title="好学教育管理系统" headStyle={{ textAlign: "center" }} style={{ width: 500 }} bordered={false}>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="手机号密码登陆" key="1">
                            <Form
                                ref={(a)=>this.formRef=a}
                                name="basic"
                                wrapperCol={{ span: 24,}}                              
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: '账号不能为空',
                                        },
                                        {
                                            pattern:/^\w{4,8}$/,
                                            message:"账号要求是4-8位数字字母组合"
                                        }
                                    ]}
                                >
                                    <Input placeholder='請輸入您的帳號'/>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '密码不能为空',
                                        },
                                        
                                    ]}
                                >
                                    <Input.Password placeholder='請輸入您的密碼'/>
                                </Form.Item>

                              

                                <Form.Item
                                    wrapperCol={{
                                        offset: 0,
                                        span: 24,
                                    }}
                                >
                                    <Button type="primary" style={{width:"100%"}} onClick={this.login}>
                                        {/* onClick()触发表单验证 */}
                                        立即登陆
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="新用户注册" key="2">
                            Content of Tab Pane 2
                        </TabPane>

                    </Tabs>
                </Card>
            </div>
        )
    }
}
export default connect(
    state=>({
        res:state
    }),
    {
        loginAction,
        menuAction
    }
)(Index)