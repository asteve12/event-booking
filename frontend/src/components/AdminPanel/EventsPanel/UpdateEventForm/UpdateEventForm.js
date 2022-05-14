import React, { useState, useEffect } from "react";
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

const UpdateEventForm = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDescription, setImageDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [form] = Form.useForm();

  useEffect(() => {
    setStartDate(new Date(props.currentEvent.startDate));
  }, []);

  const onFinish = (values) => {
    values.event.startDate = startDate;
    props.updateEvent(values.event, selectedImage, imageDescription);
  };

  const onImageChange = (event) => {
    event.preventDefault();
    setSelectedImage(event.target.files[0]);
    setImageDescription(event.target.value);
  };

  return (
    <div className={classes.EventFormDiv}>
      <div style={{ fontSize: "20px" }}>{props.currentEvent.title}</div>
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
              initialValue={props.currentEvent._id}
              name={["event", "id"]}
              hidden={true}
              required
            />
            <Form.Item
              initialValue={props.currentEvent.title}
              name={["event", "title"]}
              label="Event Title"
              required
              rules={[{ required: true, message: "Please input event title!" }]}
            >
              <Input
                defaultValue={props.currentEvent.title}
                placeholder={props.currentEvent.title}
              />
            </Form.Item>
            <Form.Item
              initialValue={props.currentEvent.artist}
              label="Artist"
              required
              name={["event", "artist"]}
              rules={[
                { required: true, message: "Please input event artist!" },
              ]}
            >
              <Input
                defaultValue={props.currentEvent.artist}
                placeholder={props.currentEvent.artist}
              />
            </Form.Item>
            <Form.Item
              name={["event", "description"]}
              label="Event Description"
              required
              initialValue={props.currentEvent.description}
              rules={[
                { required: true, message: "Please input event description!" },
              ]}
            >
              <Input
                defaultValue={props.currentEvent.description}
                placeholder={props.currentEvent.description}
              />
            </Form.Item>
            <Form.Item
              name={["event", "duration"]}
              label="Duration"
              required
              tooltip="Enter minutes number only"
              initialValue={props.currentEvent.duration}
              rules={[
                { required: true, message: "Please input event duration!" },
              ]}
            >
              <Input
                defaultValue={props.currentEvent.duration}
                placeholder={props.currentEvent.duration}
              />
            </Form.Item>
            <Form.Item
              name={["event", "startDate"]}
              label="Start Date"
              required
              initialValue={formatDate(props.currentEvent.startDate)}
              rules={[{ required: true, message: "Please input event date!" }]}
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
              initialValue={props.currentEvent.summary}
              rules={[
                { required: true, message: "Please input event summary!" },
              ]}
            >
              <Input.TextArea
                defaultValue={props.currentEvent.summary}
                placeholder={props.currentEvent.summary}
              />
            </Form.Item>
            <p>Location</p>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Form.Item
                name={["event", "city"]}
                label="City"
                required
                initialValue={props.currentEvent.location.city}
                rules={[
                  { required: true, message: "Please input event city!" },
                ]}
              >
                <Input
                  defaultValue={props.currentEvent.location.city}
                  placeholder={props.currentEvent.location.city}
                />
              </Form.Item>
              <Form.Item
                name={["event", "venue"]}
                label="Venue"
                required
                initialValue={props.currentEvent.location.venue}
                rules={[
                  { required: true, message: "Please input event venue!" },
                ]}
              >
                <Input
                  defaultValue={props.currentEvent.location.venue}
                  placeholder={props.currentEvent.location.venue}
                />
              </Form.Item>
            </div>

            <Form.Item
              name={["event", "maxPeople"]}
              label="Max Capacity"
              tooltip="Enter number only"
              required
              initialValue={props.currentEvent.maxPeople}
              rules={[
                {
                  required: true,
                  message: "Please input event max people capacity!",
                },
              ]}
            >
              <Input
                defaultValue={props.currentEvent.maxPeople}
                placeholder={props.currentEvent.maxPeople}
              />
            </Form.Item>
            <Form.Item
              name={["event", "price"]}
              label="Price in $"
              tooltip="Enter number only"
              required
              initialValue={props.currentEvent.price}
              rules={[
                { required: true, message: "Please input event ticket price!" },
              ]}
            >
              <Input
                defaultValue={props.currentEvent.price}
                placeholder={props.currentEvent.price}
              />
            </Form.Item>
            <Form.Item
              name={["event", "imageCover"]}
              label="Image Cover"
              tooltip="jpeg, jpg, png"
              required
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
                UPDATE EVENT
              </Button>
            </Form.Item>
          </Fonts>
        </Form>
      </div>
    </div>
  );
};

export default UpdateEventForm;
