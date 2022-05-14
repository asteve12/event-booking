import React from "react";
import { Form, Input, Button } from "antd";
import Fonts from "react-font";

import Backdrop from "../../../UI/Backdrop/Backdrop";
import classes from "./PasswordForm.module.css";

const validateMessages = {
  required: "${label} is required!",
  string: {
    len: "${label} must be between ${min} characters minimum.",
    min: "${label} must be at least ${min} characters",
  },
};

const PasswordForm = (props) => {
  const [form] = Form.useForm();

  return (
    <div>
      <Backdrop
        show={props.show}
        clicked={props.closed}
        scrollOnClose={props.scrollOnClose}
      />
      <div className={classes.PasswordForm}>
        <Form
          onFinish={props.onSubmitForm}
          layout="vertical"
          form={form}
          validateMessages={validateMessages}
          style={{ width: "70%" }}
        >
          <Form.Item>
            <Fonts family="Rubik">
              <div>UPDATE YOUR USER INFO</div>
            </Fonts>
          </Form.Item>
          <Form.Item
            label="Current Password"
            required
            name={["user", "passwordCurrent"]}
            rules={[{ type: "string", min: 8 }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="New Password"
            required
            tooltip="Should be 8 characters minimum"
            name={["user", "password"]}
            rules={[{ type: "string", min: 8 }]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            required
            tooltip="This field should match your new password"
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
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              UPDATE PASSWORD
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PasswordForm;
