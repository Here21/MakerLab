import React, { Component } from 'react';
import './style.scss';

export default class Home extends Component {
  render() {
    return (
      <div className="clear">
        <p className="home__title">创客工坊，在线虚拟实验室</p>
        <section className="home__bg" />

        <section className="home__desc-container">
          <div className="home__image home__image-01" />
          <div style={{ display: 'inline-block' }}>
            <div className="home__desc home__desc_right">
              <p className="home__desc-title">轻松添加同事协作</p>
              <p className="home__desc-content">
                输入邮箱，快速添加同事为协作者
                <br />
                或用微信扫一扫，添加微信好友即刻开始协作
              </p>
            </div>
          </div>
        </section>

        <section className="home__desc-container">
          <div style={{ display: 'inline-block' }}>
            <div className="home__desc home__desc_left">
              <p className="home__desc-title">在文档中任意位置添加评论<br/>即时讨论项目最新进展</p>
              <p className="home__desc-content">
                输入 “@” 提及协作者，或者对文档细节划词评论，
                <br />
                对方能立即收到消息提醒，手机也能及时参与沟通
              </p>
            </div>
          </div>
          <div className="home__image home__image-01" />
        </section>

        <section className="home__desc-container">
          <div className="home__image home__image-01" />
          <div style={{ display: 'inline-block' }}>
            <div className="home__desc home__desc_right">
              <p className="home__desc-title">团队、企业文件夹</p>
              <p className="home__desc-content">
                搭建并维护团队知识库，精准搜索文件内容
                <br />
                可为成员设置可以编辑、只读等不同的访问权限
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
