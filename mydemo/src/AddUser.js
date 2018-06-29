import React,{component} from 'react';
import {Form,Input,Button,Select,Modal} from 'antd'

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOk = this.handleOk.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleAdd() {
    this.setState({
      visible: true
    });
  }
  handleSubmit(e){// 提交表单
     e.preventDefault();
     this.props.form.validateFie
  }
} 