import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import Fonts from "react-font";
import { LeftOutlined } from "@ant-design/icons";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import formatDate from "../../../../utils/formatDate";
import classes from "../EventsPanel.module.css";

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

const AddEventForm = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDescription, setImageDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [form] = Form.useForm();

  const onFinish = (values) => {
    values.event.startDate = startDate;
    props.createEvent(values.event, selectedImage, imageDescription);
  };

  const onImageChange = (event) => {
    event.preventDefault();

    setSelectedImage(event.target.files[0]);
    setImageDescription(event.target.value);
  };

  return (
    <div className={classes.EventFormDiv}>
      <div style={{ fontSize: "20px" }}>Create New Event Form</div>
      <div style={{ textAlign: "left", padding: "4px", width: "100%" }}>
        <LeftOutlined onClick={() => props.changeComponent(0)} />
        <Button type="link" onClick={() => props.changeComponent(0)}>
          Go back to table
        </Button>
      </div>
      <div style={{ height: "20px" }} />
      <div className={classes.UpdateEventForm}>
        <Form
          onFinish={onFinish}
          layout="vertical"
          form={form}
          validateMessages={validateMessages}
          style={{ width: "70%" }}
        >
          <Fonts family="Rubik">
            <Form.Item
              name={["event", "title"]}
              label="Event Title"
              required
              rules={[{ required: true, message: "Please input event title!" }]}
            >
              <Input placeholder="Enter event title..." />
            </Form.Item>
            <Form.Item
              label="Artist"
              required
              name={["event", "artist"]}
              rules={[
                { required: true, message: "Please input event artist!" },
              ]}
            >
              <Input placeholder="Enter artist name..." />
            </Form.Item>
            <Form.Item
              name={["event", "description"]}
              label="Event Description"
              required
              rules={[
                { required: true, message: "Please input event description!" },
              ]}
            >
              <Input placeholder="Enter brief event description" />
            </Form.Item>
            <Form.Item
              name={["event", "duration"]}
              label="Duration"
              required
              tooltip="Enter number only"
              rules={[
                { required: true, message: "Please input event duration!" },
              ]}
            >
              <Input placeholder="Enter event duration in minutes" />
            </Form.Item>
            <Form.Item
              name={["event", "startDate"]}
              label="Start Date"
              required
              tooltip="Select event date"
            >
              <div style={{ width: "40px" }}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="MMMM d, yyyy"
                />
              </div>
            </Form.Item>
            <Form.Item
              name={["event", "summary"]}
              label="Summary"
              required
              rules={[
                { required: true, message: "Please input event summary!" },
              ]}
            >
              <Input.TextArea placeholder="Enter event summary" />
            </Form.Item>
            <p>Location</p>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Form.Item
                name={["event", "city"]}
                label="City"
                required
                rules={[
                  { required: true, message: "Please input event city!" },
                ]}
              >
                <Input placeholder="Enter city..." />
              </Form.Item>
              <Form.Item
                name={["event", "venue"]}
                label="Venue"
                required
                rules={[
                  { required: true, message: "Please input event venue!" },
                ]}
              >
                <Input placeholder="Enter venue..." />
              </Form.Item>
            </div>
            <Form.Item
              name={["event", "maxPeople"]}
              label="Max Capacity"
              tooltip="Enter number only"
              required
              rules={[
                {
                  required: true,
                  message: "Please input event max people capacity!",
                },
              ]}
            >
              <Input placeholder="Enter max capacity..." />
            </Form.Item>
            <Form.Item
              name={["event", "price"]}
              label="Price in $"
              tooltip="Enter number only"
              required
              rules={[
                { required: true, message: "Please input event ticket price!" },
              ]}
            >
              <Input placeholder="Enter ticket price in $" />
            </Form.Item>
            <Form.Item
              name={["event", "imageCover"]}
              label="Image Cover"
              tooltip="jpeg, jpg, png"
              required
              rules={[
                {
                  required: true,
                  message: "Please select an event cover image!",
                },
              ]}
            >
              <input
                type="file"
                name="files"
                onChange={onImageChange}
                alt="image"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                CREATE EVENT
              </Button>
            </Form.Item>
          </Fonts>
        </Form>
      </div>
    </div>
  );
};

export default AddEventForm;
