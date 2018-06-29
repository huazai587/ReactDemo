import React, { Component } from 'react';
import { Table, Button,Input,Icon,Popconfirm,Alert } from 'antd';
import './App.css';

class App extends Component {
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      dataSource:[
        { key:1, nid:1, name:'tab',gender:'男',age:22,schoolname:'第一中学',description:'热爱班级'},
        { key:2, nid:2, name:'tab',gender:'男',age:22,schoolname:'第一中学',description:'热爱班级'},
        { key:3, nid:4, name:'tab',gender:'男',age:22,schoolname:'第一中学',description:'热爱班级'},
        { key:4, nid:5, name:'tab',gender:'男',age:22,schoolname:'第一中学',description:'热爱班级'},
        { key:5, nid:7, name:'tab',gender:'男',age:22,schoolname:'第一中学',description:'热爱班级'}
      ],
      index:'',
      PersonCount:0,
      selectedRowKeys:[],
      selectedRows:[],
      record:'abc'
    };
    this.onDelete = this.onDelete.bind(this); //绑定this  声明该方法需要爱绑定this
    this.appendPerson = this.appendPerson.bind(this);
    this.handleSelectedDelete = this.handleSelectedDelete.bind(this);
    this.columns = [
      { title: '编号', dataIndex: 'nid', key: 'nid' ,width:'8%'},
      { title: '姓名', dataIndex: 'name', key: 'name' ,width:'10%'},
      { title: '性别', dataIndex: 'gender', key: 'gender' ,width:'15%'},
      { title: '年龄', dataIndex: 'age', key: 'age' ,width:'15%'},
      { title: '学校', dataIndex: 'schoolname', key: 'schoolname' ,width:'15%'},
      { title: '在校表现', dataIndex: 'description', key: 'description' ,width:'20%'},
      { title: '操作', dataIndex: '', key: 'operation' ,width:'20%',render: (text,record,index) => (
        <span>
          <Popconfirm title="删除不可恢复，你确定要删除吗?" >
                  <a title="用户删除"  className="mgl10"onClick={this.onDelete.bind(this,index)}>
                      <Icon type="delete"/></a>
          </Popconfirm>
          <span className="ant-divider"/>
        </span>
      )},
    ]
  }

  appendPerson(event) {// 得到子元素传过来的值
    let array = [];
    let count = 0;
    this.state.dataSource.forEach(element => {
          element.map( key => {
         if (key === 'nid') {
           count++;
           array[count] = element.nid
         }
         return element
      })
    })
    let sortData = array.sort();
    let MaxData = sortData[(this.state.dataSource.length)-1] // 取最后一位下标的值
    event.key = MaxData+1;
    event.nid = MaxData+1;
    this.setState({
      dataSource:[...this.state.dataSource,event]
    })
  }
  
  onDelete(index){
    console.log(index)
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index,1);
    this.setState({dataSource});
  }
  
  handleSelectedDelete(){
    if(this.state.selectedRowKeys.length>0){
      console.log(...this.state.selectedRowKeys)
      const dataSource = [...this.state.dataSource]
      dataSource.splice(this.state.selectedRows,this.state.selectedRows.length)
      this.setState({dataSource});
    }
    else{}
  }

  render() {
    //联动选择框
    const rowSelection = {
      onChange:(selectedRowKeys,selectedRows) => {
        this.setState({
          selectedRowKeys:selectedRowKeys,
          selectedRows:selectedRows
        })
        console.log(selectedRows,selectedRowKeys)
      },
      onSelect:(record,selected,selectedRows) => {
        console.log( record, `selected:${selected}`,`selectedRows:${selectedRows}`);
      },
      onSelectAll:(selected,selectedRows,changeRows) =>{
        console.log(selected,selectedRows,changeRows);
      },
      getCheckboxProps:record =>({
        disabled:record.name === 'Disabled User',
      })
    }
    return (
      <div className="div_body">
         <div id="div_left"></div>
         <div id="div_right">
            <div className="table_oftop">
              <Button type="primary" icon="search" style={{float:"right",marginLeft:10}}>查询</Button> 
              <Input placeholder="input search text" style={{width:300,float:"right"}}/>
              <div id="add_delete">
              <Button type="primary" icon="search" 
               className="selectedDelete"
               onClick={this.handleSelectedDelete}>删除所选</Button> 
              </div>               
            </div>
            <Table
            columns={this.columns} 
            dataSource={this.state.dataSource}
            className="table"
            rowSelection={rowSelection}
            scroll={{y:400}} /> 
         </div>  
      </div>
    );
  }
}

export default App;
