/*
 * Gomoku Web – 前端 UI 离线演示版 2.0
 * ================================================
 * 需求
 *  1. 彻底脱离后端 → 所有接口 / WebSocket 均本地假数据
 *  2. 现代化 UI 风格 + 全页面居中
 *  3. 依旧使用 Vue 3 + Vite + Tailwind（仅前端依赖）
 * -------------------------------------------------


# Gomoku Web 前端快速运行指南

```bash
# 1. 克隆代码 & 进入目录
$ git clone <repo> gomoku-web && cd gomoku-web

# 2. 安装 Node LTS (18+)，然后安装依赖
$ npm install

# 3. 可选：复制环境变量模板并修改
$ cp .env.example .env   # 如需修改 VITE_API_PROXY / VITE_API_BASE

# 4. 开发调试：
$ npm run dev            # 浏览器打开 http://localhost:5173

# 5. 生产打包：
$ npm run build          # dist/ 上传至服务器 Nginx root
```