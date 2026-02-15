# aka-jiashu-home-site

嘉树个人站点项目，采用「主页 + 博客」双栈结构：
- 主页：React + Vite + Tailwind（路径 `/`）
- 博客：MkDocs Material（路径 `/blog/`）

## 当前状态（2026-02）

- 博客已切为 **纯博客结构**（`docs/posts/*.md`），首页文章列表自动生成
- 启用了 Material 插件：`blog`、`group`、`offline`、`search`、`social`、`tags`
- 已启用：
  - 数学公式（MathJax）
  - Mermaid 图表
  - Giscus 评论（已接入配置，`repo_id/category_id` 仍需替换真实值）
- 博客支持自定义主题覆盖：`docs/overrides/main.html`（含统一页尾与备案信息）

## 目录结构

```text
.
├── App.tsx                        # 首页主应用（导航、Hero、专题卡片、关注弹窗）
├── index.tsx                      # React 入口
├── src/index.css                  # 首页全局样式
├── imgs/                          # 首页配图与公众号二维码
├── docs/
│   ├── index.md                   # 博客入口页（自动文章流）
│   ├── tags.md                    # 标签页
│   ├── posts/                     # 博客文章（front matter + Markdown）
│   ├── stylesheets/extra.css      # 博客自定义样式
│   ├── javascripts/               # MathJax / Mermaid 初始化脚本
│   └── overrides/main.html        # MkDocs 主题覆盖（统一页尾）
├── mkdocs.yml                     # 博客配置（插件、导航、评论、公式、图表）
├── start_dev.sh                   # 本地同时启动 Vite + MkDocs
├── deploy.sh                      # 读取 .env 的 DEPLOY_TARGET 进行部署
├── .env.example                   # 部署变量示例
└── nginx.conf                     # 静态站点服务示例配置
```

## 技术栈

- 前端：React 19 + TypeScript + Vite 6
- 样式：Tailwind CSS 4 + Lucide React
- 博客：MkDocs + Material for MkDocs

## 本地开发

### 1) 环境要求

- Node.js 18+
- Python 3（用于 MkDocs）

### 2) 安装依赖

```bash
npm install
python3 -m venv venv
source venv/bin/activate
pip install mkdocs-material
```

### 3) 启动方式

仅启动首页（Vite）：

```bash
npm run dev
```

同时启动首页 + 博客（推荐）：

```bash
./start_dev.sh
```

- Vite 默认端口：`3000`
- MkDocs 默认端口：`8000`
- 开发时 `/blog` 由 Vite 代理到 `http://localhost:8000`

## 构建与部署

### 1) 配置部署目标

在项目根目录创建 `.env`：

```env
DEPLOY_TARGET='gz-vps:/opt/1panel/www/sites/aka-jiashu.online/index'
```

可参考 `.env.example`。

### 2) 一键构建并部署

```bash
./deploy.sh
```

脚本行为：
- 构建 React 到 `dist/`
- 构建博客到 `dist/blog`
- 使用 `rsync` 同步 `dist/` 到 `DEPLOY_TARGET`

## 博客写作说明

- 新文章放到 `docs/posts/`，建议使用 front matter：

```md
---
title: 文章标题
slug: my-post
date:
  created: 2026-02-15
categories:
  - 分类
tags:
  - 标签A
  - 标签B
---
```

## 评论（Giscus）

当前 `mkdocs.yml` 已接入 giscus，但以下字段需替换真实值后才可用：
- `extra.giscus.repo_id`
- `extra.giscus.category_id`

## 安全建议

- `.env`、证书和密钥文件已加入 `.gitignore`
- 不要把真实密钥、证书、私钥提交到仓库
