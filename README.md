HelloNodejsMedical
==================

移动医疗Web项目Demo。

实现用户注册登录，医生CRUD信息管理基本功能。

技术框架Nodejs (Express)+ MongoDB + Bootstrap，同时为这些技术的入门案例。

==================
### Introduction：
* app.js是整个应用的启动入口。
* server.js是系统服务配置和创建的地方。
* conf.js中存放着系统的配置信息。
* mongodb.js是与MongoDB相关的内容。
* models模块中中存放着mongoose的模型类如User，Doctor。
* routes中是应用路由控制跳转(Router)和请求分发处理的模块，根据对象信息进行模块化。
* views是系统展现给用户的ejs前端页面。
* daos中封装了所有对数据库的操作，对应models。
* public中是一些静态元素，如js，css，images，JQuery,Bootstrap都在其中。
* package.json中定义了系统需要的其他的第三方模块，如express,ejs等。
* node_modules中则是存放通过npm安装的第三方依赖包,如express,mongoose,log4js等。
* logs中存放了系统日志
* 后台的各个模块中其实有一个基于express和ejs的MVC模式，对应的三个模块为：models(M)-views(V)-routes(C).
