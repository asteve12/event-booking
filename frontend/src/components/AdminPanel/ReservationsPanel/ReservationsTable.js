import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Popconfirm } from "antd";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import formatDate from "../../../utils/formatDate";
import classes from "./ReservationsTable.module.css";
import * as actionTypes from "../../../store/actions/action";

const ReservationsTable = (props) => {
  const [reservationsData, setReservationsData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const parseReservationData = (reservations) => {
    const data = [];
    reservations.map((reservation, index) => {
      data.push({
        username: reservation.user.name,
        email: reservation.user.email,
        title: reservation.event.title,
        startDate: reservation.event.startDate,
        price: reservation.price,
        tickets: reservation.tickets,
        key: index,
        _id: reservation._id,
      });
    });
    return data;
  };

  useEffect(() => {
    setReservationsData([]);

    console.log(props.reservations);
    //setReservationsData(props.reservations);
    setReservationsData(parseReservationData(props.reservations));
  }, [props.reservations]);

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
      title: "User name",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
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
      title: "Tickets",
      render: (record, key) => (
        <div key={key}>
          {record.tickets} {record.tickets > 1 ? "tickets" : "ticket"}
        </div>
      ),
      key: "tickets",
      sorter: (a, b) => a.duration - b.duration,
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this reservation?"
            onConfirm={() => props.deleteReservation(record)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete Reservation</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={classes.ReservationsTable}>
      <Table
        style={{ width: "100%" }}
        columns={columns}
        scroll={{ x: true }}
        dataSource={
          reservationsData
            ? reservationsData.length > 0
              ? reservationsData
              : ""
            : []
        }
        loading={props.loadingTable}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsTable);
