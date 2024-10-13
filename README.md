# 用户授权和认证的设计实现

## 概述

学习常用的用户授权和认证相关的系统设计，主要是使用 Node.js 去实现 DEMO。


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
SSO( SINGLE SIGN-ON) 是一种身份验证的解决方案，解决多系统的身份验证问题，用户只需在一个系统登录验证后，就可以根据其所权限访问相关的其他系统，无需重复登录。

[SSO 设计](sso-cas/README.md)

### OAuth2
TODO...
### CAS

^238098

> CAS 全称是Central Authentication Service（中心认证服务），它是一个单点登录(Single-Sign-On)协议，Apereo CAS是实现该协议的软件包。
> 
> CAS最初由Yale大学的Shawn Bayern开发实现，随后由Yale大学的Drew Mazurek负责维护，此时的CAS被称作 _Yale CAS_ 。2004年，CAS成为了JASIG(Java in Administration Special Interest Group) 的一个项目，2008年起开始由JASIG负责CAS的维护，CAS被改称 _JASIG CAS_ 。2012年，JASIG与Sakai Foundation合并为Apereo Foundation，此后CAS称为 _Apereo CAS_ 。

参考文档：https://apereo.github.io/cas/7.0.x/protocol/CAS-Protocol.html

相关术语

| 名称                          | 说明                                |
| --------------------------- | --------------------------------- |
| CAS server                  | CAS 提供认证的服务                       |
| CAS clients                 | 对接 CAS 的客户端                       |
| TGT(Ticket Granting Ticket) | 认证通过后生成的票证                        |
| TGC(Ticket Granting Cookie) | 用于关联 TGT 的 cookie                 |
| ST(Service Ticket)          | 基于 TGT 生成的票据，可以根据 ST 和 TGT 生成 TGC |
| SESSION_ID                  | 通过 ST 获取的，用于证明用户身份                |

时序图看参考文档的即可，这里不再重复。
主要逻辑：
1. 第一次访问业务系统
	1. 访问到 CAS 的登录界面
	2. 登录成功后，CAS 内缓存该用户的 TGT，CAS 前端 cookie 缓存 TGC，并在前端携带 CAS 提供的 ST 回到业务系统
	3. 业务系统根据 ST 请求 CAS 服务，从而得到 SESSION_ID
	4. 后续校验登录态时，把 SESSION_ID 给到 CAS 服务去判断
2. 登录后，重新访问业务系统
	1. 携带 TGC 请求 CAS 服务，验证是否有效
3. 登录后，访问另外一个业务系统
	1. 重定向到 CAS 的登录界面
	2. 校验 CAS 前端 cookie 中的 TGT
	3. 校验通过后，再携带新的 ST 重定向到业务系统
	4. 后续流程一样

### SAML
TODO...
### LDAP
TODO...

## 参考资料
1. [认证和授权有什么区别](https://www.freecodecamp.org/chinese/news/whats-the-difference-between-authentication-and-authorisation/)
2. [CAS](https://apereo.github.io/cas/7.0.x/protocol/CAS-Protocol.html) ^7aed82
3. [OAuth2.0 RFC6749 协议文档](https://rfc2cn.com/rfc6749.html)
4. [Authing 文档](https://docs.authing.cn/v2/concepts/authentication-vs-authorization.html)
5. [Javaguide](https://javaguide.cn/system-design/security/basis-of-authority-certification.html)
6. [前端需要了解的 SSO 与 CAS 知识](https://juejin.cn/post/6844903509272297480)