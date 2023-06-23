import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Space, Button, Typography } from 'antd';
import {
    SearchOutlined
  } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from 'axios';

const CustomTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="button"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 'calc(50% - 6px)' }}
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => handleReset(clearFilters)}
            style={{ width: 'calc(50% - 6px)' }}
          >
            Reset
          </button>
        </div>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/dash/fetchAll'); // Replace with the actual API route
      if (response.data.status === 'ok') {
        const updatedData = response.data.data.map((item) => {
          return {
            emailID: item.emailID,
            mobNo: item.mobNo,
            name: item.name,
            section: item.section,
            uploader: item.uploader,
            paymentMethod: item.paymentMethod,
            type: item.type,
          };
        });
        setData(updatedData);
      } else {
        alert('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Email ID',
      dataIndex: 'emailID',
      ...getColumnSearchProps('emailID'),
      render: (text) => (
        <div className="ellipsis">
          {text.length > 12 ? `${text.slice(0, 12)}...` : text}
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      render: (text) => (
        <div className="ellipsis">
          {text.length > 16 ? `${text.slice(0, 16)}...` : text}
        </div>
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'mobNo',
    },
    {
      title: 'Section',
      dataIndex: 'section',
    },
    {
      title: 'SRC Member',
      dataIndex: 'uploader',
      ...getColumnSearchProps('uploader'),
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
    },
  ];

  return (
    <div style={{padding:'20px'}}>
        <Typography.Title> Student Data</Typography.Title>
        <Space>
            <Button type="link" onClick={() => fetchData()}>
              Refresh Data
            </Button>
        </Space>
        <Table
          dataSource={data}
          columns={columns}
          loading={loading}
          rowKey="orderId"
          pagination={{
            position: ['topCenter'],
          }}
          // rowClassName={(record, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')} // Customize row background color
          bordered
          scroll={{ x: 'max-content' }}
          size={'middle'}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>Description: {record.description}</p>
            ),
            rowExpandable: () => true,
          }}
        />
      
    </div>
  );
};

export default CustomTable;
