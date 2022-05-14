import React, { useState } from "react";
import { Form, Input, Button } from "antd";

import classes from "./Login.module.css";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
  string: {
    len: "${label} must be between ${min} characters minimum.",
    min: "${label} must be at least ${min} characters",
  },
};

const Login = (props) => {
  const [atLogin, setAtLogin] = useState(true);
  const [form] = Form.useForm();

  let content = atLogin ? (
    <Form
      onFinish={props.onFinishLogin}
      layout="vertical"
      form={form}
      validateMessages={validateMessages}
      style={{ width: "70%" }}
    >
      <Form.Item
        name={["user", "email"]}
        label="E-mail"
        required
        rules={[{ type: "email" }]}
      >
        <Input placeholder="Your e-mail..." />
      </Form.Item>
      <Form.Item
        label="Password"
        required
        tooltip="Should be 8 characters minimum"
        name={["user", "password"]}
        rules={[{ type: "string", min: 8 }]}
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          LOGIN
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <Form
      onFinish={props.onFinishSignup}
      layout="vertical"
      form={form}
      validateMessages={validateMessages}
      style={{ width: "70%" }}
    >
      <Form.Item
        name={["user", "name"]}
        label="Name"
        rules={[{ required: true }]}
      >
        <Input placeholder="Your name..." />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="E-mail"
        required
        rules={[{ type: "email" }]}
      >
        <Input placeholder="Your e-mail..." />
      </Form.Item>
      <Form.Item
        label="Password"
        required
        tooltip="Should be 8 characters minimum"
        name={["user", "password"]}
        rules={[{ type: "string", min: 8 }]}
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item
        label="Confirm password"
        required
        tooltip="This field should match your password"
        name={["user", "passwordConfirm"]}
        dependencies={["user", "password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue(["user", "password"]) === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm your password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          SIGN UP
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className={classes.LoginDiv}>
      {content}
      {/*<Form
        onFinish={props.onFinishSignup}
        layout="vertical"
        form={form}
        validateMessages={validateMessages}
        style={{ width: "70%" }}
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Your name..." />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="E-mail"
          required
          rules={[{ type: "email" }]}
        >
          <Input placeholder="Your e-mail..." />
        </Form.Item>
        <Form.Item
          label="Password"
          required
          tooltip="Should be 8 characters minimum"
          name={["user", "password"]}
          rules={[{ type: "string", min: 8 }]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          required
          tooltip="This field should match your password"
          name={["user", "passwordConfirm"]}
          dependencies={["user", "password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue(["user", "password"]) === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            SIGN UP
          </Button>
        </Form.Item>
      </Form>*/}
      <p onClick={() => setAtLogin(!atLogin)} className={classes.Toggle}>
        {atLogin
          ? "Don't you have an account? Sign up!"
          : "Do you have an account already? Login!"}
      </p>
    </div>
  );
};

export default Login;
