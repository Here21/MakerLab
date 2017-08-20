import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Table, Icon, Button, Popconfirm, message, Tag } from 'antd';
import moment from 'moment';

import './style.scss';

export default class MyCourse extends Component {
  handleAdd() {
    browserHistory.push('/dashboard/course/new');
  }

  handleRemove(id) {
    Meteor.call('Labs.remove', id, err => {
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
        title: '课程名称',
        dataIndex: 'courseName',
        render: (text, record) =>
          <Link to={`/course/${record.key}`}>
            {record.courseName}
          </Link>,
      },
      {
        title: '课程系别',
        dataIndex: 'department',
      },
      {
        title: '课程类型',
        dataIndex: 'courseType',
      },
      {
        title: '赞数',
        dataIndex: 'likes',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          return status ?
            <Tag color="red">已删除</Tag> :
            <Tag color="green">已创建</Tag>;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'date',
      },
      {
        title: '操作',
        render: (text, record) =>
          <span>
            {/*<a href="#">编辑</a>*/}
            {/*<span className="ant-divider" />*/}
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={() => this.handleRemove(record.key)}
            >
              <a href="#">删除</a>
            </Popconfirm>
            {/*<span className="ant-divider" />*/}
            {/*<a href="#" className="ant-dropdown-link">*/}
              {/*More actions <Icon type="down" />*/}
            {/*</a>*/}
          </span>,
      },
    ];

    const dataSource = data && data.map((course, index) => ({
      key: course._id,
      index: index + 1,
      courseName: course.courseName || '无',
      department: course.department || '无',
      courseType: course.courseType || '无',
      likes: course.likes || 0,
      date: moment(course.createdAt).format('YYYY-MM-DD'),
      coverSrc: course.coverSrc,
      status: course.removed,
    }));

    return (
      <div className="dashboard-my-course">
        <Button onClick={this.handleAdd}>创建课程</Button>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    );
  }
}

MyCourse.propTypes = {
  data: PropTypes.array,
};
