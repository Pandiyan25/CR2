import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
const data = [
  {
    key: '1',
    SNo: 'Joe Black',
    Date: 42,
    Token: "23",
    Transaction_type:"123",
  },
  {
    key: '2',
    SNo: 'Joe Black',
    Date: 42,
    Token: "23",
    Transaction_type:"123",
  },
  {
    key: '3',
    SNo: 'Jim Green',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },
  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },
  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },
  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },
  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },
  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },
  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },  {
    key: '4',
    SNo: 'Jim Red',
    Date: 32,
    Token: "23",
    Transaction_type:"123",
  },
];

const App = () => {
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
      <div
        style={{
          padding: 10,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 20,
            display: 'block',
            
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
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
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'S.No',
      key: 'S.No',
      width: '10%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
      width: '20%',
      ...getColumnSearchProps('age'),
    },
    {
      title: 'Token',
      dataIndex: 'Token',
      key: 'Token',
      width: '20%',
      ...getColumnSearchProps('age'),
    },
    {
      title: 'Transaction Type',
      dataIndex: 'Transaction Type',
      key: 'Transaction Type',
      width: '20%',
      ...getColumnSearchProps('age'),
    },
    {
      title: 'No.of Tokens',
      dataIndex: 'No.of Tokens',
      key: 'No.of Tokens',
      width: '20%',
      ...getColumnSearchProps('age'),
      
    },
    {
      title: 'Options',
      dataIndex: 'Options',
      key: 'Options',
      width: '20%',
      ...getColumnSearchProps('age'),
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    //   ...getColumnSearchProps('address'),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ['descend', 'ascend'],
    // },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export default App;