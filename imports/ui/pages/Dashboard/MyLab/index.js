import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Table, Icon, Button } from 'antd';

import './style.scss';

export default class MyLab extends Component {
  // constructor(props, context) {
  //   super(props, context);
  //   this.handleAdd = this.handleAdd.bind(this);
  // }

  handleAdd() {
    browserHistory.push('/dashboard/lab/new');
  }

  render() {
    const data = this.props.data;
    const columns = [
      {
        title: '封面',
        dataIndex: 'img',
        key: 'img',
        render: src => <img style={{ width: '60px', height: '60px', objectFit: 'cover' }} src={src}/>,
      },
      {
        title: 'Lab名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>,
      },
      {
        title: '研究方向',
        dataIndex: 'researchDirection',
        key: 'researchDirection',
      },
      {
        title: '赞数',
        dataIndex: 'likes',
        key: 'likes',
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="#">编辑</a>
            <span className="ant-divider" />
            <a href="#">删除</a>
            <span className="ant-divider" />
            <a href="#" className="ant-dropdown-link">
              More actions <Icon type="down" />
            </a>
          </span>
        ),
      }];
    return (
      <div className="dashboard-mylab">
        <Button onClick={this.handleAdd}>创建实验室</Button>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

MyLab.propTypes = {
  data: PropTypes.array,
};
