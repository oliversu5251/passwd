# SecurePass Generator - 安全密码生成器

一个简单易用、安全可靠的在线密码生成工具，帮助用户创建强密码，提高账户安全性。

## ✨ 功能特点

- 🔐 **多种密码类型**：随机密码、易记密码、PIN码、字母密码
- 🎛️ **灵活配置**：自定义密码长度、字符类型选择
- 📊 **强度指示**：实时显示密码强度等级
- 📋 **批量生成**：一次生成多个密码
- 📱 **响应式设计**：支持桌面端和移动端
- 🌙 **深色模式**：支持明暗主题切换
- 📜 **历史记录**：保存最近生成的密码
- 🔒 **安全可靠**：100% 本地生成，不上传服务器

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
npm run build
```

构建文件将生成在 `dist` 目录中

### 预览生产版本

```bash
npm run preview
```

## 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式框架**：Tailwind CSS
- **密码生成**：Web Crypto API
- **状态管理**：React Hooks

## 📁 项目结构

```
src/
├── components/          # React 组件
│   ├── Header.tsx      # 页面头部
│   ├── PasswordGenerator.tsx  # 主密码生成器
│   ├── PasswordHistory.tsx    # 密码历史记录
│   ├── StrengthIndicator.tsx  # 强度指示器
│   └── ThemeToggle.tsx        # 主题切换
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 🔧 配置选项

### 密码类型
- **随机密码**：完全随机的字符组合
- **易记密码**：基于单词的易记密码（如：MyCat@2025!）
- **PIN码**：纯数字密码
- **字母密码**：仅包含字母的密码

### 字符类型
- 大写字母 (A-Z)
- 小写字母 (a-z)
- 数字 (0-9)
- 特殊字符 (!@#$%^&*)

### 密码长度
- 范围：2-128位
- 默认：12位

## 🔒 安全特性

- 使用 Web Crypto API 的 `crypto.getRandomValues()` 生成高质量随机数
- 所有密码生成在客户端完成，不上传服务器
- 不记录用户生成的密码
- 支持一键清除历史记录

## 📱 浏览器支持

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**注意**：此工具仅用于生成密码，请妥善保管生成的密码，不要在不安全的网络环境下使用。
