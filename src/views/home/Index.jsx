import React, { Component } from 'react'
import { Card, Tabs, Row, Col, Timeline } from 'antd';
import style from "./style.module.css"
import * as echarts from '../../utils/echarts.js';
// import axios from 'axios';
export default class Index extends Component {
  state = {
    xData: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    yData: [5, 20, 36, 10, 10, 20],
    xData1: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    yData1: [5, 20, 36, 10, 10, 20],
    list:[
      {
        cont:"王刚结算了一门课程",
        time:"操作时间 2023-3-18",
        color:"red"
      },
      {
        cont:"Jill结算了一门课程",
        time:"操作时间 2023-3-18",
        color:"blue"
      },
      {
        cont:"王刚删除了一门课程",
        time:"操作时间 2023-3-18",
        color:"yellow"
      },
      {
        cont:"里斯增加了一门课程",
        time:"操作时间 2023-3-18",
        color:"purple"
      },
    ]
  }
  componentDidMount() { 
    //柱形图
    this.drawBar()
    this.drawPie()
    // axios().then((res)=>{
    //   this.setState({
    //     list:res.list
    //   })
    // })
  }
  drawBar = () => {
    var myChart = echarts.init(this.myRef);
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: this.state.xData
      },
      yAxis: {

      },
      series: [
        {
          name: '销量',
          type: 'bar',
          data: this.state.yData
        }
      ]
    })
  }
  drawLine = () => {
    var myChart = echarts.init(this.myRef2);
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: this.state.xData1
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: this.state.yData1
        }
      ]
    }) 
  }
  drawPie=()=>{
    var myChart = echarts.init(this.myRef3);
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: this.state.xData
      },
      yAxis: {

      },
      series: [
        {
          name: '销量',
          type: 'pie',
          data: this.state.yData
        }
      ]
    })
  }
  callback = (activeKey) => {
    console.log(activeKey)
    if (activeKey === 2) {
      //折线图
      setTimeout(()=>{
        this.drawLine()
      },0)
    }
  }
  render() {
    return (
      <div>
        <Card>
          <Tabs defaultActiveKey="1" onChange={this.callback} >
            <Tabs.TabPane tab="销售额" key="1">
              <Row>
                <Col span={16}>
                  <div className={style.panel} ref={a => this.myRef = a} key="1"></div>
                </Col>
                <Col span={8}>
                </Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab="访问量" key="2" forceRender={true}>
              <Row>
                <Col span={16}>
                  <div className={style.panel} ref={a => this.myRef2 = a} key="2"></div>
                </Col>
                <Col span={8}>
                </Col>
              </Row>
            </Tabs.TabPane>
          </Tabs>
        </Card>
        <Row gutter={16} className="mt">
          <Col span={12}>
            <Card title="操作动态 ">
              <Timeline>
                {
                  this.state.list.map((item,index)=>{
                    return(
                      <Timeline.Item color={item.color} key={index}>
                        <p className={style.mb}>{item.cont}</p>
                        <p className={style.mb}>{item.time}</p>
                      </Timeline.Item>
                    )
                  })
                }
                {/* <Timeline.Item color="green">王刚结算了一门课程</Timeline.Item>
                <Timeline.Item color="green">小李结算了一门课程</Timeline.Item>
                <Timeline.Item color="red">
                  <p>Solve initial network problems 1</p>
                </Timeline.Item>
                <Timeline.Item>
                  <p>Technical testing 1</p>
                </Timeline.Item>
                <Timeline.Item color="gray">
                  <p>Technical testing 1</p>
                </Timeline.Item>
                <Timeline.Item color="gray">
                  <p>Technical testing 1</p>
                </Timeline.Item>
                <Timeline.Item color="#00CCFF" >
                  <p>Custom color testing</p>
                </Timeline.Item> */}
              </Timeline>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="销售额类别占比">
            <div className={style.panel} ref={a => this.myRef3 = a}></div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
