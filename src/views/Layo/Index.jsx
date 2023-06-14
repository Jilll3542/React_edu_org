import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu} from 'antd';
import { getInfo } from '../../api/index';
import { loginAction, menuAction } from "../../redux/actions/login"
import { filterMenu } from "../../utils/menuFilter"
import { asyncRouterMap } from '../../common/rooterMap';
import { Route, NavLink } from "react-router-dom";
import Headers from "../../components/header/Index"
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu
class Index extends Component {
  state = {
    menuTree: []
  }
  //创建异步路由,看页面切换情况
  renderRoute = (menu) => {
    let routerList = []
    const asyncRoute = (data) => {
      // let routerList = [] 不能在此处声明，若在此处声明，则每次item有children就会清空一次数组
      data.forEach((item) => {
        if (item.children) {
          asyncRoute(item.children)
        } else {
          routerList.push(
            // 路由懒加载，用模板字符串拼接的形式来动态生成
            // 路由懒加载的部分在打包之后需要渲染成绝对路径，因为在打包压缩的时候可能会改变路径顺序
            <Route
              path={`/index${item.path}`}
              component={lazy(() => import(`@/views${item.path}/Index.jsx`))}
              key={item.path}>
            </Route>

          )
        }
      });
    }
    asyncRoute(menu)
    console.log("routerList", routerList)
    return routerList
  }

  componentDidMount() {
    //判断用户是否刷新 
    console.log(666, this.props.res.menuReducer)
    if (this.props.res.menuReducer.length) {
      //首次加载
      const menuTree = this.renderMenu(this.props.res.menuReducer)
      this.setState({
        menuTree
      })
      console.log("首次加载", menuTree)
    } else {
      //刷新不丢失菜单
      getInfo().then(res => {
        //重新设置用户名和权限 
        console.log("刷新了1 ", res)
        const { loginAction, menuAction } = this.props
        loginAction({
          role: res.data.role,
          nickname: res.data.nickname
        })
        //存储菜单数据 重新筛选
        menuAction(filterMenu(asyncRouterMap, res.data.role))
        console.log("刷新了2", menuAction(filterMenu(asyncRouterMap, res.data.role)))
        //重新生成menutree
        const menuTree = this.renderMenu(this.props.res.menuReducer)
        this.setState({
          menuTree
        })
        console.log("刷新了3", menuTree)
      })
    }
    //把生成menuTree放在这里不行，因为getInfo是异步的
  }
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return <SubMenu title={item.meta.title} key={item.path}>
          {this.renderMenu(item.children)}
        </SubMenu>
      }
      return <Menu.Item key={item.path}>
        <NavLink to={"/index" + item.path}>
          {item.meta.title}
        </NavLink>
      </Menu.Item>
    })
  }
  render() {
    const { menuReducer } = this.props.res
    return (
      <div>
        <Layout style={{ height: "100vh" }}>
          <Sider style={{ background: "#001529",height:"100vh",  }}>
            <h1 style={{textAlign:"center", color:"#fff",lineHeight:"50px",marginTop:"15px"}}>好学教育 </h1>
            <Menu theme='dark'>
              {this.state.menuTree}
            </Menu>
          </Sider>
          <Layout style={{background:"#f4f4f4",height:"100vh",overflow:"auto"}}>
            <Header style={{ color: "#fff", background:"#fff", textAlign:"right"}}>
              <Headers history={this.props.history}></Headers>
            </Header>
            <Suspense fallback={<div>loading...</div>}>
              <Content style={{padding:"20px"}}>
                {this.renderRoute(menuReducer)}
              </Content>
            </Suspense>

          </Layout>

        </Layout>
      </div>
    )
  }
}

export default connect(
  state => ({
    res: state
  }), {
  loginAction,
  menuAction
}
)(Index)