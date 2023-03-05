import { Button, Card, Checkbox, Form, Input,message,Spin} from 'antd';
import MyTitle from '../login/componeents/title';
import classess from './login.module.css'
import { useNavigate } from "react-router-dom";
import { login } from '../../service/login';
import { setItem } from '../../utils/LocalStorage';
import { useState } from 'react';


const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    // const [messageApi, contextHolder] = message.useMessage();
    const onReset = () => {
        form.resetFields();
    };
    
  const onFill = async () => {
        setLoading(true)
        const postData = {
            username: 'root@admin.com',
            password:'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
        }
        const res = await login(postData)
        setLoading(false)
        setItem('Token', res.data.token)
        navigate('/Tags')
    }
    
        
    
  return (
    
    <div className={classess.container}>
      <Spin></Spin>
    <Card
        style={{
            width: 600,
            margin: '200px auto',
            
            backgroundColor:'#f5f5f5'
        }}
        title={<MyTitle></MyTitle>}
      >
        <Spin spinning={loading}>
        <Form
    name="basic"
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
        maxWidth: 600,
        
    }}
    initialValues={{
      remember: true,
    }}
    form={form}
    autoComplete="off"
  >
    <Form.Item
      label={"用户名"}
      name="username"
      rules={[
        {
          required: true,
          message: '请输入用户名!',
        },
      ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
      label="密码"
      name="password"
      rules={[
        {
          required: true,
          message: '请输入密码!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 4,
        span: 16,
      }}
    >
      <Checkbox>记住我</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 4,
        span: 20,
      }}
    >
      <Button type="primary" htmlType="submit" onClick={onFill} style={{marginRight:'10px'}}>
        登录
        </Button>
    <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
    </Form.Item>
  </Form>
        </Spin>
   
    </Card>
         

    </div>
   
    
 
);}
export default Login;