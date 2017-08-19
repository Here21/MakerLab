import React from 'react';
import { Icon } from 'antd';
import './style.scss';

const NavBar = () => (
  <footer>
    <div className="about">
      <h1>关于,  MakerLab</h1>
      <hr />
      <section>
        创客工坊目的就是为了拉近学生与教师的距离，
        并且期望教师将更多的资源可以直观地展现在这里，
        提供给学生。同样，教师也可以将自己系部的竞赛项目发布于此，
        方便同学报名组队。而专业课不仅是展现教师风采的板块，
        也是学生了解该课程的主要方式
      </section>
    </div>
    <div className="bottom-part">
      <div className="copyright">
        <p>Copyright © 2017</p>
        <p>Will be better</p>
      </div>
      <div className="contact">
        <div>
          <a
            href="https://github.com/Here21/MakerLab"
            target="_blank"
          >
            <Icon type="github" style={{ fontSize: '1.8rem', color: '#fff' }} />
          </a>
          <p>开源仓库</p>
        </div>
        <div>
          <a
            href="https://github.com/Here21/MakerLab/issues"
            target="_blank"
          >
            <Icon type="question-circle" style={{ fontSize: '1.8rem', color: '#fff' }} />
          </a>
          <p>问题/建议</p>
        </div>
        <div>
          <a
            href="https://ali.xiaofang.me:8443/2017/05/25/google-chrome-official-offline-installer-for-chinese-%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8%E7%A6%BB%E7%BA%BF%E5%AE%89%E8%A3%85%E5%8C%85/?from=groupmessage&isappinstalled=0&nsukey=Ih5%2Fmf%2B1zvrrd4vz7K46SdCPu7vB%2B1fPx5CMycwyZI6N1zZ%2FTqBMF5eWeX2xWD9SZpAS%2FoAAb%2FfjO%2BLaVHYxBZiypQbkuiX8FLKkdc8pCsorftTR91lIIGyLGdQBsoZlmnezWpm3f%2Fk8pShP4EOvTGBPOlXQ%2BgGPPh%2B19FPunJ9Qj1arHxNYy%2BYO0TwV95q3"
            target="_blank"
          >
            <Icon type="chrome" style={{ fontSize: '1.8rem', color: '#fff' }} />
          </a>
          <p>正版Chrome</p>
        </div>
      </div>
    </div>
  </footer>
)

export default NavBar;
