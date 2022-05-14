import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Popconfirm } from "antd";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import formatDate from "../../../../utils/formatDate";
import services from "../../../../apiService/services";
import classes from "../EventsPanel.module.css";
import * as actionTypes from "../../../../store/actions/action";
import scrollToInfo from "../../../../utils/scrollToInfo";

const EventsTable = (props) => {
  const [eventsData, setEventsData] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  useEffect(() => {
    setEventsData(props.events);
  }, [props.events]);

  function cancel(e) {}

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex, searchInput) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Date",
      key: "startDate",
      render: (record, key) => (
        <div key={key}>{formatDate(record.startDate)}</div>
      ),
      sorter: (a, b) => a.startDate - b.startDate,
    },
    {
      title: "Price",
      render: (record, key) => <div key={key}>{record.price}$</div>,
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Duration",
      render: (record, key) => <div key={key}>{record.duration} minutes</div>,
      key: "duration",
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: "Max People",
      dataIndex: "maxPeople",
      key: "maxPeople",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (record) => (
        <Space size="middle">
          <a
            onClick={() => {
              props.onEventClicked(record);
              props.onDetailOpen();
              props.onModalOpen(window.pageYOffset);
              scrollToInfo(window.pageYOffset);
            }}
          >
            See Details
          </a>
          <a onClick={() => props.changeComponent(1, record)}>Edit Event</a>
          <Popconfirm
            title="Are you sure to delete this event?"
            onConfirm={() => props.deleteEvent(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete Event</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={classes.EventsTable}>
      <Table
        style={{ width: "100%" }}
        columns={columns}
        scroll={{ x: true }}
        dataSource={eventsData.length > 0 ? eventsData : ""}
        loading={props.loadingTable}
      />
      <Button
        style={{ width: "200px" }}
        onClick={() => props.changeComponent(2)}
        type="primary"
      >
        Create New Event
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    eventDetails: state.eventDetails,
    openDetails: state.openDetails,
    scrollY: state.scrollY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEventClicked: (eventData) =>
      dispatch({ type: actionTypes.STORE_EVENTS, eventData }),
    onDetailOpen: () => dispatch({ type: actionTypes.OPEN_DETAILS }),
    onModalOpen: (posY) =>
      dispatch({ type: actionTypes.STORE_SCROLL_POSITION, val: posY }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsTable);
