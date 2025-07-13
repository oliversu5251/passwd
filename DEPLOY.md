# 部署指南

## 静态网站部署

这个密码生成器是一个纯静态网站，可以部署到任何支持静态文件托管的平台。

### 构建项目

```bash
npm run build
```

构建完成后，`dist` 目录包含所有需要的文件。

### 部署选项

#### 1. GitHub Pages

1. 将 `dist` 目录的内容推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `dist` 目录作为源目录

#### 2. Netlify

1. 将项目推送到 GitHub
2. 在 Netlify 中连接 GitHub 仓库
3. 设置构建命令：`npm run build`
4. 设置发布目录：`dist`

#### 3. Vercel

1. 将项目推送到 GitHub
2. 在 Vercel 中导入项目
3. 框架预设选择：Vite
4. 自动部署

#### 4. 传统 Web 服务器

1. 将 `dist` 目录的内容上传到 Web 服务器
2. 配置服务器支持 SPA 路由（如需要）

### 环境要求

- 现代浏览器支持（Chrome 80+, Firefox 75+, Safari 13+, Edge 80+）
- 支持 HTTPS（推荐，因为涉及密码生成）

### 注意事项

- 所有密码生成都在客户端完成，不需要服务器端处理
- 确保网站通过 HTTPS 访问以保护用户隐私
- 可以添加 CSP (Content Security Policy) 头以增强安全性

### 示例 CSP 配置

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;
```

### 性能优化

构建后的文件已经过优化：
- CSS 和 JS 文件已压缩
- 支持 gzip 压缩
- 资源文件已添加哈希值用于缓存控制
