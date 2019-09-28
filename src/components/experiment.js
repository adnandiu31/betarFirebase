
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Table } from 'antd';

const columns = [
  { title: 'Repair Id ', dataIndex: 'repair_id', key: 'repair_id' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Product Name', dataIndex: 'product_name', key: 'product_name' },
  { title: 'Fault Location ', dataIndex: 'fault_location', key: 'fault_location' },
  { title: 'Fault Location Image', dataIndex: 'fault_location_image', key: 'fault_location_image' },
  { title: 'Symptom', dataIndex: 'symptom', key: 'symptom' },
  { title: 'PDF', dataIndex: 'pdf', key: 'pdf' },

  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

const data = [
  {
    key: 1,
    repair_id: 'John Brown',
    date: 32,
    product_name: 'John Brown',
    fault_location: 32,
    fault_location_image: 'John Brown',
    symptom: 32,
    pdf: 'John Brown',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

ReactDOM.render(
  <Table
    columns={columns}
    expandedRowRender={record => 
    <p style={{ margin: 0 }}>
    <h3>Solution</h3>
    { record.description}
    <br />
    <br></br>
    <h3>Solved By</h3>
    <b >Atahar Ali khan</b> <br />
    Sr. Executive Officer<br />
    Khulna Betar Kendro<br />
    email- atahar@gmail.com<br />
    Mobile: +01711084360
    </p>}
    dataSource={data}
  />,
  document.getElementById('container'),
);
          