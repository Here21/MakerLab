import React from 'react'
import './style.scss'

const NavBar = () => (
  <footer>
    <div className="inner">
      <div className="about">
        <h1>关于,  MakerLab</h1>
        <hr />
        <section>
          创客工坊目的就是为了拉近学生与教师的距离，并且期望教师将更多的资源可以直观地展现在这里，提供给学生。同样，教师也可以将自己系部的竞赛项目发布于此，方便同学报名组队。而专业课不仅是展现教师风采的板块，也是学生了解该课程的主要方式
        </section>
      </div>
      <div className="bottom-part">
        <div className="copyright">
          <p>Powered by MakerLab</p>
          <p>contact me inhere.top</p>
        </div>
        <div className="contact">
          <div>官方微信</div>
          <div>开源仓库</div>
          <div>反馈邮箱</div>
        </div>
      </div>
    </div>
  </footer>
)

export default NavBar
