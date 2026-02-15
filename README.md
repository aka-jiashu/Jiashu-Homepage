# aka-jiashu-home-site

嘉树个人站点项目，采用「主页 + 博客」双栈结构：
- 主页：React + Vite + Tailwind（路径 `/`）
- 博客：MkDocs Material（路径 `/blog/`）

## 项目结构

```text
.
├── App.tsx                  # 首页主应用（导航、Hero、专题卡片、关注弹窗）
├── index.tsx                # React 入口
├── src/index.css            # 全局样式与 Tailwind 引入
├── imgs/                    # 首页配图与公众号二维码
├── docs/                    # 博客 Markdown 内容
├── mkdocs.yml               # 博客导航与主题配置
├── start_dev.sh             # 本地同时启动 Vite + MkDocs
├── deploy.sh                # 构建并 rsync 部署
└── nginx.conf               # 线上静态站点服务配置示例
```

## 技术栈

- 前端：React 19 + TypeScript + Vite 6
- 样式：Tailwind CSS 4 + Lucide React
- 博客：MkDocs + Material Theme

## 本地开发

### 1) 环境要求

- Node.js 18+
- Python 3（用于 MkDocs）

### 2) 安装依赖

```bash
npm install
```

如果要本地运行博客（MkDocs）：

```bash
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
- 开发时 `/blog` 会由 Vite 代理到 `http://localhost:8000`

## 构建与部署

构建首页：

```bash
npm run build
```

构建博客：

```bash
mkdocs build
```

一键构建并部署（按仓库脚本）：

```bash
./deploy.sh
```

当前脚本行为：
- 构建 React 到 `dist/`
- 构建博客到 `dist/blog`
- `rsync` 到 `vps-us:/usr/share/nginx/html`

## 运行机制说明

- 首页会从 `imgs/` 里按命名前缀动态匹配图片（如 `hero*.png`、`psychology*.png`），并在加载时随机选一张作为各分区背景图。
- 点击首页专题卡片会跳转到对应博客栏目：
  - `/blog/psychology/`
  - `/blog/nature/`
  - `/blog/tech/`
- `nginx.conf` 使用 `try_files` 支持 SPA 路由回退，并对 `/assets/` 设置长缓存。

## 备注

- 仓库内 `dist/` 为构建产物目录。
- 若修改博客目录结构，请同步更新 `mkdocs.yml` 的 `nav` 配置。
