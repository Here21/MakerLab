# MakerLab with Meteor1.5

## 项目结构说明

> 暂无说明

## 项目启动

### 文件存储路径
修改`settings-development.json`中的`storagePath`为自己的任意目录，注意权限问题。

在development环境下，设置为**用户目录**（ ~/ ）中任意目录，以保证有读写权限。

```
meteor npm i
meteor --settings settings-development.json
```

## Dev Guide

#### 开发规范：

1. 请开启eslint，在commit前保证没有error，并尽量避免warning。如果需要修改eslint配置文件，请发issue讨论

2. 能用原生react方法实现的前端功能都不要使用jquery等直接操作dom元素的方法实现

（以上这些情况在使用某些第三方库时除外，比如某些功能必须由jquery调用）

#### Git使用规范：

1. 请在commit message的最前面添加[xxx] 前缀，以下是目前的几种前缀含义

 [dev] - 业务逻辑，功能开发相关

 [UI] - UI组件，Assets

 [deploy] - 部署相关，如修改mup, settings文件

 [doc] - README以及其他文本文件

 [test] - 单元测试

2. 当push时发现之前有人push了，此时使用rebase来合并


## 所用库

[富文本编辑器](https://github.com/jpuri/react-draft-wysiwyg)

[图片裁切](https://github.com/roadmanfong/react-cropper)

[文件系统——Meteor-Files](https://github.com/VeliovGroup/Meteor-Files)
