# 嘉树主页与博客项目说明

## 项目概览

本项目是嘉树个人站点，采用双栈结构：
- 首页：React + Vite（路径 `/`）
- 博客：MkDocs Material（路径 `/blog/`）

当前博客已切换到 **纯博客模式**，文章位于 `docs/posts/`，首页自动生成文章摘要列表。

## 技术栈

- **前端：** React 19、TypeScript、Vite 6
- **样式：** Tailwind CSS 4、Lucide React
- **博客：** MkDocs + Material for MkDocs
- **增强能力：**
  - 数学公式：MathJax（`pymdownx.arithmatex`）
  - 图表：Mermaid（`pymdownx.superfences` custom fence）
  - 评论：Giscus（已接入，需填写真实 `repo_id/category_id`）

## 本地安装

### 环境要求

- Node.js 18+
- Python 3

### 安装步骤

```bash
npm install
python3 -m venv venv
source venv/bin/activate
pip install mkdocs-material
```

## 本地开发

- 首页开发：`npm run dev`
- 博客开发：`mkdocs serve`
- 一键同时启动：`./start_dev.sh`

默认端口：
- Vite：`3000`
- MkDocs：`8000`

## 构建与部署

### 部署变量

在项目根目录创建 `.env`，并设置：

```env
DEPLOY_TARGET='gz-vps:/opt/1panel/www/sites/aka-jiashu.online/index'
```

### 执行部署

```bash
./deploy.sh
```

脚本会：
1. 构建首页（`npm run build`）
2. 构建博客（`mkdocs build`）
3. 将 `dist/` rsync 到 `DEPLOY_TARGET`

## MkDocs 插件配置（当前）

`mkdocs.yml` 已启用：
- `group`
- `blog`
- `offline`
- `search`
- `social`
- `tags`

并启用了：
- `theme.comments.provider: giscus`
- `extra.giscus.*`（其中 `repo_id`/`category_id` 仍需替换）

## 关键目录

- `App.tsx`：首页主要界面逻辑
- `docs/posts/`：博客文章
- `docs/stylesheets/extra.css`：博客视觉样式
- `docs/overrides/main.html`：博客页尾模板（含备案信息）
- `docs/javascripts/`：MathJax / Mermaid 初始化
- `mkdocs.yml`：博客全局配置
- `deploy.sh`：部署脚本
