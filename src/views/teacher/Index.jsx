import React, { Component } from 'react'
import { Card, Form, Input, Row, Col, Select,Button, Table, Pagination,message } from "antd"
import { getTeacherList,deletes,batchDelete } from '../../api/teacher'
import AddModal from './AddModal'
import moment from '../../utils/moment'
const {Option} = Select

export default class Index extends Component {
 
 formRef=React.createRef()
  state={
    loading:false,
    disabled:true,
    data:[],
    pageData:{
      page:1,
      pageSize:10
    },
    total:0,
    visible:false,
    formData:{},
    record:{},
    title:"",
    selectedRowKeys:[]
  }
  edit=(record)=>{
   
    this.setState({
      record,
      visible:true,
      title:"编辑教师"
    },function(){
      
      this.myRef.formRef.setFieldsValue({
        ...record,
        birth:moment(record.birth),
        date:moment(record.birth),
      

      })
    })
  }
  componentDidUpdate(){

  }
  componentDidMount(){
    this.loadData()
  } 
  loadData=()=>{
    //加载前需要加载转动 
    this.setState({
      loading:true
    })
    //const formData = this.formRef.current.getFieldsValue(true)
    const {pageData,formData} = this.state
    getTeacherList({...pageData,...formData}).then(res=>{
      this.setState({
        data:res.data,
        loading:false,
        total:res.total,
        disabled:true
      })
    })
  }

  search=()=>{
    const formData = this.formRef.current.getFieldsValue(true)
    this.setState({
      formData
    },function(){
      this.loadData()
    })
    console.log(this.formRef)
    
    // this.formRef.current.validateFields().then(res=>{
    //   console.log(res)
    // })
  }
  reset=()=>{
    //清空表单数据
    this.formRef.current.resetFields()
    //重置分页数据
    this.setState({
      pageData:{
        page:1,
        pageSize:10
      },
      formData:{}
    },function(){
      this.loadData()
    })
    this.loadData()
  }
  showModel=()=>{
    this.setState({
      visible:true,
      title:"新建教师"
    })
    this.myRef.formRef.resetFields()
  }
  changeVisible=(visible)=>{
    this.setState({
      visible
    })
  }
  pageChange=(page,pageSize)=>{
      this.setState({
        pageData:{
          page,
          pageSize
        }
      },function(){
        this.loadData()
      }
      )
  }
  deletes=(id)=>{
    deletes({id}).then(res=>{
      console.log(res )
      if(res.code===0){
        message.success(res.msg)
        //隐藏弹框

        this.loadData()
    }
    })
  }
  selectChange=(selectedRowKeys)=>{
     this.setState({
      selectedRowKeys,
      disabled:selectedRowKeys.length?false:true
     })
  }
  batchDelete=()=>{
    batchDelete({ ids:this.state.selectedRowKeys}).then(res=>{
      if(res.code===0){
        message.success(res.msg)
        //隐藏弹框

        this.loadData()
    }
    })
  }
  render() {
    const columns = [  
      {
        title:"序号",
        dataIndex:"index",
        name:"index",
        align:"center",
        width:60,
        render:(text,record,index)=>index+1
      },
      {
        title:"姓名",
        dataIndex:"name",
        key:"name",
        width:80,
        align:"center"
      },
      {
        title:"性别",
        dataIndex:"gender",
        key:"gender",
        align:"center",
        render:(text)=>text===1?"男":"女"
    
      },
      {
        title:"级别",
        dataIndex:"level",
        key:"level ",
        align:"center",
        width:90,
        render:(text)=>{
          if(text===1){
            return "初级教师"
          }else if(text===2){
            return "中级教师"
          }else if(text===3){
            return "高级教师"
          }else{
            return "特级教师"
          }
        }
    
      },
      {
        title:"年级",
        dataIndex:"grade",
        key:"grade",
        width:80,
        align:"center"
    
      },
      {
        title:"科目",
        dataIndex:"subject",
        key:"subject",
        width:60,
        align:"center"
    
      },
      {
        title:"入职日期",
        dataIndex:"date",
        key:"date",
        align:"center"
    
      },
      {
        title:"类型",
        dataIndex:"type",
        key:"type",
        align:"center",
        render:(text)=>text===1?"全职":"兼职"
    
      },
      {
        title:"手机号码",
        dataIndex:"tel",
        key:"tel",
        align:"center"
    
      },
      {
        title:"毕业院校",
        dataIndex:"school",
        key:"school",
        align:"center"
    
      },
      {
        title:"出生年月",
        dataIndex:"birth",
        key:"birth",
        align:"center"
    
      },
      {
        title:"家庭住址",
        dataIndex:"address",
        key:"address",
        align:"center"
    
      },
      {
        title:"学历",
        dataIndex:"education",
        key:"education",
        align:"center",
        width:60,
    
      },
      {
        title:"操作",
        dataIndex:"operation",
        key:"operation",
        fixed:"right",
        width:150,
        align:"center",
        render:(text,record)=>{
          return <div>
           <Button type='primary' size="small" onClick={()=>this.edit(record)}>编辑</Button>
            <Button type='danger' size="small" className='ml' onClick={()=>{this.deletes(record.id)}}>删除</Button>
          </div>
        }
      }
    ]
    const {disabled,data,loading,visible,total,record,title,selectedRowKeys} =this.state
    return (
      <div>
       
        <Card>
          {/* 基于好提取数据和添加进标签里的内容，所以添加form,不使用input */}
          <Form
          
            name="basic"
            ref={this.formRef}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Row gutter={16}>
              <Col span={6}>
                {/* FormItem中的name属性最好按照后端使用接口 */}
                <Form.Item
                  label="姓名"
                  name="name"
                >
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="科目"
                  name="subject"
                >
                  <Select>
                    {/* 这里面的value应该按照后端存储的数据库来返回内容 */}
                    <Option value="">全部</Option>
                    <Option value="语文">语文</Option>
                    <Option value="数学">数学</Option>
                    <Option value="英语">英语</Option>
                    <Option value="物理">物理</Option>
                    <Option value="化学">化学</Option>
                    <Option value="生物">生物</Option>
                  </Select> 
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="手机号"
                  name="tel" 
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button type="primary" onClick={this.search}>搜索</Button>
                <Button className='ml' onClick={this.reset}>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className='mt'>
          <Button type='primary' onClick={this.showModel}>新建员工</Button>
          <Button danger disabled={disabled} className='ml' onClick={this.batchDelete}>批量删除</Button>
        </Card>
        <Card className='mt'>
        <Table 
            columns={columns} 
            dataSource={data} 
            scroll={{x:1400}}
            rowKey={(record)=>record.id}
            loading={loading}
            pagination={false}
            rowSelection={{
              type: "checkbox",
              selectedRowKeys:selectedRowKeys,
              onChange:this.selectChange
          
            }}
        />
        <Pagination size="small" total={total} showSizeChanger showQuickJumper />
        </Card>
        <AddModal 
            visible={visible} 
            changeVisible={this.changeVisible}
            reload={this.loadData}
            record={record}
            ref = {a=>this.myRef=a}
            title={title}
        />
      </div>
    )
  }
}
