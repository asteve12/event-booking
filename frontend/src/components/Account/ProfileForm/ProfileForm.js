import React from "react";
import { Form, Input, Button } from "antd";
import Fonts from "react-font";

import Backdrop from "../../../UI/Backdrop/Backdrop";
import classes from "./ProfileForm.module.css";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const ProfileForm = (props) => {
  const [form] = Form.useForm();

  return (
    <div>
      <Backdrop
        show={props.show}
        clicked={props.closed}
        scrollOnClose={props.scrollOnClose}
      />
      <div className={classes.ProfileForm}>
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
          <Form.Item name={["user", "name"]} label="Username" required>
            <Input placeholder="Your username..." />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="E-mail"
            required
            rules={[{ type: "email" }]}
          >
            <Input placeholder="Your e-mail..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              UPDATE PROFILE
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;
