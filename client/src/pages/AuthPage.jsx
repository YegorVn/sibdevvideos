import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import { Form, Input, Button, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from 'react-router-dom'

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onFinish = () => {};

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
      
    } catch (e) {}
  };

  const loginHandler = async (values) => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError, registerHandler]);

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item>
        <div className="logo"></div>
      </Form.Item>
      <div className="inputs">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            name='email'
            size="large"
            onChange={changeHandler}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            name='password'
            size="large"
            onChange={changeHandler}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
      </div>

      <Form.Item>
        <Space size={20}>
          <Button
            size="large"
            type="primary"
            onClick={loginHandler}
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={registerHandler }
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
