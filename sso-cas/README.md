# SSO 设计与实现

## 系统部署和运行

## 功能范围
1. 单点登录
	1. 多个业务系统，在某个系统登录后，再访问其他系统无需再登录
2. 登出
	1. 可以通过后台登出用户
	2. 用户可以在某个业务系统登出后
	3. 用户登出后，所有业务系统也要同步登出

## 仓库清单
1. cas-server
2. cas-fe
3. client-server
4. client-fe

以上仓库都提供 docker 方式部署，client 端相关代码可以根据配置组件进行一些自定义操作，这样就可以基于一套代码部署多个不同的 client。

## 系统设计

![[README#CAS]]

#### 单点登录
按照 CAS的实现即可。

### 单点登出
首先认证成功后，会把用户的 TGT 存储到 SESSION （缓存）里，然后每次校验登录态时都要访问 CAS，所以要做单点登出，只需把 TGT 删除即可。


### 系统架构图
业务系统前端和 CAS 前端会互相重定向， CAS 前端和业务服务会请求 CAS 服务进行认证和获取信息：
![[sso-cas-login.excalidraw]]


## 系统实现

### ER 图
![[sso-cas-er.excalidraw]]

### 接口清单

| 接口路径                       | 接口参数          | 接口说明                |
| -------------------------- | ------------- | ------------------- |
| /api/cas/register [POST]   | { name, pwd } | 注册                  |
| /api/cas/login [POST]      | { name, pwd } | 登录                  |
| /api/cas/getSession [POST] |               | 根据 ST 获取 SESSION_ID |
| /api/cas/validate [POST]   |               | 校验登录态               |
| /api/cas/logout [POST]     |               | 登出                  |


### 前端重定向规则
从客户端跳转到 SSO 的时候，需要带两个参数：redirect 和 app_code
app_code 代表的是你当前是哪个客户端
app_code 默认应该是要注册后，才能对接使用 sso

1. client -> sso
	1. `${sso domain}/handle?redirect=${client url}&app_code=${current client code}`


