
Gomoku Web – 前端 UI  1.0

✅ 一、前端架构总览

```
  模块	        技术	               理由

前端框架	    Vue 3 + Vite	    简洁、现代、模块化强
状态管理	    Pinia	            Vue 3 推荐状态库，轻量
路由管理	    Vue Router	        单页面路由跳转
样式系统	    Tailwind CSS 3.4	实现现代化 UI 样式，方便布局与美化
网络请求	    Axios	            管理 REST 接口请求
实时通信	    WebSocket	        实现在线对战/聊天室
本地缓存	    localStorage	    保存 Token，维持登录态
```


✅ 二、前端组件结构（核心页面）

```
src/
├─ App.vue                      # 根组件
├─ main.js                      # 应用入口
├─ router/index.js              # 页面路由配置（含鉴权）
├─ store/user.js                # Pinia 用户状态管理
├─ utils/api.js                 # Axios 封装（自动附带 Token）
├─ components/
│  ├─ pages/
│  │  ├─ LoginPage.vue          # 登录/注册页面
│  │  ├─ LobbyPage.vue          # 游戏大厅页面
│  │  └─ RoomPage.vue           # 下棋对战页面
│  └─ ui/
│     ├─ GlassDialog.vue        # 弹窗
│     ├─ RoomCard.vue           # 房间卡片
│     ├─ UsersSidebar.vue       # 在线用户侧边栏
│     └─ Toast.vue              # 全局提示组件
└─ composables/
   └─ useToast.js               # 组合式 API（封装 toast 逻辑）
```