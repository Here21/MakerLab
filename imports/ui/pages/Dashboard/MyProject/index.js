import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import PropTypes from 'prop-types';
import { Table, Icon, Button, Popconfirm, message } from 'antd';
import moment from 'moment';

import './style.scss';

export default class MyProject extends Component {
  // constructor(props, context) {
  //   super(props, context);
  //   this.handleAdd = this.handleAdd.bind(this);
  // }

  handleAdd() {
    browserHistory.push('/dashboard/project/new');
  }

  handleRemove(id) {
    Meteor.call('Project.remove', id, err => {
      if (err) {
        console.log(err);
        message.error('删除失败！');
      } else {
        message.success('已删除');
      }
    });
  }

  render() {
    const data = this.props.data;
    console.log(data);
    const columns = [
      { title: '序号', dataIndex: 'index' },
      {
        title: '封面',
        dataIndex: 'coverSrc',
        key: 'coverSrc',
        render: coverSrc =>
          <img
            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
            src={coverSrc}
          />,
      },
      {
        title: '项目名称',
        dataIndex: 'projectName',
        render: (text, record) =>
          <Link to={`/project/${record.key}`}>
            {record.projectName}
          </Link>,
      },
      {
        title: '项目分类',
        dataIndex: 'projectSort',
      },
      {
        title: '项目行业',
        dataIndex: 'projectType',
      },
      {
        title: '赞数',
        dataIndex: 'likes',
      },
      {
        title: '创建时间',
        dataIndex: 'date',
      },
      {
        title: '操作',
        render: (text, record) =>
          <span>
            <a href="#">编辑</a>
            <span className="ant-divider" />
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={() => this.handleRemove(record.key)}
            >
              <a href="#">删除</a>
            </Popconfirm>
            <span className="ant-divider" />
            <a href="#" className="ant-dropdown-link">
              More actions <Icon type="down" />
            </a>
          </span>,
      },
    ];

    const dataSource = data && data.map((project, index) => ({
      key: project._id,
      index: index + 1,
      projectName: project.projectName || '无',
      projectSort: project.projectSort || '无',
      projectType: project.projectType || '无',
      likes: project.likes || 0,
      date: moment(project.createdAt).format('YYYY-MM-DD'),
      coverSrc: project.coverSrc,
    }));

    return (
      <div className="dashboard-my-project">
        <Button onClick={this.handleAdd}>创建项目</Button>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    );
  }
}

MyProject.propTypes = {
  data: PropTypes.array,
};
