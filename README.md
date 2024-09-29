# 用户授权和认证的设计实现

## 概述

学习常用的用户授权和认证相关的系统设计，使用 Node.js 去实现 DEMO，提供 Docker 快速部署。

清单：
1. SSO
   1. SMAL
   2. Kerberos
2. OAuth2
3. LDAP

## 采用技术栈
1. 后端
   1. Node.js
   2. Nest.js
2. 数据库
   1. mysql
   2. redis
3. 前端
   1. Vue3


## 基本知识补充

### 认证和授权

> 认证和授权是两种概念
#### 认证（authentication）
通过账号和密码等信息向服务端请求，验证你的用户身份。
#### 授权（authorization）
当你认证通过后，会给予你相关模块和功能的权限。
#### 差异
1. 目的
	1. 认证：验证用户的身份
	2. 授权：决定你可以访问哪些模块和权限
2. 时机
	1. 认证：需要校验你用户身份的时候
	2. 授权：认证通过后


### Cookie & Session & JWT
Cookie 是浏览器提供的一个功能，用于通过前端或者请求响应的 Set-Cookie 进行设置，后续每次 http 请求都会规则将 cookie 值发送给后端，主要用于告诉后端当前请求是谁。
> 什么是 Cookie: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

Session
Session 是后端存储用户信息的一个解决方案，用于存储用户状态信息，常使用程序进程的内存或其他数据库工具来存储用户信息。

JWT（JSON Web Tokens）
JWT 是一种开放标准，将信息根据算法进行封装，以便在应用和服务之间传输，用于解决跨域认证的问题。

### SSO
[SSO 设计](./sso/README.md)

### OAuth2
TODO...
### CAS
TODO...
### SAML
TODO...
### LDAP
TODO...

## 参考资料
1. [认证和授权有什么区别](https://www.freecodecamp.org/chinese/news/whats-the-difference-between-authentication-and-authorisation/)
2. [Authing 文档](https://docs.authing.cn/v2/concepts/authentication-vs-authorization.html)
3. [Javaguide](https://javaguide.cn/system-design/security/basis-of-authority-certification.html)